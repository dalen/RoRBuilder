import { type ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { Career, EquipSlot, Stat } from '__generated__/graphql';
import {
  CAREERS_BY_REALM,
  careerRealm,
  enumLabel,
  type Realm,
} from 'components/loadout/careerMeta';
import { getCareerBaseStats } from 'components/loadout/careerBaseStats';
import { isTwoHandedMainHandWeapon } from 'components/loadout/careerEquipRules';
import {
  computeArmorPenetrationFromWeaponSkill,
  computeBlockStrikethrough,
  computeCritReductionFromInitiative,
  computeDamageAndHealingBonuses,
  computeDerivedAvoidance,
  computeStrikethrough,
} from 'components/loadout/derivedCombatStats';
import {
  SLOT_LAYOUT,
  SLOT_URL_CODE,
  URL_CODE_TO_SLOT,
  type SlotDef,
} from 'components/loadout/equipmentSlots';
import { ItemPicker } from 'components/loadout/ItemPicker';
import { ItemTooltip } from 'components/loadout/ItemTooltip';
import { CharacterImport } from 'components/loadout/CharacterImport';
import {
  fetchTopBuilds,
  publishBuild,
  type TopBuild,
} from 'components/loadout/buildShareApi';
import {
  MasteryBuilder,
  type MasteryPathPoints,
} from 'components/loadout/MasteryBuilder';
import {
  aggregateLoadoutStats,
  type AggregatedStatLine,
  type LoadoutItem,
} from 'components/loadout/loadoutStats';
import { rarityColor } from 'components/loadout/rarity';
import {
  computeRenownContributions,
  getRenownPointCap,
  getRenownPointsSpent,
  RENOWN_ABILITIES,
  type RenownSelections,
} from 'components/loadout/renownAbilities';
import { RenownPanel } from 'components/loadout/RenownPanel';
import {
  newBuildId,
  parseImportedBuilds,
  readSavedBuilds,
  type BuildSnapshot,
  type SavedBuild,
  writeSavedBuilds,
} from 'components/loadout/savedBuilds';
import {
  OTHER_STATS_LABEL,
  STAT_GROUPS,
  uncategorizedStats,
} from 'components/loadout/statGroups';

type LoadoutState = Partial<Record<EquipSlot, LoadoutItem>>;

// Persistent public builds require an official authenticated RoR API. Keep
// browser-local named builds and URL sharing available until that API exists.
const ENABLE_PERSISTENT_BUILD_SHARING = false;

// Renown rank is capped at 80 on the live server - no further ranks are granted past it.
// Renown Rank itself keeps climbing past 80 as a character keeps earning
// renown (it's shown on the character sheet as a prestige-style number),
// but the game stops handing out new renown *points* to spend once RR hits
// 80 -- see getRenownPointCap, which is what actually gates spending.
const clampRenownRank = (value: number): number =>
  Math.max(0, Math.round(value));

// Pairs of "core" stats shown up top of the stats panel, mirroring the layout
// of the in-game character sheet's Stats tab (two columns of primary stats).
const CORE_STAT_ROWS: [Stat, Stat][] = [
  [Stat.Strength, Stat.WeaponSkill],
  [Stat.BallisticSkill, Stat.Initiative],
  [Stat.Intelligence, Stat.Willpower],
  [Stat.Toughness, Stat.Wounds],
];

const ITEMS_BY_ID_QUERY = gql`
  query ItemsById($ids: [ID]) {
    items(where: { id: { in: $ids } }, first: 40) {
      nodes {
        id
        name
        iconUrl
        rarity
        talismanSlots
        uniqueEquipped
        type
        slot
        stats {
          stat
          value
          percentage
        }
        itemSet {
          id
          name
          bonuses {
            itemsRequired
            bonus {
              __typename
              ... on ItemStat {
                stat
                value
                percentage
              }
            }
          }
        }
      }
    }
  }
`;

interface ShareParams {
  buildName: string;
  description: string;
  career: Career | null;
  level: number | null;
  renownRank: number | null;
  characterName: string;
  slotIds: Partial<Record<EquipSlot, string>>;
  talismanIds: Partial<Record<EquipSlot, string[]>>;
  renownSelections: RenownSelections;
  masteryPathPoints: MasteryPathPoints | null;
  acquiredTierAbilityIds: number[];
  selectedTactics: number[];
  selectedMorales: number[];
  hasSovereign: boolean;
  openMasteryPanel: boolean;
  activeTab: 'gear' | 'renown' | 'mastery';
}

const parseShareParams = (): ShareParams => {
  const params = new URLSearchParams(window.location.search);
  const careerParam = params.get('career');
  const career =
    careerParam && (Object.values(Career) as string[]).includes(careerParam)
      ? (careerParam as Career)
      : null;
  const levelParam = params.get('level');
  const rrParam = params.get('rr');
  const slotIds: Partial<Record<EquipSlot, string>> = {};
  const talismanIds: Partial<Record<EquipSlot, string[]>> = {};
  for (const [code, slot] of Object.entries(URL_CODE_TO_SLOT)) {
    const id = params.get(code);
    if (id) slotIds[slot] = id;
    const talismans = params.get(`${code}t`);
    if (talismans) talismanIds[slot] = talismans.split(',').filter(Boolean);
  }
  const validRenownKeys = new Set(
    RENOWN_ABILITIES.map((ability) => ability.key),
  );
  const renownSelections: RenownSelections = {};
  for (const selection of params.get('r')?.split(',') ?? []) {
    const [key, rankValue] = selection.split('.');
    const rank = Number(rankValue);
    if (
      validRenownKeys.has(key as never) &&
      Number.isInteger(rank) &&
      rank > 0 &&
      rank <= 5
    ) {
      renownSelections[key as keyof RenownSelections] = rank;
    }
  }
  const paParam = params.get('pa');
  const pbParam = params.get('pb');
  const pcParam = params.get('pc');
  const masteryPathPoints =
    paParam || pbParam || pcParam
      ? {
          a: Number(paParam ?? 0) || 0,
          b: Number(pbParam ?? 0) || 0,
          c: Number(pcParam ?? 0) || 0,
        }
      : null;
  const tParam = params.get('t');
  const selectedTactics = tParam
    ? tParam
        .split(',')
        .map((id) => Number(id))
        .filter((id) => !Number.isNaN(id))
    : [];
  const maParam = params.get('ma');
  const acquiredTierAbilityIds = maParam
    ? maParam
        .split(',')
        .map((id) => Number(id))
        .filter((id) => !Number.isNaN(id))
    : [];
  const moParam = params.get('mo');
  const selectedMorales = moParam
    ? moParam
        .split(',')
        .map((id) => Number(id))
        .filter((id) => !Number.isNaN(id))
    : [];

  const tab = params.get('tab');
  return {
    buildName: params.get('build') ?? '',
    description: params.get('desc') ?? '',
    career,
    level: levelParam ? Number(levelParam) : null,
    renownRank: rrParam ? Number(rrParam) : null,
    characterName: params.get('name') ?? '',
    slotIds,
    talismanIds,
    renownSelections,
    masteryPathPoints,
    acquiredTierAbilityIds,
    selectedTactics,
    selectedMorales,
    hasSovereign: params.get('sov') === '1',
    openMasteryPanel: params.get('mastery') === '1',
    activeTab: tab === 'renown' || tab === 'mastery' ? tab : 'gear',
  };
};

export const Loadout = ({
  initialTab,
}: {
  initialTab?: 'gear' | 'renown' | 'mastery';
}): ReactElement => {
  const britishEnglish = true;
  const displayLabel = (label: string): string => {
    if (!britishEnglish) return label;
    return label
      .replace(/Armor/g, 'Armour')
      .replace(/^Defense$/, 'Defence')
      .replace(/^Offense$/, 'Offence');
  };
  const initialRef = useRef<ShareParams | undefined>(undefined);
  if (!initialRef.current) initialRef.current = parseShareParams();
  const initial = initialRef.current;

  const [realm, setRealm] = useState<Realm>(
    initial.career ? careerRealm(initial.career) : 'Order',
  );
  const [career, setCareer] = useState<Career>(
    initial.career ?? Career.IronBreaker,
  );
  const [level, setLevel] = useState(initial.level ?? 40);
  const [renownRank, setRenownRank] = useState(
    clampRenownRank(initial.renownRank ?? 80),
  );
  const [characterName, setCharacterName] = useState(initial.characterName);
  const [buildName, setBuildName] = useState(initial.buildName);
  const [buildDescription, setBuildDescription] = useState(initial.description);
  const [activeBuildId, setActiveBuildId] = useState<string | null>(null);
  const [savedBuilds, setSavedBuilds] = useState<SavedBuild[]>(readSavedBuilds);
  const [showSavedBuilds, setShowSavedBuilds] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [listPublicly, setListPublicly] = useState(false);
  const [topBuilds, setTopBuilds] = useState<TopBuild[]>([]);
  const [topBuildCareer, setTopBuildCareer] = useState('');
  const [topBuildSort, setTopBuildSort] = useState<
    'trending' | 'views' | 'newest'
  >('trending');
  const [loadout, setLoadout] = useState<LoadoutState>({});
  const [activeSlot, setActiveSlot] = useState<EquipSlot | null>(null);
  const [previewSlot, setPreviewSlot] = useState<EquipSlot | null>(null);
  const [previewAbove, setPreviewAbove] = useState(false);
  const lastPointerType = useRef('');
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied'>('idle');
  const [renownSelections, setRenownSelections] = useState<RenownSelections>(
    initial.renownSelections,
  );
  const [activePlannerTab, setActivePlannerTab] = useState<
    'gear' | 'renown' | 'mastery'
  >(initialTab ?? (initial.openMasteryPanel ? 'mastery' : initial.activeTab));
  const [masteryPathPoints, setMasteryPathPoints] = useState<MasteryPathPoints>(
    initial.masteryPathPoints ?? { a: 0, b: 0, c: 0 },
  );
  const [acquiredTierAbilityIds, setAcquiredTierAbilityIds] = useState<
    number[]
  >(initial.acquiredTierAbilityIds);
  const [selectedTactics, setSelectedTactics] = useState<number[]>(
    initial.selectedTactics,
  );
  const [selectedMorales, setSelectedMorales] = useState<number[]>(
    initial.selectedMorales,
  );
  const [hasSovereign, setHasSovereign] = useState<boolean>(
    initial.hasSovereign,
  );

  const pendingIds = useMemo(
    () =>
      [
        ...Array.from(
          new Set([
            ...Object.values(initial.slotIds),
            ...Object.values(initial.talismanIds).flat(),
          ]),
        ),
      ] as string[],
    [initial],
  );
  const [hydrating, setHydrating] = useState(pendingIds.length > 0);

  const { data: hydrateData } = useQuery(ITEMS_BY_ID_QUERY, {
    variables: { ids: pendingIds },
    skip: pendingIds.length === 0,
  } as any) as any;

  useEffect(() => {
    if (!hydrateData) return;
    const nodes: LoadoutItem[] = (hydrateData as any)?.items?.nodes ?? [];
    const byId = new Map(nodes.map((n) => [n.id, n]));
    setLoadout((prev) => {
      const next = { ...prev };
      for (const [slot, id] of Object.entries(initial.slotIds)) {
        const found = byId.get(id as string);
        if (found) {
          const talismans = (initial.talismanIds[slot as EquipSlot] ?? []).map(
            (talismanId) => byId.get(talismanId) ?? null,
          );
          next[slot as EquipSlot] = talismans.length
            ? { ...found, talismans }
            : found;
        }
      }
      return next;
    });
    setHydrating(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrateData]);

  const careerOptions = CAREERS_BY_REALM[realm];

  const handleRealmChange = (next: Realm): void => {
    setRealm(next);
    setCareer(CAREERS_BY_REALM[next][0]);
    setLoadout({});
    setMasteryPathPoints({ a: 0, b: 0, c: 0 });
    setAcquiredTierAbilityIds([]);
    setSelectedTactics([]);
    setSelectedMorales([]);
    setHasSovereign(false);
  };

  const handleCareerChange = (next: Career): void => {
    setCareer(next);
    setLoadout({});
    setMasteryPathPoints({ a: 0, b: 0, c: 0 });
    setAcquiredTierAbilityIds([]);
    setSelectedTactics([]);
    setSelectedMorales([]);
    setHasSovereign(false);
  };

  const equippedItems = useMemo(
    () => Object.values(loadout).filter(Boolean) as LoadoutItem[],
    [loadout],
  );
  const { stats: gearStats, sets } = useMemo(
    () => aggregateLoadoutStats(equippedItems),
    [equippedItems],
  );

  // Layer career base stats, renown ability bonuses, and derived combat
  // formulas (Parry/Evade/Disrupt/Block from primary stats, crit reduction,
  // armor penetration, strikethrough, etc.) on top of the raw gear totals so
  // the sheet reads like the in-game character window, not just an item sum.
  const stats = useMemo((): AggregatedStatLine[] => {
    const map = new Map<Stat, AggregatedStatLine>();
    for (const line of gearStats) map.set(line.stat, { ...line });
    const add = (stat: Stat, value: number, isPercent: boolean): void => {
      if (!value) return;
      const existing = map.get(stat) ?? { stat, flat: 0, percent: 0 };
      if (isPercent)
        existing.percent = Math.round((existing.percent + value) * 100) / 100;
      else existing.flat += Math.round(value);
      map.set(stat, existing);
    };

    const base = getCareerBaseStats(career, level);
    add(Stat.Strength, base.strength, false);
    add(Stat.WeaponSkill, base.weaponSkill, false);
    add(Stat.BallisticSkill, base.ballisticSkill, false);
    add(Stat.Intelligence, base.intelligence, false);
    add(Stat.Willpower, base.willpower, false);
    add(Stat.Toughness, base.toughness, false);
    add(Stat.Wounds, base.wounds, false);
    add(Stat.Initiative, base.initiative, false);

    for (const contribution of computeRenownContributions(renownSelections)) {
      add(contribution.stat, contribution.value, contribution.percentage);
    }

    const primary = {
      strength: map.get(Stat.Strength)?.flat ?? 0,
      ballisticSkill: map.get(Stat.BallisticSkill)?.flat ?? 0,
      intelligence: map.get(Stat.Intelligence)?.flat ?? 0,
      willpower: map.get(Stat.Willpower)?.flat ?? 0,
      toughness: map.get(Stat.Toughness)?.flat ?? 0,
      weaponSkill: map.get(Stat.WeaponSkill)?.flat ?? 0,
      initiative: map.get(Stat.Initiative)?.flat ?? 0,
    };
    const avoidance = computeDerivedAvoidance(primary);
    for (const [stat, value] of Object.entries(avoidance) as [Stat, number][]) {
      add(stat, value, true);
    }
    add(
      Stat.CriticalHitRateReduction,
      computeCritReductionFromInitiative(primary.initiative),
      true,
    );
    add(
      Stat.ArmorPenetration,
      computeArmorPenetrationFromWeaponSkill(primary.weaponSkill, level),
      true,
    );
    const strikethrough = computeStrikethrough(primary);
    add(Stat.ParryStrikethrough, strikethrough.parryStrikethrough, true);
    add(Stat.EvadeStrikethrough, strikethrough.evadeStrikethrough, true);
    add(Stat.DisruptStrikethrough, strikethrough.disruptStrikethrough, true);
    add(Stat.BlockStrikethrough, computeBlockStrikethrough(primary), true);

    return Array.from(map.values());
  }, [gearStats, career, level, renownSelections]);

  const findStat = (stat: Stat): { flat: number; percent: number } => {
    const line = stats.find((s) => s.stat === stat);
    return { flat: line?.flat ?? 0, percent: line?.percent ?? 0 };
  };

  const damageHealingBonuses = useMemo(() => {
    const findFlat = (stat: Stat): number =>
      stats.find((s) => s.stat === stat)?.flat ?? 0;
    return computeDamageAndHealingBonuses(
      {
        strength: findFlat(Stat.Strength),
        ballisticSkill: findFlat(Stat.BallisticSkill),
        intelligence: findFlat(Stat.Intelligence),
        willpower: findFlat(Stat.Willpower),
        toughness: 0,
        weaponSkill: 0,
        initiative: 0,
      },
      {
        meleePower: findFlat(Stat.MeleePower),
        rangedPower: findFlat(Stat.RangedPower),
        magicPower: findFlat(Stat.MagicPower),
        healingPower: findFlat(Stat.HealingPower),
      },
    );
  }, [stats]);

  const renownCap = getRenownPointCap(level, renownRank);
  const renownSpent = getRenownPointsSpent(renownSelections);

  const snapshot = (): BuildSnapshot => ({
    name: buildName.trim() || `${enumLabel(career)} Build`,
    description: buildDescription.trim(),
    career,
    level,
    renownRank,
    characterName,
    loadout,
    renownSelections,
    masteryPathPoints,
    acquiredTierAbilityIds,
    selectedTactics,
    selectedMorales,
    hasSovereign,
  });

  const persistBuilds = (next: SavedBuild[]): void => {
    setSavedBuilds(next);
    writeSavedBuilds(next);
  };

  const saveBuild = (saveAsCopy = false): void => {
    const now = new Date().toISOString();
    const current = snapshot();
    if (activeBuildId && !saveAsCopy) {
      persistBuilds(
        savedBuilds.map((build) =>
          build.id === activeBuildId
            ? { ...build, ...current, updatedAt: now }
            : build,
        ),
      );
      setSaveStatus('Build updated');
    } else {
      const build: SavedBuild = {
        ...current,
        id: newBuildId(),
        createdAt: now,
        updatedAt: now,
      };
      persistBuilds([build, ...savedBuilds]);
      setActiveBuildId(build.id);
      setBuildName(build.name);
      setSaveStatus('Build saved');
    }
    setTimeout(() => setSaveStatus(''), 2200);
  };

  const loadSavedBuild = (build: SavedBuild): void => {
    setActiveBuildId(build.id || null);
    setBuildName(build.name);
    setBuildDescription(build.description);
    setRealm(careerRealm(build.career));
    setCareer(build.career);
    setLevel(build.level);
    setRenownRank(build.renownRank);
    setCharacterName(build.characterName);
    setLoadout(build.loadout);
    setRenownSelections(build.renownSelections);
    setMasteryPathPoints(build.masteryPathPoints);
    setAcquiredTierAbilityIds(build.acquiredTierAbilityIds);
    setSelectedTactics(build.selectedTactics);
    setSelectedMorales(build.selectedMorales);
    setHasSovereign(build.hasSovereign);
    setShowSavedBuilds(false);
  };

  useEffect(() => {
    if (!ENABLE_PERSISTENT_BUILD_SHARING) return;
    const sharedId = new URLSearchParams(globalThis.location.search).get(
      'shared',
    );
    if (!sharedId) return;
    // The initial shared-build lookup intentionally runs once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!ENABLE_PERSISTENT_BUILD_SHARING) return;
  }, [topBuildCareer, topBuildSort]);

  const handleShare = async (
    scope: 'gear' | 'renown' | 'mastery',
  ): Promise<void> => {
    const params = new URLSearchParams();
    params.set('career', career);
    params.set('level', String(level));
    params.set('rr', String(renownRank));
    if (buildName.trim()) params.set('build', buildName.trim());
    if (buildDescription.trim()) params.set('desc', buildDescription.trim());
    params.set('tab', scope);
    if (scope === 'gear') {
      if (characterName) params.set('name', characterName);
      for (const [slot, item] of Object.entries(loadout)) {
        if (!item) continue;
        const code = SLOT_URL_CODE[slot as EquipSlot];
        params.set(code, item.id);
        const talismanIds = (item.talismans ?? [])
          .map((talisman) => talisman?.id)
          .filter(Boolean);
        if (talismanIds.length) params.set(`${code}t`, talismanIds.join(','));
      }
    }
    const encodedRenown = Object.entries(renownSelections)
      .filter(([, rank]) => Boolean(rank))
      .map(([key, rank]) => `${key}.${rank}`)
      .join(',');
    if (scope === 'renown' && encodedRenown) params.set('r', encodedRenown);
    if (
      scope === 'mastery' &&
      (masteryPathPoints.a || masteryPathPoints.b || masteryPathPoints.c)
    ) {
      params.set('pa', String(masteryPathPoints.a));
      params.set('pb', String(masteryPathPoints.b));
      params.set('pc', String(masteryPathPoints.c));
    }
    if (scope === 'mastery' && acquiredTierAbilityIds.length)
      params.set('ma', acquiredTierAbilityIds.join(','));
    if (scope === 'mastery' && selectedTactics.length)
      params.set('t', selectedTactics.join(','));
    if (scope === 'mastery' && selectedMorales.length)
      params.set('mo', selectedMorales.join(','));
    if (scope === 'mastery' && hasSovereign) params.set('sov', '1');
    const search = `?${params.toString()}`;
    const url = `${window.location.origin}${window.location.pathname}${search}`;
    window.history.replaceState(null, '', search);
    try {
      await navigator.clipboard.writeText(url);
      setShareStatus('copied');
      setTimeout(() => setShareStatus('idle'), 2500);
    } catch {
      window.prompt('Copy this link to share your build:', url);
    }
  };

  const leftSlots = SLOT_LAYOUT.filter((s) => s.column === 'left');
  const rightSlots = SLOT_LAYOUT.filter((s) => s.column === 'right');
  const bottomSlots = SLOT_LAYOUT.filter((s) => s.column === 'bottom');

  const showItemPreview = (slot: EquipSlot, element: HTMLElement): void => {
    const bounds = element.getBoundingClientRect();
    setPreviewAbove(bounds.bottom > globalThis.innerHeight * 0.6);
    setPreviewSlot(slot);
  };

  const renderSlot = (slotDef: SlotDef): ReactElement => {
    const item = loadout[slotDef.slot];
    const slotLabel =
      slotDef.label === 'Jewellery' && !britishEnglish
        ? 'Jewelry'
        : slotDef.label;
    const tooltipId = `equipped-item-${slotDef.slot.toLowerCase()}-tooltip`;
    return (
      <div
        key={slotDef.slot}
        className="loadout-equipped-slot"
        onMouseEnter={(event) =>
          item && showItemPreview(slotDef.slot, event.currentTarget)
        }
        onMouseLeave={() =>
          setPreviewSlot((current) =>
            current === slotDef.slot ? null : current,
          )
        }
      >
        <button
          type="button"
          className="loadout-slot-wrap"
          onPointerDown={(event) => {
            lastPointerType.current = event.pointerType;
          }}
          onClick={(event) => {
            if (
              item &&
              lastPointerType.current === 'touch' &&
              previewSlot !== slotDef.slot
            ) {
              showItemPreview(slotDef.slot, event.currentTarget);
              return;
            }
            setPreviewSlot(null);
            setActiveSlot(slotDef.slot);
          }}
          onFocus={(event) => {
            if (item && event.currentTarget.matches(':focus-visible')) {
              showItemPreview(slotDef.slot, event.currentTarget);
            }
          }}
          onBlur={() =>
            setPreviewSlot((current) =>
              current === slotDef.slot ? null : current,
            )
          }
          onKeyDown={(event) => {
            if (event.key === 'Escape') setPreviewSlot(null);
          }}
          aria-describedby={
            item && previewSlot === slotDef.slot ? tooltipId : undefined
          }
          title={item ? `${slotLabel}: ${item.name}` : slotLabel}
        >
          <span
            className={`loadout-slot-circle ${item ? 'is-filled' : ''}`}
            style={
              item
                ? { borderColor: rarityColor(item.rarity as any) }
                : undefined
            }
          >
            {item ? (
              <img
                src={item.iconUrl}
                alt=""
                className="loadout-slot-circle-icon"
              />
            ) : (
              <img
                src={slotDef.placeholderIconUrl}
                alt=""
                className="loadout-slot-circle-icon is-placeholder"
              />
            )}
          </span>
          <span
            className="loadout-slot-circle-label"
            style={
              item ? { color: rarityColor(item.rarity as any) } : undefined
            }
          >
            {item ? item.name : slotLabel}
          </span>
        </button>
        {item && previewSlot === slotDef.slot && (
          <div
            className={`loadout-equipped-tooltip ${
              previewAbove ? 'is-above' : ''
            }`}
            id={tooltipId}
            role="tooltip"
          >
            <ItemTooltip item={item} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <section className="build-identity box mb-4">
        <div className="build-identity-fields">
          <div className="field">
            <label className="label" htmlFor="build-name">
              Build name
            </label>
            <div className="control">
              <input
                id="build-name"
                className="input"
                value={buildName}
                maxLength={80}
                placeholder="e.g. KotBS Tank Warband"
                onChange={(event) => setBuildName(event.target.value)}
              />
            </div>
          </div>
          <div className="field build-description-field">
            <label className="label" htmlFor="build-description">
              Notes
            </label>
            <div className="control">
              <input
                id="build-description"
                className="input"
                value={buildDescription}
                maxLength={240}
                placeholder="What this build is for"
                onChange={(event) => setBuildDescription(event.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="buttons build-actions">
          <button
            type="button"
            className="button is-primary"
            onClick={() => saveBuild(false)}
          >
            <span className="icon">
              <i className="fas fa-floppy-disk" />
            </span>
            <span>{activeBuildId ? 'Update build' : 'Save build'}</span>
          </button>
          {activeBuildId && (
            <button
              type="button"
              className="button"
              onClick={() => saveBuild(true)}
            >
              Save as copy
            </button>
          )}
          <button
            type="button"
            className="button"
            onClick={() => setShowSavedBuilds((value) => !value)}
          >
            My Builds ({savedBuilds.length})
          </button>
          <label className="checkbox publish-listing-toggle">
            <input
              type="checkbox"
              checked={listPublicly}
              onChange={(event) => setListPublicly(event.target.checked)}
            />{' '}
            List in Top Builds
          </label>
          <button
            type="button"
            className="button is-link is-light"
            onClick={async () => {
              try {
                const id = await publishBuild(snapshot(), listPublicly);
                const url = `${globalThis.location.origin}${globalThis.location.pathname}?shared=${id}`;
                await navigator.clipboard.writeText(url);
                setSaveStatus('Published link copied');
                fetchTopBuilds(topBuildCareer, topBuildSort)
                  .then(setTopBuilds)
                  .catch(() => undefined);
              } catch (error) {
                setSaveStatus(
                  error instanceof Error ? error.message : 'Publish failed',
                );
              }
            }}
          >
            <span className="icon">
              <i className="fas fa-cloud-arrow-up" />
            </span>
            <span>Publish</span>
          </button>
          {saveStatus && (
            <span className="tag is-success is-light">{saveStatus}</span>
          )}
        </div>
      </section>

      {showSavedBuilds && (
        <section className="saved-builds box mb-4">
          <div className="saved-builds-heading">
            <div>
              <h2 className="title is-4 mb-1">My Builds</h2>
              <p className="has-text-grey is-size-7">
                Saved privately in this browser.
              </p>
            </div>
            <div className="buttons">
              <button
                type="button"
                className="button is-small"
                disabled={!savedBuilds.length}
                onClick={() => {
                  const url = URL.createObjectURL(
                    new Blob([JSON.stringify(savedBuilds, null, 2)], {
                      type: 'application/json',
                    }),
                  );
                  const anchor = document.createElement('a');
                  anchor.href = url;
                  anchor.download = 'emissary-builds.json';
                  anchor.click();
                  URL.revokeObjectURL(url);
                }}
              >
                Export
              </button>
              <label className="button is-small">
                Import
                <input
                  hidden
                  type="file"
                  accept="application/json"
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    try {
                      const imported = parseImportedBuilds(await file.text());
                      const byId = new Map(
                        [...savedBuilds, ...imported].map((build) => [
                          build.id,
                          build,
                        ]),
                      );
                      persistBuilds(Array.from(byId.values()));
                      setSaveStatus(`${imported.length} build(s) imported`);
                    } catch (error) {
                      setSaveStatus(
                        error instanceof Error
                          ? error.message
                          : 'Import failed',
                      );
                    }
                    event.target.value = '';
                  }}
                />
              </label>
            </div>
          </div>
          {savedBuilds.length ? (
            <div className="saved-build-grid">
              {savedBuilds.map((build) => (
                <article className="saved-build-card" key={build.id}>
                  <h3 className="title is-6 mb-1">{build.name}</h3>
                  <p className="is-size-7 has-text-grey mb-2">
                    {enumLabel(build.career)} · Rank {build.level} · RR{' '}
                    {build.renownRank}
                  </p>
                  {build.description && (
                    <p className="is-size-7 mb-3">{build.description}</p>
                  )}
                  <div className="buttons are-small">
                    <button
                      type="button"
                      className="button is-link"
                      onClick={() => loadSavedBuild(build)}
                    >
                      Open
                    </button>
                    <button
                      type="button"
                      className="button is-danger is-light"
                      onClick={() => {
                        if (!window.confirm(`Delete “${build.name}”?`)) return;
                        persistBuilds(
                          savedBuilds.filter(
                            (candidate) => candidate.id !== build.id,
                          ),
                        );
                        if (activeBuildId === build.id) setActiveBuildId(null);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="has-text-grey">Your saved builds will appear here.</p>
          )}
        </section>
      )}

      <section className="top-builds box mb-4">
        <div className="top-builds-heading">
          <div>
            <h2 className="title is-4 mb-1">Top Builds</h2>
            <p className="has-text-grey is-size-7">
              Public builds ranked using unique views.
            </p>
          </div>
          <div className="field is-grouped top-build-filters">
            <div className="control">
              <div className="select is-small">
                <select
                  aria-label="Filter top builds by career"
                  value={topBuildCareer}
                  onChange={(event) => setTopBuildCareer(event.target.value)}
                >
                  <option value="">All careers</option>
                  {[
                    ...CAREERS_BY_REALM.Order,
                    ...CAREERS_BY_REALM.Destruction,
                  ].map((option) => (
                    <option value={option} key={option}>
                      {enumLabel(option)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="control">
              <div className="select is-small">
                <select
                  aria-label="Sort top builds"
                  value={topBuildSort}
                  onChange={(event) =>
                    setTopBuildSort(
                      event.target.value as 'trending' | 'views' | 'newest',
                    )
                  }
                >
                  <option value="trending">Trending (7 days)</option>
                  <option value="views">Most viewed</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {topBuilds.length > 0 ? (
          <div className="saved-build-grid">
            {topBuilds.map((build) => (
              <article className="saved-build-card" key={build.id}>
                <h3 className="title is-6 mb-1">{build.name}</h3>
                <p className="is-size-7 has-text-grey mb-2">
                  {enumLabel(build.career)} · Rank {build.level} · RR{' '}
                  {build.renownRank}
                </p>
                {build.description && (
                  <p className="is-size-7 mb-3">{build.description}</p>
                )}
                <a
                  className="button is-small is-link"
                  href={`?shared=${build.id}`}
                >
                  View build ·{' '}
                  {topBuildSort === 'trending'
                    ? `${build.trendingViews} this week`
                    : `${build.viewCount} views`}
                </a>
              </article>
            ))}
          </div>
        ) : (
          <p className="has-text-grey">
            No public builds yet. Publish yours to start the list.
          </p>
        )}
      </section>

      <div className="planner-sections tabs is-toggle is-fullwidth mb-4">
        <ul>
          <li className={activePlannerTab === 'gear' ? 'is-active' : ''}>
            <button type="button" onClick={() => setActivePlannerTab('gear')}>
              <span className="icon">
                <i className="fas fa-helmet-safety" />
              </span>
              <span>Gear</span>
            </button>
          </li>
          <li className={activePlannerTab === 'renown' ? 'is-active' : ''}>
            <button type="button" onClick={() => setActivePlannerTab('renown')}>
              <span className="icon">
                <i className="fas fa-medal" />
              </span>
              <span>
                Renown ({renownSpent}/{renownCap})
              </span>
            </button>
          </li>
          <li className={activePlannerTab === 'mastery' ? 'is-active' : ''}>
            <button
              type="button"
              onClick={() => setActivePlannerTab('mastery')}
            >
              <span className="icon">
                <i className="fas fa-star" />
              </span>
              <span>Mastery</span>
            </button>
          </li>
        </ul>
      </div>
      {activePlannerTab === 'gear' && (
        <>
          <div className="loadout-toolbar mb-4">
            <div className="loadout-toolbar-primary">
              <div className="buttons has-addons">
                <button
                  type="button"
                  className={`button ${
                    realm === 'Order' ? 'is-link is-selected' : ''
                  }`}
                  onClick={() => handleRealmChange('Order')}
                >
                  <span className="icon is-small">
                    <i className="fas fa-shield-halved" />
                  </span>
                  <span>Order</span>
                </button>
                <button
                  type="button"
                  className={`button ${
                    realm === 'Destruction' ? 'is-danger is-selected' : ''
                  }`}
                  onClick={() => handleRealmChange('Destruction')}
                >
                  <span className="icon is-small">
                    <i className="fas fa-skull" />
                  </span>
                  <span>Destruction</span>
                </button>
              </div>

              <div className="field is-grouped loadout-toolbar-controls">
                <div className="control">
                  <div className="select">
                    <select
                      aria-label="Career"
                      value={career}
                      onChange={(event) =>
                        handleCareerChange(event.target.value as Career)
                      }
                    >
                      {careerOptions.map((c) => (
                        <option key={c} value={c}>
                          {enumLabel(c)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="control">
                  <input
                    aria-label="Character level"
                    className="input"
                    type="number"
                    min={1}
                    max={40}
                    value={level}
                    onChange={(event) =>
                      setLevel(Number(event.target.value) || 1)
                    }
                    style={{ width: '6rem' }}
                    title="Character level"
                  />
                </div>
                <div className="control">
                  <input
                    aria-label="Renown rank"
                    className="input"
                    type="number"
                    min={0}
                    value={renownRank}
                    onChange={(event) =>
                      setRenownRank(
                        clampRenownRank(Number(event.target.value) || 0),
                      )
                    }
                    style={{ width: '7rem' }}
                    title="Renown rank (renown points to spend stop increasing past RR 80)"
                  />
                </div>
                <div className="control">
                  <button
                    type="button"
                    className="button is-small"
                    title="Reset gear, renown, and mastery back to a blank build"
                    onClick={() => {
                      setLoadout({});
                      setCharacterName('');
                      setLevel(40);
                      setRenownSelections({});
                      setRenownRank(80);
                      setMasteryPathPoints({ a: 0, b: 0, c: 0 });
                      setAcquiredTierAbilityIds([]);
                      setSelectedTactics([]);
                      setSelectedMorales([]);
                      setHasSovereign(false);
                      setBuildName('');
                      setBuildDescription('');
                      setActiveBuildId(null);
                      setListPublicly(false);
                      setSaveStatus('');
                      // Drop any ?shared=/build-sharing query params too, so
                      // a refresh (or re-sharing the URL) doesn't silently
                      // bring the old build right back.
                      window.history.replaceState(
                        null,
                        '',
                        window.location.pathname,
                      );
                    }}
                  >
                    <span className="icon is-small">
                      <i className="fas fa-rotate-left" />
                    </span>
                    <span>Clear loadout</span>
                  </button>
                </div>
                <div className="control">
                  <button
                    type="button"
                    className="button is-small"
                    title="Unequip every item and clear the character name (leaves renown and mastery alone)"
                    disabled={
                      Object.keys(loadout).length === 0 && !characterName
                    }
                    onClick={() => {
                      setLoadout({});
                      setCharacterName('');
                    }}
                  >
                    <span className="icon is-small">
                      <i className="fas fa-rotate-left" />
                    </span>
                    <span>Clear Gear</span>
                  </button>
                </div>
              </div>
            </div>
            <CharacterImport
              onImport={(imported) => {
                setRealm(careerRealm(imported.career));
                setCareer(imported.career);
                setLevel(imported.level);
                setRenownRank(clampRenownRank(imported.renownRank));
                setCharacterName(imported.characterName);
                setLoadout(imported.loadout);
                setRenownSelections({});
              }}
            />
          </div>

          <div className="loadout-paperdoll-wrap mb-4">
            <div className="loadout-paperdoll">
              <div className="loadout-paperdoll-col loadout-paperdoll-col-left">
                {leftSlots.map(renderSlot)}
              </div>

              <div className="loadout-paperdoll-center">
                <input
                  aria-label="Loadout character name"
                  className="input is-small loadout-name-input"
                  type="text"
                  placeholder="Character Name"
                  value={characterName}
                  onChange={(event) => setCharacterName(event.target.value)}
                  maxLength={24}
                />
                <p className="loadout-character-title has-text-grey">
                  Rank {level} {enumLabel(career)}
                </p>

                <div
                  className={`loadout-stats-screen ${
                    realm === 'Destruction' ? 'is-destruction' : ''
                  }`}
                >
                  <div className="loadout-stats-screen-section">
                    <h3 className="loadout-stats-screen-heading">
                      Primary Stats
                    </h3>
                    <div className="loadout-core-stats">
                      {CORE_STAT_ROWS.map(([a, b]) => (
                        <div
                          className="loadout-core-stats-row"
                          key={`${a}-${b}`}
                        >
                          <div className="loadout-core-stat">
                            <span>{displayLabel(enumLabel(a))}</span>
                            <span>
                              {findStat(a).flat}
                              {findStat(a).percent !== 0
                                ? ` (+${findStat(a).percent}%)`
                                : ''}
                            </span>
                          </div>
                          <div className="loadout-core-stat">
                            <span>{displayLabel(enumLabel(b))}</span>
                            <span>
                              {findStat(b).flat}
                              {findStat(b).percent !== 0
                                ? ` (+${findStat(b).percent}%)`
                                : ''}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {STAT_GROUPS.filter((g) => g.label !== 'Primary Stats').map(
                    (group) => {
                      const rows = group.stats
                        .map((s) => ({ stat: s, ...findStat(s) }))
                        .filter((r) => r.flat !== 0 || r.percent !== 0);
                      if (rows.length === 0) return null;
                      return (
                        <div
                          className="loadout-stats-screen-section"
                          key={group.label}
                        >
                          <h3 className="loadout-stats-screen-heading">
                            {displayLabel(group.label)}
                          </h3>
                          {rows.map((r) => (
                            <div
                              className="loadout-stats-screen-row"
                              key={r.stat}
                            >
                              <span>{displayLabel(enumLabel(r.stat))}</span>
                              <span>
                                {r.flat !== 0
                                  ? `${r.flat > 0 ? '+' : ''}${r.flat}`
                                  : ''}
                                {r.flat !== 0 && r.percent !== 0 ? ' ' : ''}
                                {r.percent !== 0
                                  ? `${r.percent > 0 ? '+' : ''}${r.percent}%`
                                  : ''}
                              </span>
                            </div>
                          ))}
                        </div>
                      );
                    },
                  )}

                  {(() => {
                    const rows = uncategorizedStats(stats.map((s) => s.stat))
                      .map((s) => ({ stat: s, ...findStat(s) }))
                      .filter((r) => r.flat !== 0 || r.percent !== 0);
                    if (rows.length === 0) return null;
                    return (
                      <div className="loadout-stats-screen-section">
                        <h3 className="loadout-stats-screen-heading">
                          {OTHER_STATS_LABEL}
                        </h3>
                        {rows.map((r) => (
                          <div
                            className="loadout-stats-screen-row"
                            key={r.stat}
                          >
                            <span>{displayLabel(enumLabel(r.stat))}</span>
                            <span>
                              {r.flat !== 0
                                ? `${r.flat > 0 ? '+' : ''}${r.flat}`
                                : ''}
                              {r.flat !== 0 && r.percent !== 0 ? ' ' : ''}
                              {r.percent !== 0
                                ? `${r.percent > 0 ? '+' : ''}${r.percent}%`
                                : ''}
                            </span>
                          </div>
                        ))}
                      </div>
                    );
                  })()}

                  <div className="loadout-stats-screen-section">
                    <h3 className="loadout-stats-screen-heading">
                      Damage &amp; Healing Bonus
                    </h3>
                    <div className="loadout-stats-screen-row">
                      <span>Melee Damage Bonus</span>
                      <span>{damageHealingBonuses.meleeDamageBonus}</span>
                    </div>
                    <div className="loadout-stats-screen-row">
                      <span>Ranged Damage Bonus</span>
                      <span>{damageHealingBonuses.rangedDamageBonus}</span>
                    </div>
                    <div className="loadout-stats-screen-row">
                      <span>Magic Damage Bonus</span>
                      <span>{damageHealingBonuses.magicDamageBonus}</span>
                    </div>
                    <div className="loadout-stats-screen-row">
                      <span>Healing Bonus</span>
                      <span>{damageHealingBonuses.healingBonus}</span>
                    </div>
                  </div>

                  {sets.length > 0 && (
                    <div className="loadout-stats-screen-section">
                      <h3 className="loadout-stats-screen-heading">
                        Set Bonuses
                      </h3>
                      {sets.map((set) => (
                        <div
                          key={set.setId}
                          className="loadout-stats-screen-set"
                        >
                          <p className="loadout-stats-screen-set-name">
                            {set.setName} &middot; {set.equippedCount} equipped
                          </p>
                          {set.activeBonuses.map((b) => (
                            <p
                              key={b.itemsRequired}
                              className="has-text-success is-size-7"
                            >
                              ({b.itemsRequired}) {b.description}
                            </p>
                          ))}
                          {set.nextBonus && (
                            <p className="has-text-grey is-size-7">
                              ({set.nextBonus.itemsRequired}){' '}
                              {set.nextBonus.description} — needs{' '}
                              {set.nextBonus.itemsRequired - set.equippedCount}{' '}
                              more piece(s)
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className="button is-small mt-2"
                  onClick={() => handleShare('gear')}
                >
                  <span className="icon is-small">
                    <i className="fas fa-share-nodes" />
                  </span>
                  <span>
                    {shareStatus === 'copied'
                      ? 'Gear link copied!'
                      : 'Share Gear'}
                  </span>
                </button>
                {hydrating && (
                  <p className="has-text-grey is-size-7 mt-2">
                    Loading shared build...
                  </p>
                )}
              </div>

              <div className="loadout-paperdoll-col loadout-paperdoll-col-right">
                {rightSlots.map(renderSlot)}
              </div>

              <div className="loadout-paperdoll-bottom">
                {bottomSlots.map(renderSlot)}
              </div>
            </div>
          </div>

          {activeSlot && (
            <ItemPicker
              slot={activeSlot}
              career={career}
              level={level}
              renownRank={renownRank}
              currentItem={loadout[activeSlot]}
              equippedElsewhere={Object.entries(loadout)
                .filter(([slotKey]) => slotKey !== activeSlot)
                .map(([, item]) => item)
                .filter((item): item is LoadoutItem => Boolean(item))}
              allSocketedTalismans={equippedItems
                .flatMap((item) => item.talismans ?? [])
                .filter((t): t is LoadoutItem => Boolean(t))}
              mainHandItem={loadout[EquipSlot.MainHand]}
              onSelect={(item) =>
                setLoadout((prev) => {
                  const next = { ...prev, [activeSlot]: item };
                  // Equipping a two-handed weapon in Main Hand invalidates
                  // whatever's in Off Hand - clear it rather than leaving an
                  // inconsistent loadout.
                  if (
                    activeSlot === EquipSlot.MainHand &&
                    isTwoHandedMainHandWeapon(item)
                  ) {
                    delete next[EquipSlot.OffHand];
                  }
                  return next;
                })
              }
              onRemove={() =>
                setLoadout((prev) => {
                  const next = { ...prev };
                  delete next[activeSlot];
                  return next;
                })
              }
              onSetTalisman={(index, talisman) =>
                setLoadout((prev) => {
                  const item = prev[activeSlot];
                  if (!item) return prev;
                  const talismans = [...(item.talismans ?? [])];
                  talismans[index] = talisman;
                  return { ...prev, [activeSlot]: { ...item, talismans } };
                })
              }
              onRemoveTalisman={(index) =>
                setLoadout((prev) => {
                  const item = prev[activeSlot];
                  if (!item) return prev;
                  const talismans = [...(item.talismans ?? [])];
                  talismans[index] = null;
                  return { ...prev, [activeSlot]: { ...item, talismans } };
                })
              }
              onClose={() => setActiveSlot(null)}
            />
          )}
        </>
      )}

      {activePlannerTab === 'renown' && (
        <div>
          <div className="planner-tab-actions">
            <button
              type="button"
              className="button is-small"
              onClick={() => handleShare('renown')}
            >
              <span className="icon is-small">
                <i className="fas fa-share-nodes" />
              </span>
              <span>
                {shareStatus === 'copied'
                  ? 'Renown link copied!'
                  : 'Share Renown'}
              </span>
            </button>
          </div>
          <RenownPanel
            selections={renownSelections}
            onChange={setRenownSelections}
            level={level}
            renownRank={renownRank}
            onClose={() => setActivePlannerTab('gear')}
            embedded
          />
        </div>
      )}

      {activePlannerTab === 'mastery' && (
        <div>
          <div className="loadout-toolbar mastery-career-toolbar mb-4">
            <div className="buttons has-addons">
              <button
                type="button"
                className={`button ${
                  realm === 'Order' ? 'is-link is-selected' : ''
                }`}
                onClick={() => handleRealmChange('Order')}
              >
                Order
              </button>
              <button
                type="button"
                className={`button ${
                  realm === 'Destruction' ? 'is-danger is-selected' : ''
                }`}
                onClick={() => handleRealmChange('Destruction')}
              >
                Destruction
              </button>
            </div>
            <div className="select">
              <select
                aria-label="Mastery career"
                value={career}
                onChange={(event) =>
                  handleCareerChange(event.target.value as Career)
                }
              >
                {careerOptions.map((option) => (
                  <option key={option} value={option}>
                    {enumLabel(option)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="planner-tab-actions">
            <button
              type="button"
              className="button is-small"
              onClick={() => handleShare('mastery')}
            >
              <span className="icon is-small">
                <i className="fas fa-share-nodes" />
              </span>
              <span>
                {shareStatus === 'copied'
                  ? 'Mastery link copied!'
                  : 'Share Mastery'}
              </span>
            </button>
            <button
              type="button"
              className="button is-small"
              title="Reset the mastery tree, tactics, and morales back to a blank build"
              disabled={
                masteryPathPoints.a === 0 &&
                masteryPathPoints.b === 0 &&
                masteryPathPoints.c === 0 &&
                acquiredTierAbilityIds.length === 0 &&
                selectedTactics.length === 0 &&
                selectedMorales.length === 0 &&
                !hasSovereign
              }
              onClick={() => {
                setMasteryPathPoints({ a: 0, b: 0, c: 0 });
                setAcquiredTierAbilityIds([]);
                setSelectedTactics([]);
                setSelectedMorales([]);
                setHasSovereign(false);
              }}
            >
              <span className="icon is-small">
                <i className="fas fa-rotate-left" />
              </span>
              <span>Clear Mastery</span>
            </button>
          </div>
          <MasteryBuilder
            career={career}
            level={level}
            onLevelChange={(next) => setLevel(Math.min(40, Math.max(1, next)))}
            renownRank={renownRank}
            onRenownRankChange={(next) => setRenownRank(clampRenownRank(next))}
            pathPoints={masteryPathPoints}
            onPathPointsChange={setMasteryPathPoints}
            acquiredTierAbilityIds={acquiredTierAbilityIds}
            onAcquiredTierAbilityIdsChange={setAcquiredTierAbilityIds}
            selectedTactics={selectedTactics}
            onSelectedTacticsChange={setSelectedTactics}
            selectedMorales={selectedMorales}
            onSelectedMoralesChange={setSelectedMorales}
            hasSovereign={hasSovereign}
            onHasSovereignChange={setHasSovereign}
            onClose={() => setActivePlannerTab('gear')}
            embedded
          />
        </div>
      )}
    </div>
  );
};

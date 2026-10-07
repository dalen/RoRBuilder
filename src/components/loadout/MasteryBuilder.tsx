import {
  type ReactElement,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Career } from '__generated__/graphql';
import { AbilityTooltip } from 'components/loadout/AbilityTooltip';
import {
  type CareerMasteryData,
  type MasteryAbility,
  type MasteryPath,
  type MasteryPathTierAbility,
  getCareerMasteryData,
} from 'components/loadout/masteryData';
import {
  MASTERY_PATH_MAX,
  calculateMasteryPoints,
  calculateTacticLimit,
} from 'components/loadout/masteryRules';

export interface MasteryPathPoints {
  a: number;
  b: number;
  c: number;
}

const parseMoraleRank = (cost: string): number => {
  const match = /Rank (\d) morale/i.exec(cost);
  return match ? Number(match[1]) : 0;
};

// Tooltip is 260px wide and sits 0.6rem to the right of the icon by default;
// if the icon is close enough to the right edge of the viewport that the
// tooltip would run off (and get clipped by the modal's overflow-y: auto),
// flip it to render to the left instead.
const TOOLTIP_WIDTH_PX = 260;
const TOOLTIP_GAP_PX = 10;

const AbilityIcon = ({
  ability,
  active,
  eligible,
  selected,
  onClick,
}: {
  ability: MasteryAbility;
  active: boolean;
  eligible?: boolean;
  selected?: boolean;
  onClick?: () => void;
}): ReactElement => {
  const [hovered, setHovered] = useState(false);
  const [flip, setFlip] = useState(false);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const tooltipId = useId();

  const handleMouseEnter = (): void => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (rect) {
      // Measure against the modal's own right edge (the actual clipping
      // container, since .modal-card-body has overflow-y: auto which
      // implicitly constrains overflow-x too), falling back to the
      // viewport width if the modal ancestor can't be found.
      const modalEl = wrapperRef.current?.closest('.modal-card');
      const boundaryRight = modalEl
        ? modalEl.getBoundingClientRect().right
        : window.innerWidth;
      setFlip(rect.right + TOOLTIP_GAP_PX + TOOLTIP_WIDTH_PX > boundaryRight);
    }
    setHovered(true);
  };

  return (
    <span
      ref={wrapperRef}
      className="loadout-mastery-ability-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        type="button"
        className={`loadout-mastery-ability ${
          active ? 'is-active' : eligible ? 'is-eligible' : 'is-inactive'
        } ${selected ? 'is-selected' : ''}`}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
        onFocus={handleMouseEnter}
        onBlur={() => setHovered(false)}
        onTouchStart={handleMouseEnter}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setHovered(false);
            event.currentTarget.blur();
          }
        }}
        onClick={onClick}
        aria-label={`${ability.name}. ${ability.cost}. Requires level ${ability.minRank}.`}
        aria-describedby={hovered ? tooltipId : undefined}
        aria-pressed={onClick ? Boolean(selected) : undefined}
      >
        <img src={ability.iconUrl} alt="" />
      </button>
      {hovered && (
        <AbilityTooltip ability={ability} flip={flip} id={tooltipId} />
      )}
    </span>
  );
};

// A vertical, clickable point meter for one path -- mirrors the layout of
// the official career builder (dalen/RoRBuilder's PathMeter component):
// level 1 at the bottom, level 15 at the top, click any reachable level to
// jump the meter straight to it.
const PathMeterBar = ({
  pathPoints,
  remaining,
  onSetPoints,
}: {
  pathPoints: number;
  remaining: number;
  onSetPoints: (value: number) => void;
}): ReactElement => {
  // Push level 1 first, 15 last. Combined with the .loadout-mastery-bar
  // CSS using flex-direction: column-reverse, this renders level 1 at the
  // bottom and level 15 at the top -- i.e. the bar visually fills upward as
  // points go in, matching the real career builder (and "going up the
  // tree" reads correctly instead of upside down).
  const levels = [];
  for (let i = 1; i <= MASTERY_PATH_MAX; i += 1) {
    const isFilled = i <= pathPoints;
    const isReachable = !isFilled && i <= pathPoints + remaining;
    levels.push(
      <button
        key={i}
        type="button"
        className={`loadout-mastery-bar-level ${
          isFilled ? 'is-filled' : isReachable ? 'is-reachable' : ''
        }`}
        onClick={() => onSetPoints(i)}
        disabled={!isFilled && !isReachable}
      >
        {i}
      </button>,
    );
  }
  return <div className="loadout-mastery-bar">{levels}</div>;
};

export const MasteryBuilder = ({
  career,
  level,
  onLevelChange,
  renownRank,
  onRenownRankChange,
  hasSovereign,
  onHasSovereignChange,
  pathPoints,
  onPathPointsChange,
  acquiredTierAbilityIds,
  onAcquiredTierAbilityIdsChange,
  selectedTactics,
  onSelectedTacticsChange,
  selectedMorales,
  onSelectedMoralesChange,
  onClose,
  embedded = false,
}: {
  career: Career;
  level: number;
  onLevelChange: (level: number) => void;
  renownRank: number;
  onRenownRankChange: (renownRank: number) => void;
  hasSovereign: boolean;
  onHasSovereignChange: (value: boolean) => void;
  pathPoints: MasteryPathPoints;
  onPathPointsChange: (points: MasteryPathPoints) => void;
  acquiredTierAbilityIds: number[];
  onAcquiredTierAbilityIdsChange: (ids: number[]) => void;
  selectedTactics: number[];
  onSelectedTacticsChange: (ids: number[]) => void;
  selectedMorales: number[];
  onSelectedMoralesChange: (ids: number[]) => void;
  onClose: () => void;
  embedded?: boolean;
}): ReactElement => {
  const [data, setData] = useState<CareerMasteryData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setData(null);
    setError(null);
    getCareerMasteryData(career)
      .then(setData)
      .catch(() => setError('Could not load mastery data for this career.'));
  }, [career]);

  const totalPoints = calculateMasteryPoints(level, renownRank, hasSovereign);
  const tacticLimit = calculateTacticLimit(level);

  // Spend model matches dalen's RoRBuilder exactly (src/containers/AbilityMastery.tsx):
  // the path meter (pathPoints.a/b/c) is pure prerequisite "filler" - clicking a
  // meter level jumps straight to it. Taking a specific tier ability costs one
  // point *on top of* the meter, tracked separately here via
  // acquiredTierAbilityIds, so the meter's displayed number does not itself
  // grow when an ability is taken. Total spent = filler in all 3 paths, plus
  // one point per acquired tier ability. Tactics and morales do NOT draw from
  // this pool in the live game (or in dalen's legacy AbilityTactic.tsx /
  // AbilityMorale.tsx) - choosing which unlocked tactics/morales to bring
  // into your loadout is free, gated only by tacticLimit and one-per-rank.
  const spent =
    pathPoints.a + pathPoints.b + pathPoints.c + acquiredTierAbilityIds.length;
  const remaining = totalPoints - spent;

  const allTierAbilities = useMemo(() => {
    if (!data) return [];
    return data.paths.flatMap((path) =>
      path.tierAbilities.map((tier) => ({ path, tier })),
    );
  }, [data]);

  // Setting a path's meter can drop it below the requirement for an already
  // -acquired ability in that path -- when that happens the game auto
  // -refunds whatever no longer qualifies, same as dalen's
  // componentWillReceiveProps cleanup. If that ability had also been
  // selected as an active tactic, drop it from the loadout too rather than
  // leaving a phantom selection for an ability that's no longer unlocked.
  const setPath = (key: 'a' | 'b' | 'c', value: number): void => {
    const clamped = Math.max(0, Math.min(MASTERY_PATH_MAX, value));
    const nextPathPoints = { ...pathPoints, [key]: clamped };
    const invalidated = allTierAbilities
      .filter(
        ({ path, tier }) => path.key === key && tier.pointsRequired > clamped,
      )
      .map(({ tier }) => tier.ability.id);
    const nextAcquired = invalidated.length
      ? acquiredTierAbilityIds.filter((id) => !invalidated.includes(id))
      : acquiredTierAbilityIds;
    const nextSpent =
      nextPathPoints.a + nextPathPoints.b + nextPathPoints.c + nextAcquired.length;
    if (nextSpent > totalPoints) return;
    onPathPointsChange(nextPathPoints);
    if (nextAcquired !== acquiredTierAbilityIds)
      onAcquiredTierAbilityIdsChange(nextAcquired);
    if (invalidated.length) {
      const nextSelectedTactics = selectedTactics.filter(
        (id) => !invalidated.includes(id),
      );
      if (nextSelectedTactics.length !== selectedTactics.length)
        onSelectedTacticsChange(nextSelectedTactics);
    }
  };

  const investInTier = (
    path: MasteryPath,
    tier: MasteryPathTierAbility,
  ): void => {
    if (level < tier.ability.minRank) return;
    const already = acquiredTierAbilityIds.includes(tier.ability.id);
    if (already) {
      onAcquiredTierAbilityIdsChange(
        acquiredTierAbilityIds.filter((id) => id !== tier.ability.id),
      );
      if (selectedTactics.includes(tier.ability.id)) {
        onSelectedTacticsChange(
          selectedTactics.filter((id) => id !== tier.ability.id),
        );
      }
      return;
    }
    const fillerNeeded = Math.max(
      0,
      tier.pointsRequired - pathPoints[path.key],
    );
    const cost = fillerNeeded + 1;
    if (remaining < cost) return;
    onAcquiredTierAbilityIdsChange([
      ...acquiredTierAbilityIds,
      tier.ability.id,
    ]);
    if (fillerNeeded > 0) {
      onPathPointsChange({ ...pathPoints, [path.key]: tier.pointsRequired });
    }
  };

  const [shareStatus, setShareStatus] = useState<'idle' | 'copied'>('idle');
  const handleShareMastery = async (): Promise<void> => {
    const params = new URLSearchParams();
    params.set('career', career);
    params.set('level', String(level));
    params.set('rr', String(renownRank));
    if (hasSovereign) params.set('sov', '1');
    params.set('pa', String(pathPoints.a));
    params.set('pb', String(pathPoints.b));
    params.set('pc', String(pathPoints.c));
    if (acquiredTierAbilityIds.length)
      params.set('ma', acquiredTierAbilityIds.join(','));
    if (selectedTactics.length) params.set('t', selectedTactics.join(','));
    if (selectedMorales.length) params.set('mo', selectedMorales.join(','));
    params.set('mastery', '1');
    const url = `${window.location.origin}${
      window.location.pathname
    }?${params.toString()}`;
    try {
      await navigator.clipboard.writeText(url);
      setShareStatus('copied');
      setTimeout(() => setShareStatus('idle'), 2500);
    } catch {
      window.prompt('Copy this link to share your mastery build:', url);
    }
  };

  // Tactics can come from a career's always-available list, or be unlocked
  // by actually taking (clicking, not just pointing toward) a tactic tier
  // ability in a mastery path.
  const availableTactics = useMemo(() => {
    if (!data) return [];
    const list: MasteryAbility[] = data.coreAbilities.filter(
      (a) => a.category === 'CareerTactic',
    );
    for (const path of data.paths) {
      for (const tier of path.tierAbilities) {
        if (
          tier.ability.category === 'CareerTactic' &&
          acquiredTierAbilityIds.includes(tier.ability.id)
        ) {
          list.push(tier.ability);
        }
      }
    }
    return list;
  }, [data, acquiredTierAbilityIds]);

  // Selecting a tactic to bring into the loadout is free (see the `spent`
  // comment above) - it's capped only by tacticLimit, same as dalen's legacy
  // AbilityTactic.tsx.
  const toggleTactic = (ability: MasteryAbility): void => {
    if (level < ability.minRank) return;
    const isSelected = selectedTactics.includes(ability.id);
    if (isSelected) {
      onSelectedTacticsChange(
        selectedTactics.filter((id) => id !== ability.id),
      );
    } else if (selectedTactics.length < tacticLimit) {
      onSelectedTacticsChange([...selectedTactics, ability.id]);
    }
  };

  // Only one morale can be slotted per rank (1-4), same as the live game and
  // the official builder: picking a different morale in the same rank swaps
  // out whichever one was selected there before. Like tactics, morale
  // selection is free and doesn't draw from the mastery point pool.
  const selectMorale = (
    ability: MasteryAbility,
    rankMates: MasteryAbility[],
  ): void => {
    if (level < ability.minRank) return;
    const isSelected = selectedMorales.includes(ability.id);
    if (isSelected) {
      onSelectedMoralesChange(
        selectedMorales.filter((id) => id !== ability.id),
      );
      return;
    }
    const rankMateIds = new Set(rankMates.map((a) => a.id));
    onSelectedMoralesChange([
      ...selectedMorales.filter((id) => !rankMateIds.has(id)),
      ability.id,
    ]);
  };

  const morales = useMemo(() => {
    if (!data) return [] as { rank: number; abilities: MasteryAbility[] }[];
    const moraleAbilities = data.coreAbilities.filter(
      (a) => a.category === 'Morale',
    );
    const byRank = new Map<number, MasteryAbility[]>();
    for (const a of moraleAbilities) {
      const rank = parseMoraleRank(a.cost);
      const list = byRank.get(rank) ?? [];
      list.push(a);
      byRank.set(rank, list);
    }
    return Array.from(byRank.entries())
      .sort(([a], [b]) => a - b)
      .map(([rank, abilities]) => ({ rank, abilities }));
  }, [data]);

  const coreDisplayAbilities = useMemo(
    () =>
      data
        ? data.coreAbilities.filter(
            (a) => a.category !== 'Morale' && a.category !== 'CareerTactic',
          )
        : [],
    [data],
  );

  return (
    <div className={embedded ? 'loadout-builder-embedded' : 'modal is-active'}>
      {!embedded && <div className="modal-background" onClick={onClose} />}
      <div
        className={`modal-card loadout-mastery-modal ${
          embedded ? 'is-embedded' : ''
        }`}
      >
        <header className="modal-card-head">
          <p className="modal-card-title">Mastery Builder</p>
          <div className="field has-addons loadout-mastery-level-renown mr-2">
            <div className="control">
              <input
                className="input is-small"
                type="number"
                min={1}
                max={40}
                value={level}
                onChange={(event) =>
                  onLevelChange(
                    Math.min(40, Math.max(1, Number(event.target.value) || 1)),
                  )
                }
                title="Character level (affects mastery point budget)"
                style={{ width: '4rem' }}
              />
            </div>
            <div className="control">
              <input
                className="input is-small"
                type="number"
                min={0}
                value={renownRank}
                onChange={(event) =>
                  onRenownRankChange(
                    Math.max(0, Math.round(Number(event.target.value) || 0)),
                  )
                }
                title="Renown rank (affects mastery point budget - points stop increasing past RR 80)"
                style={{ width: '4.5rem' }}
              />
            </div>
          </div>
          <label className="checkbox loadout-mastery-sovereign-toggle mr-2">
            <input
              type="checkbox"
              checked={hasSovereign}
              onChange={(event) => onHasSovereignChange(event.target.checked)}
            />{' '}
            Sovereign (+2 points)
          </label>
          <button
            type="button"
            className="button is-small mr-2"
            onClick={handleShareMastery}
          >
            <span className="icon is-small">
              <i className="fas fa-share-nodes" />
            </span>
            <span>
              {shareStatus === 'copied' ? 'Link copied!' : 'Share build'}
            </span>
          </button>
          {!embedded && (
            <button
              type="button"
              className="delete"
              aria-label="close"
              onClick={onClose}
            />
          )}
        </header>
        <section className="modal-card-body">
          {error && <p className="has-text-danger">{error}</p>}
          {!data && !error && <p className="has-text-grey">Loading...</p>}
          {data && (
            <>
              <div className="loadout-mastery-section">
                <h3 className="loadout-stats-screen-heading">Core Abilities</h3>
                <div className="loadout-mastery-row">
                  {coreDisplayAbilities.map((a) => (
                    <AbilityIcon
                      key={a.id}
                      ability={a}
                      active={level >= a.minRank}
                    />
                  ))}
                </div>
              </div>

              <div className="loadout-mastery-section">
                <h3 className="loadout-stats-screen-heading">Morales</h3>
                <div className="loadout-mastery-morale-groups">
                  {morales.map(({ rank, abilities }) => (
                    <div key={rank}>
                      <p className="has-text-grey is-size-7">Rank {rank}</p>
                      <div className="loadout-mastery-row">
                        {abilities.map((a: MasteryAbility) => (
                          <AbilityIcon
                            key={a.id}
                            ability={a}
                            active={level >= a.minRank}
                            selected={selectedMorales.includes(a.id)}
                            onClick={() => selectMorale(a, abilities)}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="loadout-mastery-section">
                <h3 className="loadout-stats-screen-heading">
                  Tactics ({selectedTactics.length}/{tacticLimit})
                </h3>
                <div className="loadout-mastery-row">
                  {availableTactics.map((a) => (
                    <AbilityIcon
                      key={a.id}
                      ability={a}
                      active={level >= a.minRank}
                      selected={selectedTactics.includes(a.id)}
                      onClick={() => toggleTactic(a)}
                    />
                  ))}
                </div>
              </div>

              <div className="loadout-mastery-section">
                <div className="loadout-mastery-points-header">
                  <h3 className="loadout-stats-screen-heading">
                    Mastery Abilities
                  </h3>
                  <span
                    className={`loadout-mastery-points-badge ${
                      remaining < 0 ? 'is-over' : ''
                    }`}
                  >
                    {remaining} of {totalPoints} points remaining
                  </span>
                </div>
                <div className="loadout-mastery-paths">
                  {data.paths.map((path) => (
                    <div key={path.key} className="loadout-mastery-path">
                      <p className="loadout-mastery-path-name">{path.name}</p>
                      <p className="has-text-grey is-size-7 mb-2">
                        {path.description}
                      </p>
                      <p className="has-text-grey is-size-7 mb-2">
                        Click a bar level to fill the path toward a tier, then
                        click the ability to spend the extra point and take it.
                      </p>
                      <div className="loadout-mastery-path-body">
                        <div className="loadout-mastery-bar-column">
                          <PathMeterBar
                            pathPoints={pathPoints[path.key]}
                            remaining={remaining}
                            onSetPoints={(value) => setPath(path.key, value)}
                          />
                          <div className="loadout-mastery-path-buttons">
                            <button
                              type="button"
                              className="button is-small"
                              onClick={() =>
                                setPath(path.key, pathPoints[path.key] - 1)
                              }
                              disabled={pathPoints[path.key] <= 0}
                              title="Remove a point"
                            >
                              −
                            </button>
                            <button
                              type="button"
                              className="button is-small"
                              onClick={() =>
                                setPath(path.key, pathPoints[path.key] + 1)
                              }
                              disabled={
                                pathPoints[path.key] >= MASTERY_PATH_MAX ||
                                remaining <= 0
                              }
                              title="Add a point"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="loadout-mastery-tier-column">
                          {[...path.tierAbilities].reverse().map((tier) => {
                            const acquired = acquiredTierAbilityIds.includes(
                              tier.ability.id,
                            );
                            const fillerNeeded = Math.max(
                              0,
                              tier.pointsRequired - pathPoints[path.key],
                            );
                            const eligible =
                              !acquired &&
                              level >= tier.ability.minRank &&
                              remaining >= fillerNeeded + 1;
                            return (
                              <div
                                key={tier.tier}
                                className="loadout-mastery-tier-row"
                              >
                                <span className="loadout-mastery-tier-req">
                                  {tier.pointsRequired}
                                </span>
                                <AbilityIcon
                                  ability={tier.ability}
                                  active={
                                    acquired && level >= tier.ability.minRank
                                  }
                                  eligible={eligible}
                                  onClick={() => investInTier(path, tier)}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <p className="has-text-grey is-size-7 mt-2">Core</p>
                      <div className="loadout-mastery-row">
                        {path.coreAbilities.map((a) => (
                          <AbilityIcon
                            key={a.id}
                            ability={a}
                            active={level >= a.minRank}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

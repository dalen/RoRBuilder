import { Stat } from '__generated__/graphql';

export type RenownAbilityKey =
  | 'might'
  | 'bladeMaster'
  | 'marksman'
  | 'impetus'
  | 'acumen'
  | 'resolve'
  | 'fortitude'
  | 'vigor'
  | 'opportunist'
  | 'sureShot'
  | 'focusedPower'
  | 'spiritualRefinement'
  | 'regeneration'
  | 'quickEscape'
  | 'improvedFlee'
  | 'reflexes'
  | 'defender'
  | 'deftDefender'
  | 'hardyConcession'
  | 'futileStrikes'
  | 'trivialBlows'
  | 'expandedCapacity';

export interface RenownAbilityDef {
  key: RenownAbilityKey;
  label: string;
  /** The Stat this ability's effect feeds into, when it maps to one of our GraphQL Stat values. */
  stat: Stat | null;
  /** Whether the effect total is a percentage-type contribution. */
  percentage: boolean;
  /** Cumulative effect total at each rank, index 0..maxRank. */
  effectByRank: number[];
  /** Cumulative renown point cost to reach each rank, index 0..maxRank. */
  costByRank: number[];
  effectTextByRank?: string[];
}

// Renown ability catalogue: point costs and cumulative effect totals per rank.
// This reflects the live server's own renown training tree (Basic / Advanced /
// Defensive branches) — factual game-balance data, independently tabulated
// here rather than taken from any third party's source files.
const ALL_RENOWN_ABILITIES: RenownAbilityDef[] = [
  {
    key: 'might',
    label: 'Might (Strength)',
    stat: Stat.Strength,
    percentage: false,
    effectByRank: [0, 4, 16, 38, 72, 120],
    costByRank: [0, 1, 4, 10, 20, 34],
  },
  {
    key: 'bladeMaster',
    label: 'Blade Master (Weapon Skill)',
    stat: Stat.WeaponSkill,
    percentage: false,
    effectByRank: [0, 4, 16, 38, 72, 120],
    costByRank: [0, 1, 4, 10, 20, 34],
  },
  {
    key: 'marksman',
    label: 'Marksman (Ballistic Skill)',
    stat: Stat.BallisticSkill,
    percentage: false,
    effectByRank: [0, 4, 16, 38, 72, 120],
    costByRank: [0, 1, 4, 10, 20, 34],
  },
  {
    key: 'impetus',
    label: 'Impetus (Initiative)',
    stat: Stat.Initiative,
    percentage: false,
    effectByRank: [0, 4, 16, 38, 72, 120],
    costByRank: [0, 1, 4, 10, 20, 34],
  },
  {
    key: 'acumen',
    label: 'Acumen (Intelligence)',
    stat: Stat.Intelligence,
    percentage: false,
    effectByRank: [0, 4, 16, 38, 72, 120],
    costByRank: [0, 1, 4, 10, 20, 34],
  },
  {
    key: 'resolve',
    label: 'Resolve (Willpower)',
    stat: Stat.Willpower,
    percentage: false,
    effectByRank: [0, 4, 16, 38, 72, 120],
    costByRank: [0, 1, 4, 10, 20, 34],
  },
  {
    key: 'fortitude',
    label: 'Fortitude (Toughness)',
    stat: Stat.Toughness,
    percentage: false,
    effectByRank: [0, 4, 16, 38, 72, 120],
    costByRank: [0, 1, 4, 10, 20, 34],
  },
  {
    key: 'vigor',
    label: 'Vigor (Wounds)',
    stat: Stat.Wounds,
    percentage: false,
    effectByRank: [0, 4, 16, 38, 72, 120],
    costByRank: [0, 1, 4, 10, 20, 34],
  },
  {
    key: 'opportunist',
    label: 'Opportunist (Offensive Crit)',
    stat: null,
    percentage: true,
    effectByRank: [0, 2, 5, 9, 14, 14],
    costByRank: [0, 5, 15, 30, 45, 45],
  },
  {
    key: 'sureShot',
    label: 'Sure Shot (Ranged Crit)',
    stat: Stat.RangedCritRate,
    percentage: true,
    effectByRank: [0, 2, 5, 9, 14],
    costByRank: [0, 5, 15, 30, 45],
  },
  {
    key: 'focusedPower',
    label: 'Focused Power (Magic Crit)',
    stat: Stat.MagicCritRate,
    percentage: true,
    effectByRank: [0, 2, 5, 9, 14],
    costByRank: [0, 5, 15, 30, 45],
  },
  {
    key: 'spiritualRefinement',
    label: 'Spiritual Refinement (Heal Crit)',
    stat: Stat.HealCritRate,
    percentage: true,
    effectByRank: [0, 2, 5, 9, 14, 14],
    costByRank: [0, 5, 15, 30, 45, 45],
  },
  {
    key: 'regeneration',
    label: 'Regeneration (Health Regen)',
    stat: Stat.HealthRegen,
    percentage: false,
    effectByRank: [0, 7, 17, 35, 35, 35],
    costByRank: [0, 10, 25, 45, 45, 45],
  },
  {
    key: 'quickEscape',
    label: 'Quick Escape',
    stat: null,
    percentage: false,
    effectByRank: [0, 0, 0, 0],
    costByRank: [0, 10, 25, 45],
    effectTextByRank: [
      'Not trained',
      '5% chance: +25% movement for 5s',
      '+5s duration',
      'Movement bonus increased to 35%',
    ],
  },
  {
    key: 'improvedFlee',
    label: 'Improved Flee',
    stat: null,
    percentage: false,
    effectByRank: [0, 0, 0],
    costByRank: [0, 10, 25],
    effectTextByRank: [
      'Not trained',
      '+5s Flee duration',
      'Action Points regenerate while fleeing',
    ],
  },
  {
    key: 'reflexes',
    label: 'Reflexes (Parry)',
    stat: Stat.Parry,
    percentage: true,
    effectByRank: [0, 3, 7, 12, 18, 18],
    costByRank: [0, 1, 4, 10, 20, 20],
  },
  {
    key: 'defender',
    label: 'Defender (Block)',
    stat: Stat.Block,
    percentage: true,
    effectByRank: [0, 1, 3, 6, 10, 10],
    costByRank: [0, 1, 4, 10, 20, 20],
  },
  {
    key: 'deftDefender',
    label: 'Deft Defender (Evade & Disrupt)',
    stat: null,
    percentage: true,
    effectByRank: [0, 3, 7, 12, 18, 18],
    costByRank: [0, 1, 4, 10, 20, 20],
  },
  {
    key: 'hardyConcession',
    label: 'Hardy Concession (Inc/Out Damage)',
    stat: null,
    percentage: true,
    effectByRank: [0, -1, -3, -6, -10, -15],
    costByRank: [0, 1, 4, 10, 20, 34],
  },
  {
    key: 'futileStrikes',
    label: 'Futile Strikes (Crit Rate Reduction)',
    stat: Stat.CriticalHitRateReduction,
    percentage: true,
    effectByRank: [0, 3, 8, 15, 24, 24],
    costByRank: [0, 5, 15, 30, 45, 45],
  },
  {
    key: 'trivialBlows',
    label: 'Trivial Blows (Crit Damage Reduction)',
    stat: Stat.CriticalDamageTakenReduction,
    percentage: true,
    effectByRank: [0, 4, 12, 24, 40, 40],
    costByRank: [0, 5, 15, 30, 45, 45],
  },
  {
    key: 'expandedCapacity',
    label: 'Expanded Capacity',
    stat: null,
    percentage: false,
    effectByRank: [0, 10, 25, 50],
    costByRank: [0, 10, 25, 45],
    effectTextByRank: [
      'Not trained',
      '+10 maximum Action Points',
      '+25 maximum Action Points',
      '+50 maximum Action Points',
    ],
  },
];

// Match the order shown by the live in-game renown trainer. Entries that are
// present in older data sets but are not currently trainable stay out of the
// planner so players see the same list they see in game.
const IN_GAME_RENOWN_ORDER: RenownAbilityKey[] = [
  'acumen',
  'bladeMaster',
  'defender',
  'deftDefender',
  'expandedCapacity',
  'focusedPower',
  'fortitude',
  'futileStrikes',
  'hardyConcession',
  'impetus',
  'improvedFlee',
  'marksman',
  'might',
  'opportunist',
  'quickEscape',
  'reflexes',
  'spiritualRefinement',
  'trivialBlows',
  'vigor',
];

const renownAbilityByKey = new Map(
  ALL_RENOWN_ABILITIES.map((ability) => [ability.key, ability]),
);

export const RENOWN_ABILITIES: RenownAbilityDef[] = IN_GAME_RENOWN_ORDER.map(
  (key) => renownAbilityByKey.get(key),
).filter((ability): ability is RenownAbilityDef => ability !== undefined);

export type RenownSelections = Partial<Record<RenownAbilityKey, number>>;

/**
 * Total renown points spendable at a given character level / renown rank.
 * Mirrors the live server rule: capped to character level below level 40,
 * then capped to renown rank once the character reaches level 40. Renown
 * Rank itself can keep climbing past 80, but the game stops granting new
 * renown points once RR hits 80, so the point budget is capped there even
 * if the character's displayed renown rank is higher.
 */
export function getRenownPointCap(level: number, renownRank: number): number {
  const effectiveRenownRank = Math.min(renownRank, 80);
  return level < 40 ? level : effectiveRenownRank;
}

export function getRenownPointsSpent(selections: RenownSelections): number {
  let total = 0;
  for (const def of RENOWN_ABILITIES) {
    const rank = Math.max(0, Math.min(5, selections[def.key] ?? 0));
    total += def.costByRank[rank] ?? 0;
  }
  return total;
}

export interface RenownContribution {
  stat: Stat;
  value: number;
  percentage: boolean;
  label: string;
}

/**
 * Resolve current renown selections into stat contributions. Abilities with
 * no single Stat mapping (Deft Defender -> Evade + Disrupt, Hardy Concession
 * -> Incoming/Outgoing Damage%) expand into multiple contributions.
 */
export function computeRenownContributions(
  selections: RenownSelections,
): RenownContribution[] {
  const out: RenownContribution[] = [];
  for (const def of RENOWN_ABILITIES) {
    const rank = Math.max(0, Math.min(5, selections[def.key] ?? 0));
    const value = def.effectByRank[rank] ?? 0;
    if (!value) continue;
    if (def.key === 'opportunist') {
      out.push({
        stat: Stat.MeleeCritRate,
        value,
        percentage: true,
        label: def.label,
      });
      continue;
    }
    if (def.key === 'deftDefender') {
      out.push({ stat: Stat.Evade, value, percentage: true, label: def.label });
      out.push({
        stat: Stat.Disrupt,
        value,
        percentage: true,
        label: def.label,
      });
      continue;
    }
    if (def.key === 'hardyConcession') {
      out.push({
        stat: Stat.IncomingDamagePercent,
        value,
        percentage: true,
        label: def.label,
      });
      out.push({
        stat: Stat.OutgoingDamagePercent,
        value,
        percentage: true,
        label: def.label,
      });
      out.push({
        stat: Stat.OutgoingHealPercent,
        value,
        percentage: true,
        label: def.label,
      });
      continue;
    }
    if (def.stat) {
      out.push({
        stat: def.stat,
        value,
        percentage: def.percentage,
        label: def.label,
      });
    }
  }
  return out;
}

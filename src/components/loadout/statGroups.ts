import { Stat } from '__generated__/graphql';

export interface StatGroup {
  label: string;
  stats: Stat[];
}

// Groups the full Stat enum into character-sheet-style sections. This is our
// own bucketing (not sourced from any third-party planner's data or code) —
// it exists purely to organize the live stat readout in the center panel.
export const STAT_GROUPS: StatGroup[] = [
  {
    label: 'Primary Stats',
    stats: [
      Stat.Strength,
      Stat.BallisticSkill,
      Stat.Intelligence,
      Stat.Toughness,
      Stat.WeaponSkill,
      Stat.Initiative,
      Stat.Willpower,
      Stat.Wounds,
    ],
  },
  {
    label: 'Defense',
    stats: [
      Stat.Armor,
      Stat.SpiritResistance,
      Stat.CorporealResistance,
      Stat.ElementalResistance,
      Stat.Block,
      Stat.Parry,
      Stat.Evade,
      Stat.Disrupt,
      Stat.BlockStrikethrough,
      Stat.ParryStrikethrough,
      Stat.EvadeStrikethrough,
      Stat.DisruptStrikethrough,
      Stat.CriticalDamageTakenReduction,
      Stat.CriticalHitRateReduction,
      Stat.ArmorPenetrationReduction,
      Stat.DamageAbsorb,
      Stat.IncomingDamage,
      Stat.IncomingDamagePercent,
    ],
  },
  {
    label: 'Offense',
    stats: [
      Stat.ArmorPenetration,
      Stat.CriticalHitRate,
      Stat.CriticalDamage,
      Stat.OutgoingDamage,
      Stat.OutgoingDamagePercent,
    ],
  },
  {
    label: 'Melee',
    stats: [
      Stat.MeleePower,
      Stat.MeleeCritRate,
      Stat.AutoAttackDamage,
      Stat.AutoAttackSpeed,
      Stat.OffhandDamage,
      Stat.OffhandProcChance,
    ],
  },
  {
    label: 'Ranged',
    stats: [
      Stat.RangedPower,
      Stat.RangedCritRate,
      Stat.Range,
      Stat.MinimumRange,
    ],
  },
  {
    label: 'Magic',
    stats: [
      Stat.MagicPower,
      Stat.MagicCritRate,
      Stat.Mastery_1Bonus,
      Stat.Mastery_2Bonus,
      Stat.Mastery_3Bonus,
    ],
  },
  {
    label: 'Healing',
    stats: [
      Stat.HealingPower,
      Stat.HealCritRate,
      Stat.OutgoingHealPercent,
      Stat.IncomingHealPercent,
    ],
  },
];

const CATEGORIZED = new Set<Stat>(STAT_GROUPS.flatMap((g) => g.stats));

export const OTHER_STATS_LABEL = 'Other';

export const uncategorizedStats = (stats: Stat[]): Stat[] =>
  stats.filter((s) => !CATEGORIZED.has(s));

import { Stat } from '__generated__/graphql';

export interface PrimaryTotals {
  strength: number;
  ballisticSkill: number;
  intelligence: number;
  willpower: number;
  toughness: number;
  weaponSkill: number;
  initiative: number;
}

export interface PowerTotals {
  meleePower: number;
  rangedPower: number;
  magicPower: number;
  healingPower: number;
}

/**
 * Avoidance and mitigation percentages the game derives directly from a
 * character's primary stats (on top of anything gear/renown grants as flat
 * +Block%/+Parry%/etc lines, which are aggregated separately). These ratios
 * are how the game itself converts stat points into combat percentages —
 * factual game mechanics, not any particular tool's implementation.
 */
export function computeDerivedAvoidance(
  primary: PrimaryTotals,
): Partial<Record<Stat, number>> {
  return {
    [Stat.Parry]: (primary.initiative / 100) * 3,
    [Stat.Evade]: (primary.initiative / 100) * 3,
    [Stat.Disrupt]: (primary.willpower / 100) * 3,
    [Stat.Block]: primary.toughness / 200,
  };
}

/** Chance-to-be-critically-hit reduction granted purely by Initiative. */
export function computeCritReductionFromInitiative(initiative: number): number {
  return (initiative / 100) * 5;
}

/**
 * Armor Penetration % derived from Weapon Skill. Scales down at higher
 * character levels (the denominator grows with level), matching the live
 * server's own progression curve.
 */
export function computeArmorPenetrationFromWeaponSkill(
  weaponSkill: number,
  level: number,
): number {
  const bl = level > 0 ? level : 1;
  const denom = bl * 7.5 + 50;
  if (denom <= 0) return 0;
  return (weaponSkill / denom) * 25;
}

/** Strikethrough percentages (chance to ignore the opponent's Parry/Evade/Disrupt) from primary stats. */
export function computeStrikethrough(primary: PrimaryTotals): {
  parryStrikethrough: number;
  evadeStrikethrough: number;
  disruptStrikethrough: number;
} {
  return {
    parryStrikethrough: primary.strength / 100,
    evadeStrikethrough: primary.ballisticSkill / 100,
    disruptStrikethrough: primary.intelligence / 100,
  };
}

/** Block Strikethrough contributions from each offense type's primary stat, summed for a single display line. */
export function computeBlockStrikethrough(primary: PrimaryTotals): number {
  return (
    primary.strength / 200 +
    primary.ballisticSkill / 200 +
    primary.intelligence / 200
  );
}

const round1 = (value: number): number => Math.round(value * 10) / 10;

/**
 * Outgoing damage/healing bonus numbers shown on the character sheet:
 * (primary stat / 5) + (power stat / 5). Distinct from the raw Melee/Ranged/
 * Magic/Healing Power stat totals, which are also shown separately.
 */
export function computeDamageAndHealingBonuses(
  primary: PrimaryTotals,
  power: PowerTotals,
): {
  meleeDamageBonus: number;
  rangedDamageBonus: number;
  magicDamageBonus: number;
  healingBonus: number;
} {
  return {
    meleeDamageBonus: round1(primary.strength / 5 + power.meleePower / 5),
    rangedDamageBonus: round1(
      primary.ballisticSkill / 5 + power.rangedPower / 5,
    ),
    magicDamageBonus: round1(primary.intelligence / 5 + power.magicPower / 5),
    healingBonus: round1(primary.willpower / 5 + power.healingPower / 5),
  };
}

/** Shields convert their armor rating into extra Block% at a fixed ratio. */
export function computeShieldBlockFromArmor(shieldArmor: number): number {
  return (shieldArmor / 100) * 3;
}

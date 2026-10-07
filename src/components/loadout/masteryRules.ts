/**
 * Mastery point budget: characters earn mastery points as they level past
 * 10, plus bonus points at renown-rank milestones 40/50/60/70, plus a
 * further +2 for actually wearing a full Sovereign set. Cross-checked
 * against dalen's RoRBuilder (github.com/dalen/RoRBuilder,
 * src/helpers/points.ts): its renown dropdown only offers a single "Sov +2"
 * option at the RR80 bracket that grants +6 total, bundling the renown-rank
 * bonus (which caps at +4 once RR hits 70) together with the separate +2
 * Sovereign set bonus. We split those two into their own inputs instead of
 * bundling them, since a character can be RR80 without full Sovereign gear.
 */
export function calculateMasteryPoints(
  level: number,
  renownRank: number,
  hasSovereign: boolean,
): number {
  if (level <= 10) return 0;
  let base: number;
  if (level > 20) base = level - 15;
  else if (level > 18) base = 5;
  else if (level > 16) base = 4;
  else if (level > 14) base = 3;
  else if (level > 12) base = 2;
  else base = 1;

  let renownBonus = 0;
  if (renownRank >= 70) renownBonus = 4;
  else if (renownRank >= 60) renownBonus = 3;
  else if (renownRank >= 50) renownBonus = 2;
  else if (renownRank >= 40) renownBonus = 1;

  return base + renownBonus + (hasSovereign ? 2 : 0);
}

/** One tactic slot per 8 character levels, capped at 4. */
export function calculateTacticLimit(level: number): number {
  return Math.min(Math.floor(level / 8), 4);
}

/** Maximum points that can be invested in a single mastery path. */
export const MASTERY_PATH_MAX = 15;

import { Career, ItemType } from '__generated__/graphql';

/**
 * What a career is allowed to put in its off-hand slot. This mirrors each
 * career's real in-game kit design (tank careers get a shield, dual-wield
 * careers get a second weapon, hybrid casters get a charm/talisman-like
 * off-hand implement, and pure casters/ranged careers get nothing at all).
 * This is WAR class-design knowledge, independently encoded here (not
 * derived from or copied from any third party's code).
 */
export enum OffHandPolicy {
  NONE = 'NONE',
  SHIELD = 'SHIELD',
  PISTOL = 'PISTOL',
  CHARM = 'CHARM',
  WEAPON = 'WEAPON',
}

const SHIELD_TYPES = new Set<ItemType>([
  ItemType.Shield,
  ItemType.BasicShield,
  ItemType.ExpertShield,
]);
const MELEE_WEAPON_TYPES = new Set<ItemType>([
  ItemType.Sword,
  ItemType.Axe,
  ItemType.Hammer,
  ItemType.Dagger,
  ItemType.Spear,
  ItemType.Lance,
]);

export const OFF_HAND_POLICY: Record<Career, OffHandPolicy> = {
  // Order
  [Career.IronBreaker]: OffHandPolicy.SHIELD,
  [Career.Slayer]: OffHandPolicy.WEAPON,
  [Career.RunePriest]: OffHandPolicy.NONE,
  [Career.Engineer]: OffHandPolicy.NONE,
  [Career.WitchHunter]: OffHandPolicy.PISTOL,
  [Career.KnightOfTheBlazingSun]: OffHandPolicy.SHIELD,
  [Career.BrightWizard]: OffHandPolicy.NONE,
  [Career.WarriorPriest]: OffHandPolicy.CHARM,
  [Career.SwordMaster]: OffHandPolicy.SHIELD,
  [Career.ShadowWarrior]: OffHandPolicy.NONE,
  [Career.WhiteLion]: OffHandPolicy.NONE,
  [Career.Archmage]: OffHandPolicy.NONE,
  // Destruction
  [Career.BlackOrc]: OffHandPolicy.SHIELD,
  [Career.Choppa]: OffHandPolicy.WEAPON,
  [Career.Shaman]: OffHandPolicy.NONE,
  [Career.SquigHerder]: OffHandPolicy.NONE,
  [Career.Chosen]: OffHandPolicy.SHIELD,
  [Career.Marauder]: OffHandPolicy.WEAPON,
  [Career.Zealot]: OffHandPolicy.CHARM,
  [Career.Magus]: OffHandPolicy.NONE,
  [Career.BlackGuard]: OffHandPolicy.SHIELD,
  [Career.WitchElf]: OffHandPolicy.WEAPON,
  [Career.DiscipleOfKhaine]: OffHandPolicy.CHARM,
  [Career.Sorcerer]: OffHandPolicy.NONE,
};

/** Careers whose main-hand slot must be a two-handed staff. */
export const STAFF_MAIN_HAND_CAREERS = new Set<Career>([
  Career.BrightWizard,
  Career.RunePriest,
  Career.Shaman,
  Career.Magus,
  Career.Archmage,
  Career.Sorcerer,
]);

/** GraphQL `type: { in: [...] }` clause matching what a career's off-hand
 * policy allows, or null if the career can't equip anything off-hand. */
export const offHandItemTypesFor = (career: Career): ItemType[] | null => {
  switch (OFF_HAND_POLICY[career]) {
    case OffHandPolicy.SHIELD:
      return Array.from(SHIELD_TYPES);
    case OffHandPolicy.PISTOL:
      return [ItemType.Pistol];
    case OffHandPolicy.CHARM:
      return [ItemType.Charm];
    case OffHandPolicy.WEAPON:
      return [...MELEE_WEAPON_TYPES];
    case OffHandPolicy.NONE:
    default:
      return null;
  }
};

export const offHandPolicyLabel = (career: Career): string => {
  switch (OFF_HAND_POLICY[career]) {
    case OffHandPolicy.SHIELD:
      return 'shields';
    case OffHandPolicy.PISTOL:
      return 'pistols';
    case OffHandPolicy.CHARM:
      return 'charms';
    case OffHandPolicy.WEAPON:
      return 'melee weapons';
    case OffHandPolicy.NONE:
    default:
      return 'nothing';
  }
};

/**
 * Two-handed melee weapon detection.
 *
 * The item data has no explicit "two-handed" flag, and DPS alone is not a
 * reliable signal (a high-rarity one-handed weapon can out-DPS a
 * lower-rarity two-handed one at the same level - verified against live
 * item data). Weapon speed is: two-handed melee weapons are attack-speed
 * gated slower than one-handed ones as a core game-balance rule. Verified
 * against live data: at level 40, every EITHER_HAND (guaranteed
 * one-handed) melee weapon has speed <= 320 (3.2s), while every
 * confirmably two-handed weapon (by name: Greatsword/Claymore/Greataxe/
 * Sledge, etc.) has speed >= 340 (3.4s). Staves are always two-handed.
 *
 * This is a best-effort classifier, not a perfect one: a small number of
 * low-level or vanity/quest-reward items have non-standard speed values
 * that fall outside the normal pattern. It intentionally defaults to
 * "one-handed" when ambiguous, since incorrectly blocking a valid
 * off-hand pick is worse UX than occasionally missing a rare 2H item.
 */
const TWO_HANDED_SPEED_THRESHOLD = 340;

export function isTwoHandedMainHandWeapon(
  item:
    | {
        slot?: string;
        type?: string;
        speed?: number;
      }
    | null
    | undefined,
): boolean {
  if (!item) return false;
  if (item.slot !== 'MAIN_HAND') return false;
  if (item.type === ItemType.Staff) return true;
  const meleeTypes: string[] = [
    ItemType.Sword,
    ItemType.Axe,
    ItemType.Hammer,
    ItemType.Dagger,
    ItemType.Spear,
    ItemType.Lance,
  ];
  if (!item.type || !meleeTypes.includes(item.type)) return false;
  return (item.speed ?? 0) >= TWO_HANDED_SPEED_THRESHOLD;
}

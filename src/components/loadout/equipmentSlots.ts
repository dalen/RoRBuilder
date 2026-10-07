import { EquipSlot } from '__generated__/graphql';

export interface SlotDef {
  slot: EquipSlot;
  label: string;
  icon: string;
  /** Real game icon (from Dalen's item API) shown, faded, when the slot is empty. */
  placeholderIconUrl: string;
  group: 'weapon' | 'armor' | 'accessory';
  /** Which column of the paper-doll this slot renders in. */
  column: 'left' | 'right' | 'bottom';
}

const armoryIcon = (itemId: number): string =>
  `https://armory.returnofreckoning.com/item/${itemId}`;

// Layout for the character-sheet paper-doll, matching the in-game character
// sheet's slot arrangement: armor pieces down the left, jewellery/trophies
// down the right, weapons/pockets/standard along the bottom.
export const SLOT_LAYOUT: SlotDef[] = [
  {
    slot: EquipSlot.Event,
    label: 'Event',
    icon: 'fa-star',
    placeholderIconUrl: armoryIcon(457),
    group: 'accessory',
    column: 'left',
  },
  {
    slot: EquipSlot.Helm,
    label: 'Helm',
    icon: 'fa-hat-wizard',
    placeholderIconUrl: armoryIcon(3120),
    group: 'armor',
    column: 'left',
  },
  {
    slot: EquipSlot.Shoulder,
    label: 'Shoulder',
    icon: 'fa-shirt',
    placeholderIconUrl: armoryIcon(5359),
    group: 'armor',
    column: 'left',
  },
  {
    slot: EquipSlot.Back,
    label: 'Back',
    icon: 'fa-scroll',
    placeholderIconUrl: armoryIcon(5360),
    group: 'armor',
    column: 'left',
  },
  {
    slot: EquipSlot.Body,
    label: 'Body',
    icon: 'fa-vest',
    placeholderIconUrl: armoryIcon(5361),
    group: 'armor',
    column: 'left',
  },
  {
    slot: EquipSlot.Gloves,
    label: 'Gloves',
    icon: 'fa-mitten',
    placeholderIconUrl: armoryIcon(5363),
    group: 'armor',
    column: 'left',
  },
  {
    slot: EquipSlot.Belt,
    label: 'Belt',
    icon: 'fa-ring',
    placeholderIconUrl: armoryIcon(3121),
    group: 'armor',
    column: 'left',
  },
  {
    slot: EquipSlot.Boots,
    label: 'Boots',
    icon: 'fa-shoe-prints',
    placeholderIconUrl: armoryIcon(1965),
    group: 'armor',
    column: 'left',
  },

  {
    slot: EquipSlot.Jewellery1,
    label: 'Jewellery',
    icon: 'fa-gem',
    placeholderIconUrl: armoryIcon(471),
    group: 'accessory',
    column: 'right',
  },
  {
    slot: EquipSlot.Jewellery2,
    label: 'Jewellery',
    icon: 'fa-gem',
    placeholderIconUrl: armoryIcon(471),
    group: 'accessory',
    column: 'right',
  },
  {
    slot: EquipSlot.Jewellery3,
    label: 'Jewellery',
    icon: 'fa-gem',
    placeholderIconUrl: armoryIcon(471),
    group: 'accessory',
    column: 'right',
  },
  {
    slot: EquipSlot.Jewellery4,
    label: 'Jewellery',
    icon: 'fa-gem',
    placeholderIconUrl: armoryIcon(471),
    group: 'accessory',
    column: 'right',
  },
  {
    slot: EquipSlot.Trophy1,
    label: 'Trophy',
    icon: 'fa-trophy',
    placeholderIconUrl: armoryIcon(4354),
    group: 'accessory',
    column: 'right',
  },
  {
    slot: EquipSlot.Trophy2,
    label: 'Trophy',
    icon: 'fa-trophy',
    placeholderIconUrl: armoryIcon(4354),
    group: 'accessory',
    column: 'right',
  },
  {
    slot: EquipSlot.Trophy3,
    label: 'Trophy',
    icon: 'fa-trophy',
    placeholderIconUrl: armoryIcon(4354),
    group: 'accessory',
    column: 'right',
  },
  {
    slot: EquipSlot.Trophy4,
    label: 'Trophy',
    icon: 'fa-trophy',
    placeholderIconUrl: armoryIcon(4354),
    group: 'accessory',
    column: 'right',
  },

  {
    slot: EquipSlot.Pocket1,
    label: 'Pocket',
    icon: 'fa-flask',
    placeholderIconUrl: armoryIcon(4695),
    group: 'accessory',
    column: 'bottom',
  },
  {
    slot: EquipSlot.Pocket2,
    label: 'Pocket',
    icon: 'fa-flask',
    placeholderIconUrl: armoryIcon(3881),
    group: 'accessory',
    column: 'bottom',
  },
  {
    slot: EquipSlot.MainHand,
    label: 'Main Hand',
    icon: 'fa-hand-fist',
    placeholderIconUrl: armoryIcon(7490),
    group: 'weapon',
    column: 'bottom',
  },
  {
    slot: EquipSlot.Standard,
    label: 'Standard',
    icon: 'fa-flag',
    placeholderIconUrl: armoryIcon(6191),
    group: 'weapon',
    column: 'bottom',
  },
  {
    slot: EquipSlot.OffHand,
    label: 'Off Hand',
    icon: 'fa-shield',
    placeholderIconUrl: armoryIcon(1483),
    group: 'weapon',
    column: 'bottom',
  },
  {
    slot: EquipSlot.RangedWeapon,
    label: 'Ranged',
    icon: 'fa-crosshairs',
    placeholderIconUrl: armoryIcon(1075),
    group: 'weapon',
    column: 'bottom',
  },
];

export const SLOT_LABEL: Record<EquipSlot, string> = SLOT_LAYOUT.reduce(
  (acc, s) => ({ ...acc, [s.slot]: s.label }),
  {} as Record<EquipSlot, string>,
);

const GENERIC_JEWELLERY_SLOTS = [EquipSlot.Jewellery1, EquipSlot.Jewellery2];

/**
 * The item catalogue uses Jewellery 1 and Jewellery 2 for ordinary jewellery,
 * but those items are interchangeable across all four jewellery positions in
 * game. Jewellery 3 and Jewellery 4 entries are explicit restrictions and are
 * therefore only eligible for their matching position.
 */
export const eligibleItemSlotsFor = (slot: EquipSlot): EquipSlot[] => {
  if (slot === EquipSlot.Jewellery1 || slot === EquipSlot.Jewellery2) {
    return GENERIC_JEWELLERY_SLOTS;
  }
  if (slot === EquipSlot.Jewellery3 || slot === EquipSlot.Jewellery4) {
    return [...GENERIC_JEWELLERY_SLOTS, slot];
  }
  return [slot];
};

/** Short, human-readable codes used for the shareable build URL. Distinct from any
 * third-party planner's abbreviation scheme by design. */
export const SLOT_URL_CODE: Record<EquipSlot, string> = {
  [EquipSlot.MainHand]: 'mainhand',
  [EquipSlot.OffHand]: 'offhand',
  [EquipSlot.RangedWeapon]: 'ranged',
  [EquipSlot.Helm]: 'helm',
  [EquipSlot.Shoulder]: 'shoulder',
  [EquipSlot.Back]: 'back',
  [EquipSlot.Body]: 'body',
  [EquipSlot.Gloves]: 'gloves',
  [EquipSlot.Belt]: 'belt',
  [EquipSlot.Boots]: 'boots',
  [EquipSlot.Jewellery1]: 'jewel1',
  [EquipSlot.Jewellery2]: 'jewel2',
  [EquipSlot.Jewellery3]: 'jewel3',
  [EquipSlot.Jewellery4]: 'jewel4',
  [EquipSlot.Pocket1]: 'pocket1',
  [EquipSlot.Pocket2]: 'pocket2',
  [EquipSlot.Trophy1]: 'trophy1',
  [EquipSlot.Trophy2]: 'trophy2',
  [EquipSlot.Trophy3]: 'trophy3',
  [EquipSlot.Trophy4]: 'trophy4',
  [EquipSlot.Trophy5]: 'trophy5',
  [EquipSlot.Event]: 'event',
  [EquipSlot.Standard]: 'standard',
  [EquipSlot.EitherHand]: 'eitherhand',
  [EquipSlot.None]: 'none',
};

export const URL_CODE_TO_SLOT: Record<string, EquipSlot> = Object.entries(
  SLOT_URL_CODE,
).reduce(
  (acc, [slot, code]) => ({ ...acc, [code]: slot as EquipSlot }),
  {} as Record<string, EquipSlot>,
);

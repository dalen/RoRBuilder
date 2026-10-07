import { ItemRarity } from '__generated__/graphql';

export const rarityColor = (rarity: ItemRarity): string => {
  switch (rarity) {
    case ItemRarity.Mythic: {
      return '#ff8a3d';
    }
    case ItemRarity.VeryRare: {
      return '#d4a83c';
    }
    case ItemRarity.Rare: {
      return '#6f91ff';
    }
    case ItemRarity.Utility: {
      return '#4fd18b';
    }
    case ItemRarity.Uncommon: {
      return '#93a0bf';
    }
    case ItemRarity.Common:
    default: {
      return '#b7c0d6';
    }
  }
};

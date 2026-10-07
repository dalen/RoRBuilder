import { Stat } from '__generated__/graphql';

export interface StatLine {
  stat: Stat;
  value: number;
  percentage: boolean;
}

export interface SetBonusValue {
  __typename?: string;
  value?: number;
  stat?: Stat;
  percentage?: boolean;
  name?: string;
}

export interface LoadoutItem {
  id: string;
  name: string;
  iconUrl: string;
  rarity?: string;
  stats: StatLine[];
  itemSet?: {
    id: string;
    name: string;
    bonuses: {
      itemsRequired: number;
      bonus: SetBonusValue;
    }[];
  } | null;
  /** Number of talisman sockets this item has (0 if none). */
  talismanSlots?: number;
  /** Talismans currently socketed into this item, indexed by socket. */
  talismans?: (LoadoutItem | null)[];
  uniqueEquipped?: boolean;
  /** Raw EquipSlot string (e.g. 'MAIN_HAND', 'EITHER_HAND') and item type,
   * used for two-handed weapon detection. */
  slot?: string;
  type?: string;
  speed?: number;
}

export interface AggregatedStatLine {
  stat: Stat;
  flat: number;
  percent: number;
}

export interface SetProgress {
  setId: string;
  setName: string;
  equippedCount: number;
  activeBonuses: { itemsRequired: number; description: string }[];
  nextBonus: { itemsRequired: number; description: string } | null;
}

const describeBonus = (bonus: SetBonusValue): string => {
  if (bonus.stat != null) {
    const sign = (bonus.value ?? 0) > 0 ? '+' : '';
    return `${sign}${bonus.value}${bonus.percentage ? '%' : ''} ${bonus.stat}`;
  }
  return bonus.name ?? 'Ability granted';
};

/**
 * Sums item stats across all equipped items and evaluates item-set bonuses
 * for sets where enough pieces are equipped. Pure function: no network or
 * React dependency, so it's trivially unit-testable.
 */
export const aggregateLoadoutStats = (
  items: LoadoutItem[],
): { stats: AggregatedStatLine[]; sets: SetProgress[] } => {
  const totals = new Map<Stat, AggregatedStatLine>();

  const addStat = (stat: Stat, value: number, percentage: boolean): void => {
    const existing = totals.get(stat) ?? { stat, flat: 0, percent: 0 };
    if (percentage) {
      existing.percent += value;
    } else {
      existing.flat += value;
    }
    totals.set(stat, existing);
  };

  for (const item of items) {
    for (const line of item.stats) {
      addStat(line.stat, line.value, line.percentage);
    }
    for (const talisman of item.talismans ?? []) {
      if (!talisman) continue;
      for (const line of talisman.stats) {
        addStat(line.stat, line.value, line.percentage);
      }
    }
  }

  const setCounts = new Map<
    string,
    {
      name: string;
      count: number;
      bonuses: LoadoutItem['itemSet'] extends infer S
        ? S extends { bonuses: infer B }
          ? B
          : never
        : never;
    }
  >();
  for (const item of items) {
    if (!item.itemSet) continue;
    const existing = setCounts.get(item.itemSet.id);
    if (existing) {
      existing.count += 1;
    } else {
      setCounts.set(item.itemSet.id, {
        name: item.itemSet.name,
        count: 1,
        bonuses: item.itemSet.bonuses,
      });
    }
  }

  const sets: SetProgress[] = [];
  for (const [setId, entry] of Array.from(setCounts.entries())) {
    const sortedBonuses = [...entry.bonuses].sort(
      (a, b) => a.itemsRequired - b.itemsRequired,
    );
    const activeBonuses = sortedBonuses
      .filter((b) => b.itemsRequired <= entry.count)
      .map((b) => ({
        itemsRequired: b.itemsRequired,
        description: describeBonus(b.bonus),
      }));
    const next = sortedBonuses.find((b) => b.itemsRequired > entry.count);

    for (const b of sortedBonuses) {
      if (b.itemsRequired > entry.count) continue;
      const val = b.bonus;
      if (val.stat != null && val.value != null) {
        addStat(val.stat, val.value, val.percentage ?? false);
      }
    }

    sets.push({
      setId,
      setName: entry.name,
      equippedCount: entry.count,
      activeBonuses,
      nextBonus: next
        ? {
            itemsRequired: next.itemsRequired,
            description: describeBonus(next.bonus),
          }
        : null,
    });
  }

  return {
    stats: Array.from(totals.values()).sort((a, b) =>
      a.stat.localeCompare(b.stat),
    ),
    sets: sets.sort((a, b) => b.equippedCount - a.equippedCount),
  };
};

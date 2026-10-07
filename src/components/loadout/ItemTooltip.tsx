import type { ReactElement } from 'react';
import { enumLabel } from 'components/loadout/careerMeta';
import { rarityColor } from 'components/loadout/rarity';
import type { SetBonusValue, StatLine } from 'components/loadout/loadoutStats';

interface TooltipItem {
  name: string;
  rarity?: string;
  itemLevel?: number;
  levelRequirement?: number;
  renownRankRequirement?: number;
  armor?: number;
  dps?: number;
  speed?: number;
  talismanSlots?: number;
  uniqueEquipped?: boolean;
  stats: StatLine[];
  itemSet?: {
    name: string;
    bonuses?: { itemsRequired: number; bonus: SetBonusValue }[];
  } | null;
}

const formatStat = (line: StatLine): string => {
  const sign = line.value > 0 ? '+' : '';
  return `${sign}${line.value}${line.percentage ? '%' : ''} ${enumLabel(
    line.stat,
  )}`;
};

const describeBonus = (bonus: SetBonusValue): string => {
  if (bonus.stat != null) {
    const sign = (bonus.value ?? 0) > 0 ? '+' : '';
    return `${sign}${bonus.value}${bonus.percentage ? '%' : ''} ${enumLabel(
      bonus.stat,
    )}`;
  }
  return bonus.name ?? 'Ability granted';
};

/**
 * Hover-preview item card, styled after the game's own character-sheet
 * tooltip: rarity-colored name, a divider, requirement lines, stats, and
 * (for set pieces) the full set bonus ladder.
 */
export const ItemTooltip = ({ item }: { item: TooltipItem }): ReactElement => {
  const color = rarityColor(item.rarity as any);
  const sortedBonuses = [...(item.itemSet?.bonuses ?? [])].sort(
    (a, b) => a.itemsRequired - b.itemsRequired,
  );

  return (
    <div className="loadout-item-tooltip" style={{ borderColor: color }}>
      <p className="loadout-item-tooltip-name" style={{ color }}>
        {item.name}
      </p>
      {item.uniqueEquipped && (
        <p className="loadout-item-tooltip-unique">Unique-Equipped</p>
      )}

      <div
        className="loadout-item-tooltip-divider"
        style={{ borderColor: color }}
      />

      {(!!item.armor || !!item.dps) && (
        <div className="loadout-item-tooltip-row">
          {!!item.armor && <span>Armor: {item.armor}</span>}
          {!!item.dps && <span>Damage Per Second: {item.dps}</span>}
          {!!item.speed && <span>Speed: {(item.speed / 100).toFixed(1)}s</span>}
        </div>
      )}

      {item.stats.length > 0 && (
        <ul className="loadout-item-tooltip-stats">
          {item.stats.map((line, i) => (
            <li key={i}>{formatStat(line)}</li>
          ))}
        </ul>
      )}

      {!!item.talismanSlots && (
        <p className="loadout-item-tooltip-meta">
          Talisman Slots: {item.talismanSlots}
        </p>
      )}

      <div
        className="loadout-item-tooltip-divider"
        style={{ borderColor: color }}
      />

      <p className="loadout-item-tooltip-meta">
        Item Level: {item.itemLevel ?? 0}
      </p>
      {!!item.levelRequirement && (
        <p className="loadout-item-tooltip-meta">
          Level Required: {item.levelRequirement}
        </p>
      )}
      {!!item.renownRankRequirement && (
        <p className="loadout-item-tooltip-meta">
          Renown Rank Required: {item.renownRankRequirement}
        </p>
      )}

      {item.itemSet && (
        <>
          <div
            className="loadout-item-tooltip-divider"
            style={{ borderColor: color }}
          />
          <p className="loadout-item-tooltip-set-name">{item.itemSet.name}</p>
          {sortedBonuses.map((b) => (
            <p key={b.itemsRequired} className="loadout-item-tooltip-set-bonus">
              ({b.itemsRequired}) {describeBonus(b.bonus)}
            </p>
          ))}
        </>
      )}
    </div>
  );
};

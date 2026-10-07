import { type ReactElement, useMemo, useState } from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { ErrorMessage } from 'components/global/ErrorMessage';
import { rarityColor } from 'components/loadout/rarity';
import { ItemTooltip } from 'components/loadout/ItemTooltip';
import type { LoadoutItem } from 'components/loadout/loadoutStats';

const TALISMANS_QUERY = gql`
  query Talismans($where: ItemFilterInput, $first: Int) {
    items(where: $where, first: $first, order: [{ name: ASC }]) {
      totalCount
      nodes {
        id
        name
        iconUrl
        rarity
        itemLevel
        levelRequirement
        renownRankRequirement
        uniqueEquipped
        stats {
          stat
          value
          percentage
        }
      }
    }
  }
`;

interface TalismanNode extends LoadoutItem {
  rarity: string;
  itemLevel: number;
  levelRequirement: number;
  renownRankRequirement: number;
  uniqueEquipped: boolean;
}

export const TalismanPicker = ({
  level,
  renownRank,
  currentTalisman,
  equippedElsewhere,
  onSelect,
  onRemove,
  onClose,
}: {
  level: number;
  renownRank: number;
  currentTalisman?: LoadoutItem | null;
  equippedElsewhere?: LoadoutItem[];
  onSelect: (item: LoadoutItem) => void;
  onRemove?: () => void;
  onClose: () => void;
}): ReactElement => {
  const [nameFilter, setNameFilter] = useState('');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const where = useMemo(() => {
    const clauses: Record<string, unknown> = {
      type: { eq: 'ENHANCEMENT' },
      levelRequirement: { lte: level },
      renownRankRequirement: { lte: renownRank },
    };
    if (nameFilter) clauses.name = { contains: nameFilter };
    return clauses;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level, renownRank, nameFilter]);

  const { data, loading, error } = useQuery(TALISMANS_QUERY, {
    variables: { where, first: 50 },
  } as any) as any;

  const equippedUniqueIds = useMemo(
    () =>
      new Set(
        (equippedElsewhere ?? [])
          .filter((i: any) => i.uniqueEquipped)
          .map((i) => i.id),
      ),
    [equippedElsewhere],
  );

  const allItems: TalismanNode[] = (data as any)?.items?.nodes ?? [];
  const items = allItems.filter(
    (item) => !(item.uniqueEquipped && equippedUniqueIds.has(item.id)),
  );
  const totalCount: number = (data as any)?.items?.totalCount ?? 0;

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose} />
      <div className="modal-card" style={{ width: '560px', maxWidth: '92vw' }}>
        <header className="modal-card-head">
          <p className="modal-card-title">Choose Talisman</p>
          <button
            type="button"
            className="delete"
            aria-label="close"
            onClick={onClose}
          />
        </header>
        <section className="modal-card-body">
          {currentTalisman && onRemove && (
            <div className="loadout-picker-current">
              <img
                src={currentTalisman.iconUrl}
                alt=""
                className="loadout-picker-icon"
              />
              <div className="loadout-picker-info">
                <span
                  style={{ color: rarityColor(currentTalisman.rarity as any) }}
                >
                  {currentTalisman.name}
                </span>
                <span className="has-text-grey is-size-7">
                  Currently socketed
                </span>
              </div>
              <button
                type="button"
                className="button is-small is-danger is-outlined"
                onClick={() => {
                  onRemove();
                  onClose();
                }}
              >
                <span className="icon is-small">
                  <i className="fas fa-xmark" />
                </span>
                <span>Remove</span>
              </button>
            </div>
          )}
          <input
            className="input mb-3"
            type="text"
            placeholder="Filter by name..."
            value={nameFilter}
            onChange={(event) => setNameFilter(event.target.value)}
          />
          {error && (
            <ErrorMessage
              message={error.message}
              name="Talisman picker query"
            />
          )}
          {loading && <p className="has-text-grey">Loading...</p>}
          {!loading && items.length === 0 && (
            <p className="has-text-grey">
              No talismans usable at renown rank req &le; {renownRank}.
            </p>
          )}
          <div className="loadout-picker-list">
            {items.map((item) => (
              <button
                type="button"
                key={item.id}
                className="loadout-picker-row"
                style={{ position: 'relative' }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() =>
                  setHoveredId((current) =>
                    current === item.id ? null : current,
                  )
                }
                onClick={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <img
                  src={item.iconUrl}
                  alt=""
                  className="loadout-picker-icon"
                />
                <div className="loadout-picker-info">
                  <span style={{ color: rarityColor(item.rarity as any) }}>
                    {item.name}
                  </span>
                  <span className="has-text-grey is-size-7">
                    iLvl {item.itemLevel} &middot; Req {item.levelRequirement}
                    {item.renownRankRequirement
                      ? ` / RR ${item.renownRankRequirement}`
                      : ''}
                    {item.uniqueEquipped ? ' · Unique' : ''}
                  </span>
                </div>
                {hoveredId === item.id && <ItemTooltip item={item} />}
              </button>
            ))}
          </div>
          {totalCount > allItems.length && (
            <p className="has-text-grey is-size-7 mt-2">
              Showing {allItems.length} of {totalCount}. Narrow with the name
              filter to see more specific results.
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

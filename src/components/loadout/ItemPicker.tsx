import { type ReactElement, useMemo, useState } from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { Career, EquipSlot } from '__generated__/graphql';
import { ErrorMessage } from 'components/global/ErrorMessage';
import { rarityColor } from 'components/loadout/rarity';
import { ItemTooltip } from 'components/loadout/ItemTooltip';
import { TalismanPicker } from 'components/loadout/TalismanPicker';
import type { LoadoutItem } from 'components/loadout/loadoutStats';
import {
  eligibleItemSlotsFor,
  SLOT_LABEL,
} from 'components/loadout/equipmentSlots';
import {
  isTwoHandedMainHandWeapon,
  offHandItemTypesFor,
  offHandPolicyLabel,
  STAFF_MAIN_HAND_CAREERS,
} from 'components/loadout/careerEquipRules';

const SLOT_ITEMS_QUERY = gql`
  query SlotItems(
    $where: ItemFilterInput
    $usableByCareer: Career
    $first: Int
  ) {
    items(
      where: $where
      usableByCareer: $usableByCareer
      first: $first
      order: [{ name: ASC }]
    ) {
      totalCount
      nodes {
        id
        name
        iconUrl
        rarity
        itemLevel
        levelRequirement
        renownRankRequirement
        armor
        dps
        speed
        talismanSlots
        uniqueEquipped
        type
        slot
        stats {
          stat
          value
          percentage
        }
        itemSet {
          id
          name
          bonuses {
            itemsRequired
            bonus {
              __typename
              ... on ItemStat {
                stat
                value
                percentage
              }
            }
          }
        }
      }
    }
  }
`;

interface PickerItem extends LoadoutItem {
  rarity: string;
  itemLevel: number;
  levelRequirement: number;
  renownRankRequirement: number;
  armor: number;
  dps: number;
  speed: number;
  talismanSlots: number;
  uniqueEquipped: boolean;
  type: string;
  slot: string;
}

export const ItemPicker = ({
  slot,
  career,
  level,
  renownRank,
  currentItem,
  equippedElsewhere,
  allSocketedTalismans,
  mainHandItem,
  onSelect,
  onRemove,
  onSetTalisman,
  onRemoveTalisman,
  onClose,
}: {
  slot: EquipSlot;
  career: Career;
  level: number;
  renownRank: number;
  currentItem?: LoadoutItem | null;
  /** Items equipped in every *other* slot, used to block re-equipping a
   * unique-equipped item that's already in the loadout elsewhere. */
  equippedElsewhere?: LoadoutItem[];
  /** Every talisman currently socketed anywhere in the loadout, used to
   * block re-socketing a unique-equipped talisman. */
  allSocketedTalismans?: LoadoutItem[];
  /** The item currently equipped in Main Hand, used to block Off Hand when
   * a two-handed weapon is equipped. */
  mainHandItem?: LoadoutItem | null;
  onSelect: (item: LoadoutItem) => void;
  onRemove?: () => void;
  onSetTalisman?: (index: number, item: LoadoutItem) => void;
  onRemoveTalisman?: (index: number) => void;
  onClose: () => void;
}): ReactElement => {
  const [nameFilter, setNameFilter] = useState('');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeTalismanSocket, setActiveTalismanSocket] = useState<
    number | null
  >(null);

  // Off-hand is career-gated: some careers can't equip anything there at
  // all, others are restricted to a specific item type (shield/pistol/charm/
  // weapon). Main-hand is career-gated for the staff-only caster careers.
  const offHandTypes =
    slot === EquipSlot.OffHand ? offHandItemTypesFor(career) : undefined;
  const blockedByPolicy = slot === EquipSlot.OffHand && offHandTypes === null;
  const blockedByTwoHander =
    slot === EquipSlot.OffHand && isTwoHandedMainHandWeapon(mainHandItem);
  const blockedOffHand = blockedByPolicy || blockedByTwoHander;
  const staffOnlyMainHand =
    slot === EquipSlot.MainHand && STAFF_MAIN_HAND_CAREERS.has(career);

  const where = useMemo(() => {
    const clauses: Record<string, unknown> = {
      slot: { in: eligibleItemSlotsFor(slot) },
      levelRequirement: { lte: level },
      renownRankRequirement: { lte: renownRank },
    };
    if (nameFilter) clauses.name = { contains: nameFilter };
    if (offHandTypes) clauses.type = { in: offHandTypes };
    if (staffOnlyMainHand) clauses.type = { eq: 'STAFF' };
    return clauses;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slot, level, renownRank, nameFilter, career]);

  const { data, loading, error } = useQuery(SLOT_ITEMS_QUERY, {
    variables: { where, usableByCareer: career, first: 50 },
    skip: blockedOffHand,
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

  const allItems: PickerItem[] = (data as any)?.items?.nodes ?? [];
  const items = allItems.filter(
    (item) => !(item.uniqueEquipped && equippedUniqueIds.has(item.id)),
  );
  const totalCount: number = (data as any)?.items?.totalCount ?? 0;

  const talismanSlotCount = currentItem?.talismanSlots ?? 0;
  const talismans = currentItem?.talismans ?? [];

  if (activeTalismanSocket != null && onSetTalisman) {
    return (
      <TalismanPicker
        level={level}
        renownRank={renownRank}
        currentTalisman={talismans[activeTalismanSocket] ?? null}
        equippedElsewhere={allSocketedTalismans}
        onSelect={(item) => {
          onSetTalisman(activeTalismanSocket, item);
          setActiveTalismanSocket(null);
        }}
        onRemove={
          onRemoveTalisman
            ? () => {
                onRemoveTalisman(activeTalismanSocket);
                setActiveTalismanSocket(null);
              }
            : undefined
        }
        onClose={() => setActiveTalismanSocket(null)}
      />
    );
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose} />
      <div className="modal-card" style={{ width: '640px', maxWidth: '92vw' }}>
        <header className="modal-card-head">
          <p className="modal-card-title">Choose {SLOT_LABEL[slot]}</p>
          <button
            type="button"
            className="delete"
            aria-label="close"
            onClick={onClose}
          />
        </header>
        <section className="modal-card-body">
          {currentItem && onRemove && (
            <div className="loadout-picker-current">
              <img
                src={currentItem.iconUrl}
                alt=""
                className="loadout-picker-icon"
              />
              <div className="loadout-picker-info">
                <span style={{ color: rarityColor(currentItem.rarity as any) }}>
                  {currentItem.name}
                </span>
                <span className="has-text-grey is-size-7">
                  Currently equipped
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
          {currentItem && talismanSlotCount > 0 && onSetTalisman && (
            <div className="loadout-talisman-sockets">
              {Array.from({ length: talismanSlotCount }).map((_, i) => {
                const socketed = talismans[i];
                return (
                  <button
                    type="button"
                    key={i}
                    className={`loadout-talisman-socket ${
                      socketed ? 'is-filled' : ''
                    }`}
                    onClick={() => setActiveTalismanSocket(i)}
                  >
                    {socketed ? (
                      <>
                        <img src={socketed.iconUrl} alt="" />
                        <span>{socketed.name}</span>
                      </>
                    ) : (
                      <span>+ Talisman {i + 1}</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
          {blockedOffHand ? (
            <p className="has-text-grey">
              {blockedByTwoHander
                ? 'A two-handed weapon is equipped in the main hand.'
                : 'This career cannot equip anything in the off-hand.'}
            </p>
          ) : (
            <>
              {staffOnlyMainHand && (
                <p className="has-text-grey is-size-7 mb-2">
                  This career must wield a two-handed staff.
                </p>
              )}
              {slot === EquipSlot.OffHand && offHandTypes && (
                <p className="has-text-grey is-size-7 mb-2">
                  This career can only equip {offHandPolicyLabel(career)} in the
                  off-hand.
                </p>
              )}
              <input
                aria-label="Filter items by name"
                className="input mb-3"
                type="text"
                placeholder="Filter by name..."
                value={nameFilter}
                onChange={(event) => setNameFilter(event.target.value)}
              />
              {error && (
                <ErrorMessage
                  message={error.message}
                  name="Item picker query"
                />
              )}
              {loading && (
                <p className="has-text-grey" role="status">
                  Loading items...
                </p>
              )}
              {!loading && items.length === 0 && (
                <p className="has-text-grey">
                  No items usable by this career in this slot at renown rank req
                  &le; {renownRank}.
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
                        iLvl {item.itemLevel} &middot; Req{' '}
                        {item.levelRequirement}
                        {item.renownRankRequirement
                          ? ` / RR ${item.renownRankRequirement}`
                          : ''}
                        {item.itemSet ? ` · ${item.itemSet.name}` : ''}
                        {item.uniqueEquipped ? ' · Unique' : ''}
                      </span>
                    </div>
                    {hoveredId === item.id && <ItemTooltip item={item} />}
                  </button>
                ))}
              </div>
              {totalCount > allItems.length && (
                <p className="has-text-grey is-size-7 mt-2">
                  Showing {allItems.length} of {totalCount}. Narrow with the
                  name filter to see more specific results.
                </p>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
};

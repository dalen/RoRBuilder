import type { ReactElement } from 'react';
import {
  RENOWN_ABILITIES,
  getRenownPointCap,
  getRenownPointsSpent,
  type RenownSelections,
} from 'components/loadout/renownAbilities';

type RenownAbility = (typeof RENOWN_ABILITIES)[number];

const plannerAssetUrl = (path: string): string => {
  const base = globalThis.location.pathname.startsWith('/loadout')
    ? '/loadout'
    : '';
  return `${base}${path}`;
};

const RENOWN_ICONS: Record<RenownAbility['key'], string> = {
  might: 'statbuff_might',
  bladeMaster: 'statbuff_blademaster',
  marksman: 'statbuff_marksmen',
  impetus: 'statbuff_impetus',
  acumen: 'statbuff_acumen',
  resolve: 'statbuff_resolve',
  fortitude: 'tac_green_dwarf01',
  vigor: 'statbuff_vigor',
  opportunist: 'statbuff_opportunist',
  sureShot: 'statbuff_sureshot',
  focusedPower: 'statbuff_focusedpower',
  spiritualRefinement: 'statbuff_spiritualrefinement',
  regeneration: 'placeholder_ge_buff',
  quickEscape: 'abi_quickescape',
  improvedFlee: 'abi_ge_sprint',
  reflexes: 'statbuff_reflexes',
  defender: 'statbuff_defender',
  deftDefender: 'statbuff_arcanedismissal',
  hardyConcession: 'statbuff_reinforcement',
  futileStrikes: 'statbuff_arcaneprotection',
  trivialBlows: 'statbuff_resilient',
  expandedCapacity: 'statbuff_sage',
};

const maximumRank = (def: RenownAbility): number => {
  let rank = def.costByRank.length - 1;
  while (
    rank > 1 &&
    def.costByRank[rank] === def.costByRank[rank - 1] &&
    def.effectByRank[rank] === def.effectByRank[rank - 1]
  ) {
    rank -= 1;
  }
  return rank;
};

export const RenownPanel = ({
  selections,
  onChange,
  level,
  renownRank,
  onClose,
  embedded = false,
}: {
  selections: RenownSelections;
  onChange: (next: RenownSelections) => void;
  level: number;
  renownRank: number;
  onClose: () => void;
  embedded?: boolean;
}): ReactElement => {
  const cap = getRenownPointCap(level, renownRank);
  const spent = getRenownPointsSpent(selections);

  // Raising a rank must not be able to push total spend past the overall
  // renown point cap, even though each individual ability's own maxRank may
  // still allow it. Lowering a rank is always allowed (including when the
  // build is already over budget, e.g. after level/renown rank drops).
  const canAfford = (
    def: RenownAbility,
    targetRank: number,
    currentRank: number,
  ): boolean => {
    if (targetRank <= currentRank) return true;
    const nextSpent =
      spent - def.costByRank[currentRank] + def.costByRank[targetRank];
    return nextSpent <= cap;
  };

  const setRank = (
    def: RenownAbility,
    rank: number,
    maxRank: number,
  ): void => {
    const clamped = Math.max(0, Math.min(maxRank, rank));
    const currentRank = Math.max(
      0,
      Math.min(maxRank, selections[def.key] ?? 0),
    );
    if (!canAfford(def, clamped, currentRank)) return;
    onChange({ ...selections, [def.key]: clamped });
  };

  return (
    <div className={embedded ? 'loadout-builder-embedded' : 'modal is-active'}>
      {!embedded && <div className="modal-background" onClick={onClose} />}
      <div
        className={`modal-card loadout-renown-modal ${
          embedded ? 'is-embedded' : ''
        }`}
      >
        <header className="modal-card-head">
          <div>
            <p className="modal-card-title">Renown Builder</p>
            <p className="is-size-7 has-text-grey">
              Choose ranks to add their bonuses to this build.
            </p>
          </div>
          <button
            type="button"
            className="button is-small is-dark ml-auto mr-3"
            onClick={() => onChange({})}
            disabled={spent === 0}
          >
            Reset all
          </button>
          {!embedded && (
            <button
              type="button"
              className="delete"
              aria-label="close"
              onClick={onClose}
            />
          )}
        </header>
        <section className="modal-card-body">
          <div
            className={`loadout-renown-budget ${spent > cap ? 'is-over' : ''}`}
          >
            <span>
              <strong>Renown rank required</strong> {spent}
            </span>
            <span>
              {Math.max(0, cap - spent)} points remaining of {cap}
            </span>
          </div>
          {spent > cap && (
            <p className="has-text-danger is-size-7 mt-1">
              Over budget — reduce a rank or raise your level/renown rank.
            </p>
          )}
          <div className="loadout-renown-grid">
            {RENOWN_ABILITIES.map((def) => {
              const maxRank = maximumRank(def);
              const rank = Math.max(
                0,
                Math.min(maxRank, selections[def.key] ?? 0),
              );
              return (
                <article
                  className={`loadout-renown-card ${
                    rank > 0 ? 'is-selected' : ''
                  }`}
                  key={def.key}
                >
                  <header>
                    <span
                      className="loadout-renown-card-mark"
                      aria-hidden="true"
                    >
                      <img
                        src={plannerAssetUrl(
                          `/images/renown/${RENOWN_ICONS[def.key]}.png`,
                        )}
                        alt=""
                      />
                    </span>
                    <div>
                      <h3>{def.label}</h3>
                      <p>
                        {def.effectTextByRank?.[rank] ??
                          `${def.effectByRank[rank] > 0 ? '+' : ''}${
                            def.effectByRank[rank]
                          }${def.percentage ? '%' : ''} at rank ${rank}`}
                      </p>
                    </div>
                  </header>
                  <div
                    className="loadout-renown-tiers"
                    aria-label={`${def.label} rank costs`}
                  >
                    {Array.from({ length: maxRank }, (_, index) => {
                      const tier = index + 1;
                      const cost =
                        def.costByRank[tier] - def.costByRank[tier - 1];
                      return (
                        <button
                          type="button"
                          className={tier <= rank ? 'is-active' : ''}
                          onClick={() => setRank(def, tier, maxRank)}
                          disabled={!canAfford(def, tier, rank)}
                          aria-label={`Set ${def.label} to rank ${tier}, ${cost} points`}
                          key={tier}
                        >
                          <span>Rank {tier}</span>
                          <strong>{cost}</strong>
                        </button>
                      );
                    })}
                  </div>
                  <footer>
                    <button
                      type="button"
                      className="button is-small"
                      onClick={() => setRank(def, rank - 1, maxRank)}
                      disabled={rank <= 0}
                      aria-label={`Decrease ${def.label}`}
                    >
                      −
                    </button>
                    <span>
                      Rank {rank} · {def.costByRank[rank]} points
                    </span>
                    <button
                      type="button"
                      className="button is-small"
                      onClick={() => setRank(def, rank + 1, maxRank)}
                      disabled={rank >= maxRank || !canAfford(def, rank + 1, rank)}
                      aria-label={`Increase ${def.label}`}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="button is-small loadout-renown-reset"
                      onClick={() => setRank(def, 0, maxRank)}
                      disabled={rank === 0}
                      aria-label={`Reset ${def.label}`}
                    >
                      ↺
                    </button>
                  </footer>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

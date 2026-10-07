import type { ReactElement } from 'react';
import type { MasteryAbility } from 'components/loadout/masteryData';

/** Hover-preview card for a mastery/tactic/morale/core ability, styled like
 * the item tooltip for visual consistency. `flip` renders it to the left of
 * the icon instead of the right, for abilities near the right edge of the
 * modal where the default right-side placement would run off-screen. */
export const AbilityTooltip = ({
  ability,
  flip,
  id,
}: {
  ability: MasteryAbility;
  flip?: boolean;
  id?: string;
}): ReactElement => (
  <div
    id={id}
    role="tooltip"
    className="loadout-item-tooltip"
    style={
      flip
        ? { borderColor: '#d4a83c', left: 'auto', right: 'calc(100% + 0.6rem)' }
        : { borderColor: '#d4a83c' }
    }
  >
    <p className="loadout-item-tooltip-name" style={{ color: '#d4a83c' }}>
      {ability.name}
    </p>
    <div
      className="loadout-item-tooltip-divider"
      style={{ borderColor: '#d4a83c' }}
    />
    <div className="loadout-item-tooltip-row">
      <span>{ability.cost}</span>
      {ability.range && <span>{ability.range}</span>}
      {ability.castTime && <span>{ability.castTime}</span>}
      {ability.cooldown && <span>{ability.cooldown}</span>}
    </div>
    {ability.note && (
      <p className="loadout-item-tooltip-meta">{ability.note}</p>
    )}
    <div
      className="loadout-item-tooltip-divider"
      style={{ borderColor: '#d4a83c' }}
    />
    {ability.description.split('\n').map((line, i) => (
      <p
        key={i}
        className="loadout-item-tooltip-meta"
        style={{ color: '#d7dbe6' }}
      >
        {line}
      </p>
    ))}
    <p className="loadout-item-tooltip-meta">
      Requires Level {ability.minRank}
    </p>
  </div>
);

import { useState } from 'react';
import classNames from 'classnames';
import Popover from './Popover';

import css from '../css/components/RenownCategoryAbility.module.css';
import { RenownAbility } from '../helpers/renown';

const RenownCategoryAbility = ({
  ability,
  state,
  onClick,
}: {
  ability: RenownAbility;
  state: 'selected' | 'available' | 'disabled';
  onClick: () => void;
}) => {
  const [hovered, setHovered] = useState(false);

  const hoverOver = () => {
    setHovered(true);
  };

  const hoverOut = () => {
    setHovered(false);
  };

  const infoClass = classNames({
    'is-hovered': hovered,
    popover__parent: true,
  });

  return (
    <div className={infoClass}>
      <button
        type="button"
        key={ability.name}
        className={css[state]}
        onFocus={hoverOver}
        onBlur={hoverOut}
        onMouseOver={hoverOver}
        onMouseOut={hoverOut}
        onClick={onClick}
      >
        {ability.cost}
      </button>
      <Popover alignment="top" activate={hovered}>
        <div>
          <div className={css.popoverRowLarge}>
            <p className={css.popoverItemTitle}>{ability.name}</p>
          </div>
          <div className={css.poroverDivider} />
          <div className={css.popoverRow}>
            <p className={css.popoverItem}>{ability.note}</p>
          </div>
          <div className={css.popoverRow}>
            <p className={css.popoverItem}>
              {ability.cost}
              <img
                className={css.arrow}
                alt="Arrow up"
                src="../images/renown/specpoint_renown.png"
              />
            </p>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default RenownCategoryAbility;

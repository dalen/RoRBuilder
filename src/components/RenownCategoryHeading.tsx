import { useState } from 'react';
import classNames from 'classnames';
import Popover from './Popover';

import css from '../css/components/RenownCategoryHeading.module.css';
import { RenownCategory } from '../helpers/renown';

const RenownCategoryHeading = ({ category }: { category: RenownCategory }) => {
  const [hovered, setHovered] = useState(false);

  const imgSrc = `../../images/renown/${category.icon}.png`;

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
      <div
        className={css.ability}
        onFocus={hoverOver}
        onBlur={hoverOut}
        onMouseOver={hoverOver}
        onMouseOut={hoverOut}
      >
        <img className={css.image} src={imgSrc} alt={category.name} />
        {category.name}
      </div>
      <Popover alignment="top" activate={hovered}>
        <div>
          <img alt={category.name} src={imgSrc} className={css.popoverImage} />
          <div className={css.popoverRowLarge}>
            <p className={css.popoverItemTitle}>{category.name}</p>
          </div>
          <div className={css.poroverDivider} />
          <div className={css.popoverRow}>
            <p className={css.popoverItem}>{category.description}</p>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default RenownCategoryHeading;

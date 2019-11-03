import React, { useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import css from '../css/components/Ability.module.css';

import Popover from '../components/Popover';
import PopoverAbility from '../components/PopoverAbility';
import { State } from '../reducers';

const initialStatus = (currentLevel: number, minrank: number) => {
  return currentLevel >= minrank;
};

const Ability = ({ level, data }: { level: State['level']; data: any }) => {
  const [hovered, setHovered] = useState(false);

  const status = initialStatus(level, data.minrank);

  const hoverOver = () => {
    setHovered(true);
  };
  const hoverOut = () => {
    setHovered(false);
  };

  const abilityClass = classNames({
    [css.ability]: true,
    'is-hovered': hovered,
    popover__parent: true,
  });
  const abilityImageClass = classNames({
    [css.image]: status,
    [css.imageInactive]: !status,
  });
  const imgSrc = `../../images/abilities/${data.image}.png`;
  const popoverContent = <PopoverAbility data={data} imgSrc={imgSrc} />;
  return (
    <div className={abilityClass}>
      <img
        className={abilityImageClass}
        src={imgSrc}
        alt={data.name}
        onMouseOver={hoverOver}
        onMouseOut={hoverOut}
      />
      <Popover
        content={popoverContent}
        alignment="top"
        activate={hovered}
        abilityOptional={false}
        status={status}
      />
    </div>
  );
};

function mapStateToProps({ level }: State) {
  return {
    level,
  };
}

export default connect(mapStateToProps)(Ability);

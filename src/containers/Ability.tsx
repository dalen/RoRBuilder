import { useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import css from '../css/components/Ability.module.css';

import Popover from '../components/Popover';
import PopoverAbility from '../components/PopoverAbility';
import { State } from '../reducers';
import { Ability as AbilityType } from '../helpers/abilities';

const initialStatus = (currentLevel: number, minrank: number) => {
  return currentLevel >= minrank;
};

function mapStateToProps({ level }: State) {
  return {
    level,
  };
}

const Ability = ({
  level,
  data,
}: {
  data: AbilityType;
} & ReturnType<typeof mapStateToProps>) => {
  const [hovered, setHovered] = useState(false);

  const status = initialStatus(level, Number(data.minrank));

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
        onFocus={hoverOver}
        onBlur={hoverOut}
      />
      <Popover
        alignment="top"
        activate={hovered}
        abilityOptional={false}
        status={status}
      >
        {popoverContent}
      </Popover>
    </div>
  );
};

export default connect(mapStateToProps)(Ability);

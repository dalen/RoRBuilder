import { useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import css from '../css/components/AbilityMorale.module.css';

import Popover from '../components/Popover';
import PopoverAbility from '../components/PopoverAbility';

import { State } from '../reducers';
import { Ability } from '../helpers/abilities';

import * as actionSelectedMorale1 from '../actions/actionSelectedMorale1';
import * as actionSelectedMorale2 from '../actions/actionSelectedMorale2';
import * as actionSelectedMorale3 from '../actions/actionSelectedMorale3';
import * as actionSelectedMorale4 from '../actions/actionSelectedMorale4';

function mapStateToProps({
  level,
  selectedMorale1,
  selectedMorale2,
  selectedMorale3,
  selectedMorale4,
}: State) {
  return {
    level,
    selectedMorale1,
    selectedMorale2,
    selectedMorale3,
    selectedMorale4,
  };
}

const mapDispatchToProps = {
  selectMorale1: actionSelectedMorale1.selectMorale1,
  resetSelectedMorale1: actionSelectedMorale1.resetSelectedMorale1,
  selectMorale2: actionSelectedMorale2.selectMorale2,
  resetSelectedMorale2: actionSelectedMorale2.resetSelectedMorale2,
  selectMorale3: actionSelectedMorale3.selectMorale3,
  resetSelectedMorale3: actionSelectedMorale3.resetSelectedMorale3,
  selectMorale4: actionSelectedMorale4.selectMorale4,
  resetSelectedMorale4: actionSelectedMorale4.resetSelectedMorale4,
};

type Props = {
  rank: '1' | '2' | '3' | '4';
  data: Ability;
} & typeof mapDispatchToProps &
  ReturnType<typeof mapStateToProps>;

const AbilityMorale = ({
  rank,
  data,
  level,
  selectedMorale1,
  selectedMorale2,
  selectedMorale3,
  selectedMorale4,
  selectMorale1,
  resetSelectedMorale1,
  selectMorale2,
  resetSelectedMorale2,
  selectMorale3,
  resetSelectedMorale3,
  selectMorale4,
  resetSelectedMorale4,
}: Props) => {
  const [hovered, setHovered] = useState(false);

  const minrank = Number(data.minrank);
  const status = level >= minrank;
  const selected = (() => {
    switch (rank) {
      case '1':
        return selectedMorale1 === data.id;
      case '2':
        return selectedMorale2 === data.id;
      case '3':
        return selectedMorale3 === data.id;
      case '4':
        return selectedMorale4 === data.id;
    }
    return false;
  })();

  const hoverOver = () => {
    setHovered(true);
  };

  const hoverOut = () => {
    setHovered(false);
  };

  const selectMorale = () => {
    if (status) {
      switch (rank) {
        case '1':
          if (selected) {
            resetSelectedMorale1();
          } else {
            selectMorale1(data.id);
          }
          return;
        case '2':
          if (selected) {
            resetSelectedMorale2();
          } else {
            selectMorale2(data.id);
          }
          return;
        case '3':
          if (selected) {
            resetSelectedMorale3();
          } else {
            selectMorale3(data.id);
          }
          return;
        case '4':
          if (selected) {
            resetSelectedMorale4();
          } else {
            selectMorale4(data.id);
          }
      }
    }
  };

  const abilityClass = classNames({
    [css.ability]: true,
    [css.abilitySelected]: selected,
    'is-hovered': hovered,
    popover__parent: true,
    'marginRight--small@mobile': true,
  });
  const abilityImageClass = classNames({
    [css.image]: status,
    [css.imageInactive]: !status,
  });
  const imgSrc = `../../images/abilities/${data.image}.png`;
  const popoverContent = <PopoverAbility data={data} imgSrc={imgSrc} />;
  return (
    <div
      className={abilityClass}
      role="button"
      tabIndex={0}
      onMouseOver={hoverOver}
      onMouseOut={hoverOut}
      onFocus={hoverOver}
      onBlur={hoverOut}
      onClick={selectMorale}
      onKeyPress={selectMorale}
    >
      <img className={abilityImageClass} src={imgSrc} alt={data.name} />
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

export default connect(mapStateToProps, mapDispatchToProps)(AbilityMorale);

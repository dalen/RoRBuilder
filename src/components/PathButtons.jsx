import React from 'react';
import classNames from 'classnames';
import IconPlus from '../icons/IconPlus';
import IconMinus from '../icons/IconMinus';
import css from '../css/components/PathButtons.module.css';

const PathButtons = props => {
  const addHandler = e => {
    if (props.points > 0 && props.pathPoints < props.meterMax) {
      props.addPoint();
    } else {
      e.preventDefault();
    }
  };
  const removeHandler = e => {
    if (props.pathPoints > 0) {
      props.removePoint();
    } else {
      e.preventDefault();
    }
  };
  const plusClass = classNames({
    [css.button]: true,
    'marginRight--extra-small': true,
    [css.buttonDisabled]: Number(props.points) === 0,
  });
  const minusClass = classNames({
    [css.button]: true,
    [css.buttonDisabled]: Number(props.pathPoints < 1),
  });
  return [
    <button
      key="pathButtonAdd"
      className={plusClass}
      onClick={addHandler}
      type="button"
    >
      <IconPlus classes="icon--small" name="plus icon" nameSlug="plus-icon" />
    </button>,
    <button
      key="pathButtonRemove"
      className={minusClass}
      onClick={removeHandler}
      type="button"
    >
      <IconMinus
        classes="icon--small"
        name="minus icon"
        nameSlug="minus-icon"
      />
    </button>,
  ];
};

export default PathButtons;

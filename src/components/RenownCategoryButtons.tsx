import { MouseEvent } from 'react';
import classNames from 'classnames';
import IconPlus from '../icons/IconPlus';
import IconMinus from '../icons/IconMinus';
import css from '../css/components/RenownCategoryButtons.module.css';

const RenownCategoryButtons = ({
  points,
  pathPoints,
  meterMax,
  addPoint,
  removePoint,
  reset,
}: {
  meterMax: number;
  points: number;
  pathPoints: number;
  addPoint: () => void;
  removePoint: () => void;
  reset: () => void;
}) => {
  const addHandler = (e: MouseEvent) => {
    if (points > 0 && pathPoints < meterMax) {
      addPoint();
    } else {
      e.preventDefault();
    }
  };
  const removeHandler = (e: MouseEvent) => {
    if (pathPoints > 0) {
      removePoint();
    } else {
      e.preventDefault();
    }
  };
  const plusClass = classNames({
    [css.button]: true,
    'marginRight--extra-small': true,
    [css.buttonDisabled]: points === 0,
  });
  const minusClass = classNames({
    [css.button]: true,
    [css.buttonDisabled]: pathPoints < 1,
  });

  return (
    <>
      <button
        key="renownButtonAdd"
        className={plusClass}
        onClick={addHandler}
        type="button"
      >
        <IconPlus classes="icon--small" name="plus icon" nameSlug="plus-icon" />
      </button>
      <button
        key="renownButtonRemove"
        className={minusClass}
        onClick={removeHandler}
        type="button"
      >
        <IconMinus
          classes="icon--small"
          name="minus icon"
          nameSlug="minus-icon"
        />
      </button>
      <button
        key="renownButtonReset"
        className={classNames({
          [css.buttonReset]: true,
          [css.buttonDisabled]: pathPoints === 0,
        })}
        onClick={reset}
        type="button"
      >
        ↺
      </button>
    </>
  );
};

export default RenownCategoryButtons;

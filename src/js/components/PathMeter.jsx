import React from 'react';
import classNames from 'classnames';
import css from '../../css/components/PathMeter.css';

const PathMeter = props => {
  const renderMeterLevel = () => {
    const meterLevels = [];
    for (let i = 1; i <= props.meterMax; i++) {
      let thisClass = css.level;
      let thisClickHandler = false;
      thisClickHandler = e => {
        e.preventDefault();
      };
      if (i <= props.pathPoints) {
        thisClass = css.levelActive;
        thisClickHandler = () => {
          props.setPoints(i);
        };
      } else if (i <= Number(props.points) + Number(props.pathPoints)) {
        thisClass = css.levelAvailable;
        thisClickHandler = () => {
          props.setPoints(i);
        };
      }
      meterLevels.push(
        <div
          key={props.pathPoints + i}
          className={thisClass}
          onClick={thisClickHandler}
        >
          {i}
        </div>,
      );
    }
    return meterLevels;
  };
  return <div className={css.meter}>{renderMeterLevel()}</div>;
};

export default PathMeter;

import { MouseEvent } from 'react';
import css from '../css/components/PathMeter.module.css';

const PathMeter = ({
  meterMax,
  pathPoints,
  points,
  setPoints,
}: {
  meterMax: number;
  pathPoints: number;
  points: number;
  setPoints: (points: number) => void;
}) => {
  const renderMeterLevel = () => {
    const meterLevels = [];
    for (let i = 1; i <= meterMax; i += 1) {
      let thisClass = css.level;
      let thisClickHandler = (event: MouseEvent) => {
        event.preventDefault();
      };
      if (i <= pathPoints) {
        thisClass = css.levelActive;
        thisClickHandler = () => {
          setPoints(i);
        };
      } else if (i <= Number(points) + Number(pathPoints)) {
        thisClass = css.levelAvailable;
        thisClickHandler = () => {
          setPoints(i);
        };
      }
      meterLevels.push(
        <button
          type="button"
          key={pathPoints + i}
          className={thisClass}
          onClick={thisClickHandler}
        >
          {i}
        </button>,
      );
    }
    return meterLevels;
  };
  return <div className={css.meter}>{renderMeterLevel()}</div>;
};

export default PathMeter;

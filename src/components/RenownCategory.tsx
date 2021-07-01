import css from '../css/components/RenownCategory.module.css';

import RenownCategoryHeading from './RenownCategoryHeading';
import RenownCategoryAbility from './RenownCategoryAbility';
import { RenownCategory } from '../helpers/renown';
import RenownCategoryButtons from './RenownCategoryButtons';

// Calculate how many more levels we can afford
const levelsAvailable = (
  data: RenownCategory,
  level: number,
  pointsLeft: number,
): number => {
  const remainingLevels = data.levels.slice(level);

  return remainingLevels.reduce(
    (accumulator, currentLevel) => {
      const [sumAvailable, sumPointsLeft] = accumulator;
      if (sumPointsLeft >= currentLevel.cost) {
        return [sumAvailable + 1, sumPointsLeft - currentLevel.cost];
      }
      return accumulator;
    },
    [0, pointsLeft],
  )[0];
};

export default ({
  points,
  height, // Set to same as levels, or hight to show empty squares
  pointsLeft,
  data,
  addLevel,
  removeLevel,
  setLevel,
}: {
  points: number;
  height: number;
  pointsLeft: number;
  data: RenownCategory;
  addLevel: () => void;
  removeLevel: () => void;
  setLevel: (level: number) => void;
}) => {
  const { levels } = data;

  const numAvailable = levelsAvailable(data, points, pointsLeft);

  return (
    <div className="marginRight@md-min">
      <div className={css.meter}>
        <RenownCategoryHeading category={data} />
        {Array(height - levels.length)
          .fill(0)
          .map(() => {
            return <div className={css.empty} />;
          })}
        {[...levels].reverse().map((level, index) => {
          const abilityLevel = levels.length - index;
          const state =
            abilityLevel > points
              ? abilityLevel - points > numAvailable
                ? 'disabled'
                : 'available'
              : 'selected';
          return (
            <RenownCategoryAbility
              key={level.name}
              ability={level}
              state={state}
              onClick={() => {
                if (state !== 'disabled') setLevel(abilityLevel);
              }}
            />
          );
        })}
      </div>
      <RenownCategoryButtons
        meterMax={levels.length}
        points={numAvailable}
        pathPoints={points}
        addPoint={addLevel}
        removePoint={removeLevel}
        reset={() => setLevel(0)}
      />
    </div>
  );
};

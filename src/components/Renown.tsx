import React, { useState } from 'react';
import BarRenown from './BarRenown';
import Breadcrumb from '../containers/Breadcrumb';
import RenownCategory from './RenownCategory';

import renownData from '../data/renown.json';

const initialState = {
  Might: 0,
  'Blade Master': 0,
  Marksmen: 0,
  Impetus: 0,
  Acumen: 0,
  Resolve: 0,
  Fortitude: 0,
  Vigor: 0,
  Opportunist: 0,
  'Sure Shot': 0,
  'Focused Power': 0,
  'Spiritual Refinement': 0,
};

const MAX_RENOWN = 80;

type CategoryName = keyof typeof initialState;

const Renown = () => {
  const [meters, setMeters] = useState(initialState);

  /*
  useState(
    Object.fromEntries(
      Object.keys(renownData.categories).map(key => [key, 0] as const),
    ),
  ); */

  const setMeter = (meter: CategoryName, value: number) => {
    setMeters({
      ...meters,
      [meter]: value,
    });
  };

  const increaseMeter = (meter: CategoryName, max: number) => {
    if (meters[meter] < max) setMeter(meter, meters[meter] + 1);
  };

  const decreaseMeter = (meter: CategoryName) => {
    if (meters[meter] > 0) setMeter(meter, meters[meter] - 1);
  };

  const pointsUsed = Object.entries(meters)
    .map(([name, level]) => {
      // Calculate the cost for this category
      if (level === 0) return 0;

      const category = renownData.categories[name as CategoryName];
      return category.levels.reduce(
        (accumulator, currentValue, index) =>
          level > index ? accumulator + currentValue.cost : accumulator,
        0,
      );
    })
    // Sum the costs for all the categories
    .reduce((total, num) => total + num);

  const pointsLeft = MAX_RENOWN - pointsUsed;

  const renderCategory = (category: CategoryName): JSX.Element => (
    <RenownCategory
      key={category}
      points={meters[category]}
      pointsLeft={pointsLeft}
      data={renownData.categories[category]}
      addLevel={() => {
        increaseMeter(category, renownData.categories[category].levels.length);
      }}
      removeLevel={() => {
        decreaseMeter(category);
      }}
      setLevel={(level: number) => {
        setMeter(category, level);
      }}
    />
  );

  return (
    <div className="paddingTop paddingRight paddingLeft paddingBottom">
      <div className="marginBottom--medium">
        <Breadcrumb />
      </div>
      <div className="marginBottom--medium">
        <BarRenown renown={pointsUsed} />
      </div>
      <div className="grid">
        <div className="grid-col-1 grid-col-10-24@md-min">
          <div className="row">
            {([
              'Might',
              'Blade Master',
              'Marksmen',
              'Impetus',
              'Acumen',
              'Resolve',
              'Fortitude',
              'Vigor',
            ] as const).map(renderCategory)}
          </div>
          <div className="row">
            {([
              'Opportunist',
              'Sure Shot',
              'Focused Power',
              'Spiritual Refinement',
            ] as const).map(renderCategory)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Renown;

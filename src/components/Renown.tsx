import React, { useState } from 'react';
import classNames from 'classnames';
import BarRenown from './BarRenown';
import Breadcrumb from '../containers/Breadcrumb';
import RenownCategory from './RenownCategory';

import css from '../css/components/Renown.module.css';
import renownData from '../data/renown.json';

// Order here is important, it it same as is used in the URL
// Changing it will break existing URLs
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
  'Futile Strikes': 0,
  Reflexes: 0,
  Defender: 0,
  'Deft Defender': 0,
  'Expanded Capacity': 0,
  Regeneration: 0,
  'Quick Escape': 0,
  'Improved Flee': 0,
  'Hardy Concession': 0,
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

  const renderCategory = (
    category: CategoryName,
    height: number,
  ): JSX.Element => (
    <RenownCategory
      key={category}
      points={meters[category]}
      height={height}
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

  const labelClass = classNames({
    [css.label]: true,
    'marginLeft--small': true,
    [css.labelActive]: pointsLeft > 0,
  });

  return (
    <div className="paddingTop paddingRight paddingLeft paddingBottom">
      <div className="marginBottom--medium">
        <Breadcrumb />
      </div>
      <div className="marginBottom--medium">
        <BarRenown renown={pointsUsed} />
      </div>
      <div className="marginBottom--medium">
        <h2 className={css.heading}>
          Renown rank required <span className={labelClass}>{pointsUsed}</span>
        </h2>
      </div>
      <div className="grid">
        <div className="grid-col-1 grid-col-24-24@md-min">
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
            ] as const).map(name => renderCategory(name, 5))}
          </div>
          <div className="row">
            {([
              'Opportunist',
              'Sure Shot',
              'Focused Power',
              'Spiritual Refinement',
              'Quick Escape',
              'Improved Flee',
              'Expanded Capacity',
            ] as const).map(name => renderCategory(name, 4))}
          </div>
          <div className="row">
            {([
              'Reflexes',
              'Defender',
              'Deft Defender',
              'Futile Strikes',
              'Hardy Concession',
              'Regeneration',
            ] as const).map(name => renderCategory(name, 5))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Renown;

import React, { useState } from 'react';
import classNames from 'classnames';
import { RouteComponentProps, Link } from 'react-router-dom';

import BarRenown from './BarRenown';
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
  'Quick Escape': 0,
  'Improved Flee': 0,
  'Expanded Capacity': 0,

  Reflexes: 0,
  Defender: 0,
  'Deft Defender': 0,
  'Futile Strikes': 0,
  'Hardy Concession': 0,
  Regeneration: 0,
};

const MAX_RENOWN = 80;

type CategoryName = keyof typeof initialState;

type State = typeof initialState;

const slugFromState = (state: State): string =>
  Object.values(state)
    .map(meter => meter.toString())
    .join(';');

const stateFromSlug = (slug: string | undefined): State => {
  if (slug === undefined) return initialState;
  const slugValues = slug.split(';').map(v => Number(v));
  const entries = Object.entries(initialState).map((entry, index): [
    string,
    number,
  ] => {
    return [entry[0], slugValues[index] || entry[1]];
  });
  return Object.fromEntries(entries) as State;
};

const Renown = ({ history, match }: RouteComponentProps<{ slug?: string }>) => {
  const [meters, setMeters] = useState(stateFromSlug(match.params.slug));

  const reset = () => {
    setMeters(initialState);
    history.replace(`/renown/${slugFromState(initialState)}`);
  };

  const setMeter = (meter: CategoryName, value: number) => {
    const newState = {
      ...meters,
      [meter]: value,
    };
    setMeters(newState);
    history.replace(`/renown/${slugFromState(newState)}`);
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
      <h2 className={css.heading}>
        Renown rank required <span className={labelClass}>{pointsUsed}</span>
      </h2>
      <div className="marginBottom--medium">
        <BarRenown renown={pointsUsed} />
      </div>
      <div className="grid">
        <div className="grid-col-1 grid-col-24-24@md-min">
          <div className={css.container}>
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
          <div className="marginTop">
            <div className={css.container}>
              <Link to="/" className={css.home}>
                Home
              </Link>
              <button className={css.reset} type="button" onClick={reset}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Renown;

import { Component } from 'react';
import { connect } from 'react-redux';
import css from '../css/components/PathMeterAbilities.module.css';

import AbilityMastery from './AbilityMastery';
import { State } from '../reducers';

type Props = {
  path: 'a' | 'b' | 'c';
  abilities: State['abilities'];
  pathMeterA: number;
  pathMeterB: number;
  pathMeterC: number;
};

class PathMeterAbilities extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.renderAbility = this.renderAbility.bind(this);
  }

  renderAbility(obj: { level: number; requirement: number }) {
    if (this.props.abilities == null) {
      return null;
    }

    const meterRequirement = obj.requirement;
    const levelProp = `lvl${obj.level}` as
      | 'lvl1'
      | 'lvl2'
      | 'lvl3'
      | 'lvl4'
      | 'lvl5'
      | 'lvl6'
      | 'lvl7';
    const pathMeter = (() => {
      switch (this.props.path) {
        case 'a':
          return this.props.pathMeterA;
        case 'b':
          return this.props.pathMeterB;
        case 'c':
          return this.props.pathMeterC;
      }
    })();
    const abilityKey = `oa${
      this.props.abilities.mastery[this.props.path].optionalAbilities[levelProp]
    }`;
    const abilityData =
      this.props.abilities.indexed[
        this.props.abilities.mastery[this.props.path].optionalAbilities[
          levelProp
        ]
      ];
    return (
      <div className={css.ability} key={abilityKey}>
        <AbilityMastery
          data={abilityData}
          path={this.props.path}
          pathMeter={pathMeter}
          meterRequirement={meterRequirement}
        />
      </div>
    );
  }

  render() {
    const abilities = [
      {
        level: 7,
        requirement: 15,
      },
      {
        level: 6,
        requirement: 13,
      },
      {
        level: 5,
        requirement: 11,
      },
      {
        level: 4,
        requirement: 9,
      },
      {
        level: 3,
        requirement: 7,
      },
      {
        level: 2,
        requirement: 5,
      },
      {
        level: 1,
        requirement: 3,
      },
    ];
    if (this.props.abilities == null) {
      return null;
    }
    return (
      <div>
        <div className="column marginLeft--small">
          {abilities.map((i) => this.renderAbility(i))}
        </div>
      </div>
    );
  }
}

function mapStateToProps({
  abilities,
  pathMeterA,
  pathMeterB,
  pathMeterC,
}: State) {
  return {
    abilities,
    pathMeterA,
    pathMeterB,
    pathMeterC,
  };
}

export default connect(mapStateToProps)(PathMeterAbilities);

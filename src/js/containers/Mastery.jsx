import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import css from '../../css/components/Mastery.css';

import Ability from './Ability';
import PathMeterContainer from './PathMeterContainer';
import PathInfo from '../components/PathInfo';

class Mastery extends Component {
  constructor(props) {
    super(props);
    this.renderPathPopover = this.renderPathPopover.bind(this);
    this.renderAbility = this.renderAbility.bind(this);
    this.renderCoreAbilities = this.renderCoreAbilities.bind(this);
  }

  renderPathPopover(pathName) {
    if (this.props.abilities.mastery[pathName].popover) {
      return (
        <PathInfo
          pathPopover={this.props.abilities.mastery[pathName].popover}
        />
      );
    }
  }

  renderAbility(abilityId) {
    return (
      <Ability key={abilityId} data={this.props.abilities.indexed[abilityId]} />
    );
  }

  renderCoreAbilities(path) {
    const coreAbilities = this.props.abilities.mastery[path].coreAbilities;
    // Split core abilities into two columns if there are 6 or more abilities (currently only Squig Herder)
    if (coreAbilities.length > 6) {
      const coreAbilities1 = [...coreAbilities.slice(0, 6)];
      const coreAbilities2 = [...coreAbilities.slice(6)];
      return [
        <div key="core1" className="column">
          {coreAbilities1.map(this.renderAbility)}
        </div>,
        <div key="core2" className="l-col">
          {coreAbilities2.map(this.renderAbility)}
        </div>,
      ];
    } else {
      return (
        <div className="column">{coreAbilities.map(this.renderAbility)}</div>
      );
    }
  }

  render() {
    const labelClass = classNames({
      [css.label]: true,
      'marginLeft--small': true,
      [css.labelActive]: this.props.currentPoints > 0,
    });

    if (this.props.abilities.length == 0) {
      return null;
    }

    return (
      <div className={css.container}>
        <h2 className={css.heading}>
          Mastery abilities{' '}
          <span className={labelClass}>{this.props.currentPoints} points</span>
        </h2>
        <div className="grid">
          <div className="grid-col-1-2 grid-col-1@mobile grid-col-1-3@sm-min">
            <div className="borderRight borderRight--none@mobile borderRight@sm-min marginRight borderBottom@mobile paddingBottom@mobile">
              <h3 className={css.subHeading}>
                {this.props.abilities.mastery.a.name}
                {this.renderPathPopover('a')}
              </h3>
              <div className="row row--justify">
                <div className="row row--justify">
                  <PathMeterContainer path="a" />
                </div>
                <div className="marginRight marginRight--large@mobile">
                  <div className={css.subHeadingSmall}>
                    Core
                    <br />
                    abilities
                  </div>
                  <div className="row">{this.renderCoreAbilities('a')}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid-col-1-2 grid-col-1@mobile grid-col-1-3@sm-min">
            <div className="borderRight@sm-min marginRight marginTop@mobile borderBottom@mobile paddingBottom@mobile">
              <h3 className={css.subHeading}>
                {this.props.abilities.mastery.b.name}
                {this.renderPathPopover('b')}
              </h3>
              <div className="row row--justify">
                <div className="row row--justify">
                  <PathMeterContainer path="b" />
                </div>
                <div className="marginRight marginRight--large@mobile">
                  <div className={css.subHeadingSmall}>
                    Core
                    <br />
                    abilities
                  </div>
                  <div className="row">{this.renderCoreAbilities('b')}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid-col-1-2 grid-col-1@mobile grid-col-1-3@sm-min">
            <div className="borderRight borderRight--none@mobile borderRight--none@sm-min marginRight marginTop marginTop--none@sm-min">
              <h3 className={css.subHeading}>
                {this.props.abilities.mastery.c.name}
                {this.renderPathPopover('c')}
              </h3>
              <div className="row row--justify">
                <div className="row row--justify">
                  <PathMeterContainer path="c" />
                </div>
                <div className="marginRight marginRight--large@mobile">
                  <div className={css.subHeadingSmall}>
                    Core
                    <br />
                    abilities
                  </div>
                  <div className="row">{this.renderCoreAbilities('c')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ points, currentPoints, abilities }) {
  return {
    points,
    currentPoints,
    abilities,
  };
}

export default connect(
  mapStateToProps,
  null,
)(Mastery);

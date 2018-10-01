import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from '../../css/components/SelectLevel.css';
import { calculateMasteryPoints } from '../helpers/points';

import { setLevel } from '../actions/actionLevel';
import { calculateTacticLimit } from '../actions/actionTacticLimit';
import { setPoints } from '../actions/actionPoints';
import { setCurrentPoints } from '../actions/actionCurrentPoints';
import { resetSelectedMorale1 } from '../actions/actionSelectedMorale1';
import { resetSelectedMorale2 } from '../actions/actionSelectedMorale2';
import { resetSelectedMorale3 } from '../actions/actionSelectedMorale3';
import { resetSelectedMorale4 } from '../actions/actionSelectedMorale4';
import { resetSelectedTactics } from '../actions/actionSelectedTactics';
import { resetPathMeterA } from '../actions/actionPathMeterA';
import { resetPathMeterB } from '../actions/actionPathMeterB';
import { resetPathMeterC } from '../actions/actionPathMeterC';
import { resetMasteryAbilities } from '../actions/actionMasteryAbilities';
import { resetMasteryMorales } from '../actions/actionMasteryMorales';
import { resetMasteryTactics } from '../actions/actionMasteryTactics';

class SelectLevel extends Component {

  constructor(props) {
    super(props);
    this.changeLevel = this.changeLevel.bind(this);
  }

  generateLevels() {
    let start = 40;
    const end = 1;
    const optionList = [];
    for (start; start <= end; start++) {
      optionList.push(<option key={start} value={start}>{start}</option>);
    }
    return optionList;
  }

  changeLevel() {

    // Reset selections
    this.props.resetSelectedMorale1();
    this.props.resetSelectedMorale2();
    this.props.resetSelectedMorale3();
    this.props.resetSelectedMorale4();
    this.props.resetSelectedTactics();
    this.props.resetPathMeterA();
    this.props.resetPathMeterB();
    this.props.resetPathMeterC();
    this.props.resetMasteryAbilities();
    this.props.resetMasteryMorales();
    this.props.resetMasteryTactics();
    this.props.setLevel(this.refs.level.value);
    this.props.calculateTacticLimit(this.refs.level.value);
    this.props.setPoints(calculateMasteryPoints(this.refs.level.value, this.props.renown));
    this.props.setCurrentPoints(calculateMasteryPoints(this.refs.level.value, this.props.renown));
    
    // TODO address the functions below
    //this.props.updateMasteryPoints();
  }

  render() {
    return (
      <div className={css.container}>
        <label className={css.label} htmlFor="levelSelect">Level</label>
        <select
          ref="level"
          onChange={this.changeLevel}
          className={css.select} id="levelSelect"
          value={this.props.level}
        >
          {this.generateLevels()}
        </select>
      </div>
    );
  }
}

function mapStateToProps({ level, renown }) {
  return {
    level,
    renown
  };
}

export default connect(mapStateToProps, { 
  setLevel, 
  calculateTacticLimit, 
  setPoints,
  setCurrentPoints,
  resetSelectedMorale1,
  resetSelectedMorale2,
  resetSelectedMorale3,
  resetSelectedMorale4,
  resetSelectedTactics,
  resetPathMeterA,
  resetPathMeterB,
  resetPathMeterC,
  resetMasteryAbilities,
  resetMasteryMorales,
  resetMasteryTactics
})(SelectLevel);

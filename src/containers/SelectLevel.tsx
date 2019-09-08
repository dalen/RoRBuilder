import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from '../css/components/SelectLevel.module.css';
import { calculateMasteryPoints } from '../helpers/points';

import { State } from '../reducers';
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

type Props = {
  renown: number;
  level: number;
  pathMeterA: number;
  pathMeterB: number;
  pathMeterC: number;
  masteryAbilities: number[];
  masteryMorales: number[];
  masteryTactics: number[];
  setLevel: (
    level: number,
  ) => {
    type: string;
    payload: number;
  };
  calculateTacticLimit: (
    level: number,
  ) => {
    type: string;
    payload: number;
  };
  setPoints: (
    points: number,
  ) => {
    type: string;
    payload: number;
  };
  setCurrentPoints: (
    points: number,
  ) => {
    type: string;
    payload: number;
  };
  resetSelectedMorale1: () => {
    type: string;
    payload: boolean;
  };
  resetSelectedMorale2: () => {
    type: string;
    payload: boolean;
  };
  resetSelectedMorale3: () => {
    type: string;
    payload: boolean;
  };
  resetSelectedMorale4: () => {
    type: string;
    payload: boolean;
  };
  resetSelectedTactics: () => {
    type: string;
    payload: never[];
  };
  resetPathMeterA: () => {
    type: string;
  };
  resetPathMeterB: () => {
    type: string;
  };
  resetPathMeterC: () => {
    type: string;
  };
  resetMasteryAbilities: () => {
    type: string;
    payload: never[];
  };
  resetMasteryMorales: () => {
    type: string;
    payload: never[];
  };
  resetMasteryTactics: () => {
    type: string;
    payload: never[];
  };
};

class SelectLevel extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.changeLevel = this.changeLevel.bind(this);
  }

  changeLevel(event: React.ChangeEvent<HTMLSelectElement>) {
    const {
      level,
      renown,
      pathMeterA,
      pathMeterB,
      pathMeterC,
      masteryAbilities,
      masteryMorales,
      masteryTactics,
    } = this.props;
    const newLevel = Number(event.target.value);

    this.props.setLevel(newLevel);
    this.props.calculateTacticLimit(newLevel);
    this.props.setPoints(calculateMasteryPoints(newLevel, renown));

    // Reset selections
    if (newLevel < level) {
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
      this.props.setCurrentPoints(calculateMasteryPoints(newLevel, renown));
    } else {
      this.props.setCurrentPoints(
        calculateMasteryPoints(newLevel, renown) -
          (pathMeterA +
            pathMeterB +
            pathMeterC +
            masteryAbilities.length +
            masteryMorales.length +
            masteryTactics.length),
      );
    }
    // TODO address the functions below
    // this.props.updateMasteryPoints();
  }

  render() {
    const { level } = this.props;
    return (
      <div className={css.container}>
        <label className={css.label} htmlFor="levelSelect">
          Level
        </label>
        <select
          onChange={this.changeLevel}
          className={css.select}
          id="levelSelect"
          value={level}
        >
          <option value="40">40</option>
          <option value="39">39</option>
          <option value="38">38</option>
          <option value="37">37</option>
          <option value="36">36</option>
          <option value="35">35</option>
          <option value="34">34</option>
          <option value="33">33</option>
          <option value="32">32</option>
          <option value="31">31</option>
          <option value="30">30</option>
          <option value="29">29</option>
          <option value="28">28</option>
          <option value="27">27</option>
          <option value="26">26</option>
          <option value="25">25</option>
          <option value="24">24</option>
          <option value="23">23</option>
          <option value="22">22</option>
          <option value="21">21</option>
          <option value="20">20</option>
          <option value="19">19</option>
          <option value="18">18</option>
          <option value="17">17</option>
          <option value="16">16</option>
          <option value="15">15</option>
          <option value="14">14</option>
          <option value="13">13</option>
          <option value="12">12</option>
          <option value="11">11</option>
          <option value="10">10</option>
          <option value="9">9</option>
          <option value="8">8</option>
          <option value="7">7</option>
          <option value="6">6</option>
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </select>
      </div>
    );
  }
}

function mapStateToProps({
  level,
  renown,
  pathMeterA,
  pathMeterB,
  pathMeterC,
  masteryAbilities,
  masteryMorales,
  masteryTactics,
}: State) {
  return {
    level,
    renown,
    pathMeterA,
    pathMeterB,
    pathMeterC,
    masteryAbilities,
    masteryMorales,
    masteryTactics,
  };
}

export default connect(
  mapStateToProps,
  {
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
    resetMasteryTactics,
  },
)(SelectLevel);

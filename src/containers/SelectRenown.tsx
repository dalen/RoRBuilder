import { Component } from 'react';
import { connect } from 'react-redux';
import css from '../css/components/SelectRenown.module.css';
import { calculateMasteryPoints } from '../helpers/points';

import { State } from '../reducers';
import { setRenown } from '../actions/actionRenown';
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

const mapDispatchToProps = {
  setRenown,
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
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

class SelectRenown extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.changeRenown = this.changeRenown.bind(this);
  }

  changeRenown(event: React.ChangeEvent<HTMLSelectElement>) {
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
    const newRenown = Number(event.target.value);

    this.props.setRenown(newRenown);
    this.props.setPoints(calculateMasteryPoints(level, newRenown));

    // Reset selections
    if (newRenown < renown) {
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
      this.props.setCurrentPoints(calculateMasteryPoints(level, newRenown));
    } else {
      this.props.setCurrentPoints(
        calculateMasteryPoints(level, newRenown) -
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
    const { renown } = this.props;

    return (
      <div className={css.container}>
        <label className={css.label} htmlFor="renownSelect">
          Renown rank
          <select
            onChange={this.changeRenown}
            className={css.select}
            id="renownSelect"
            value={renown}
          >
            <option value="40">40+</option>
            <option value="50">50+</option>
            <option value="60">60+</option>
            <option value="70">70+</option>
            <option value="80">Sov +2</option>
            <option value="10">&lt; 40</option>
          </select>
        </label>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SelectRenown);

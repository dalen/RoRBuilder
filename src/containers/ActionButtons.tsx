import { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import css from '../css/components/ActionButtons.module.css';
import { gaEvent, gaChangeCareer } from '../helpers/googleAnalytics';
import { MODAL_SHARE } from '../helpers/modalTypes';

import { toggleOverlay } from '../actions/actionOverlay';
import { toggleSidebar } from '../actions/actionSidebar';
import { resetLevel } from '../actions/actionLevel';
import { resetRenown } from '../actions/actionRenown';
import { resetTacticLimit } from '../actions/actionTacticLimit';
import { resetPoints } from '../actions/actionPoints';
import { resetCurrentPoints } from '../actions/actionCurrentPoints';
import { resetSelectedMorale1 } from '../actions/actionSelectedMorale1';
import { resetSelectedMorale2 } from '../actions/actionSelectedMorale2';
import { resetSelectedMorale3 } from '../actions/actionSelectedMorale3';
import { resetSelectedMorale4 } from '../actions/actionSelectedMorale4';
import { resetSelectedTactics } from '../actions/actionSelectedTactics';
import { resetMasteryAbilities } from '../actions/actionMasteryAbilities';
import { resetMasteryMorales } from '../actions/actionMasteryMorales';
import { resetMasteryTactics } from '../actions/actionMasteryTactics';
import { resetPathMeterA } from '../actions/actionPathMeterA';
import { resetPathMeterB } from '../actions/actionPathMeterB';
import { resetPathMeterC } from '../actions/actionPathMeterC';
import { openModal } from '../actions/actionModal';
import { setSharingLink } from '../actions/actionSharingLink';

import { State } from '../reducers';

function mapStateToProps({
  overlay,
  sidebar,
  careers,
  slug,
  selectedMorale1,
  selectedMorale2,
  selectedMorale3,
  selectedMorale4,
  selectedTactics,
  abilities,
  masteryAbilities,
  masteryTactics,
  masteryMorales,
  pathMeterA,
  pathMeterB,
  pathMeterC,
  currentPoints,
  tacticLimit,
  renown,
  level,
}: State) {
  return {
    overlay,
    sidebar,
    careers,
    slug,
    selectedMorale1,
    selectedMorale2,
    selectedMorale3,
    selectedMorale4,
    selectedTactics,
    abilities,
    masteryAbilities,
    masteryTactics,
    masteryMorales,
    pathMeterA,
    pathMeterB,
    pathMeterC,
    currentPoints,
    tacticLimit,
    renown,
    level,
  };
}

const mapDispatchToProps = {
  toggleOverlay,
  toggleSidebar,
  resetRenown,
  resetLevel,
  resetTacticLimit,
  resetPoints,
  resetCurrentPoints,
  resetSelectedMorale1,
  resetSelectedMorale2,
  resetSelectedMorale3,
  resetSelectedMorale4,
  resetSelectedTactics,
  resetMasteryAbilities,
  resetMasteryMorales,
  resetMasteryTactics,
  resetPathMeterA,
  resetPathMeterB,
  resetPathMeterC,
  openModal,
  setSharingLink,
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  RouteComponentProps;

class ActionButtons extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.clickHome = this.clickHome.bind(this);
    this.clickShare = this.clickShare.bind(this);
    this.clickChangeCareer = this.clickChangeCareer.bind(this);
    this.clickReset = this.clickReset.bind(this);
  }

  clickHome() {
    this.props.history.push('/');
  }

  combineMasteries() {
    // Combine all selected masteries into single array
    let combinedMasteries: number[] = [];
    if (this.props.masteryAbilities.length > 0) {
      combinedMasteries = this.props.masteryAbilities;
    }
    if (this.props.masteryMorales.length > 0) {
      if (combinedMasteries.length > 0) {
        combinedMasteries = [
          ...combinedMasteries,
          ...this.props.masteryMorales,
        ];
      } else {
        combinedMasteries = this.props.masteryMorales;
      }
    }
    if (this.props.masteryTactics.length > 0) {
      if (combinedMasteries.length > 0) {
        combinedMasteries = [
          ...combinedMasteries,
          ...this.props.masteryTactics,
        ];
      } else {
        combinedMasteries = this.props.masteryTactics;
      }
    }
    return combinedMasteries;
  }

  createShareLink() {
    let saveLink = `${window.location.origin}/career/${this.props.slug}/s?`;
    saveLink += `l=${this.props.level}`;
    saveLink += `&r=${this.props.renown}`;
    saveLink += `&tl=${this.props.tacticLimit}`;
    saveLink += `&mp=${this.props.currentPoints}`;
    saveLink += `&pA=${this.props.pathMeterA}`;
    saveLink += `&pB=${this.props.pathMeterB}`;
    saveLink += `&pC=${this.props.pathMeterC}`;
    saveLink += `&m1=${this.props.selectedMorale1}`;
    saveLink += `&m2=${this.props.selectedMorale2}`;
    saveLink += `&m3=${this.props.selectedMorale3}`;
    saveLink += `&m4=${this.props.selectedMorale4}`;
    saveLink += `&ma=${this.props.masteryAbilities}`;
    saveLink += `&mm=${this.props.masteryMorales}`;
    saveLink += `&mt=${this.props.masteryTactics}`;
    saveLink += `&t=${this.props.selectedTactics}`;
    return saveLink;
  }

  clickShare() {
    this.props.toggleOverlay(!this.props.overlay);
    // Set share modal content
    this.props.setSharingLink(this.createShareLink());
    // Open share modal
    this.props.openModal(MODAL_SHARE);
    if (this.props.slug == null || this.props.abilities == null) {
      return;
    }

    const careerName = this.props.careers[this.props.slug].name;
    // Send GA events
    if (this.props.selectedMorale1) {
      gaEvent(
        careerName,
        'Selected Morale 1',
        this.props.abilities.indexed[this.props.selectedMorale1].name,
        this.props.selectedMorale1.toString(),
      );
    }
    if (this.props.selectedMorale2) {
      gaEvent(
        careerName,
        'Selected Morale 2',
        this.props.abilities.indexed[this.props.selectedMorale2].name,
        this.props.selectedMorale2.toString(),
      );
    }
    if (this.props.selectedMorale3) {
      gaEvent(
        careerName,
        'Selected Morale 3',
        this.props.abilities.indexed[this.props.selectedMorale3].name,
        this.props.selectedMorale3.toString(),
      );
    }
    if (this.props.selectedMorale4) {
      gaEvent(
        careerName,
        'Selected Morale 4',
        this.props.abilities.indexed[this.props.selectedMorale4].name,
        this.props.selectedMorale4.toString(),
      );
    }
    if (Number(this.props.selectedTactics.length) > 0) {
      const { abilities } = this.props;
      this.props.selectedTactics.forEach((abilityId) =>
        gaEvent(
          careerName,
          'Selected Tactic',
          abilities.indexed[abilityId].name,
          abilityId.toString(),
        ),
      );
    }
    const combinedMasteries = this.combineMasteries();
    if (Number(combinedMasteries.length) > 0) {
      const { abilities } = this.props;
      combinedMasteries.forEach((abilityId) =>
        gaEvent(
          careerName,
          'Mastery ability',
          abilities.indexed[abilityId].name,
          abilityId.toString(),
        ),
      );
    }
  }

  clickChangeCareer(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    this.props.toggleOverlay(!this.props.overlay);
    this.props.toggleSidebar(!this.props.sidebar);
    gaChangeCareer('ActionButton');
  }

  clickReset(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    // Reset career selections/attributes/abilities
    this.props.resetLevel();
    this.props.resetRenown();
    this.props.resetTacticLimit();
    this.props.resetPoints();
    this.props.resetCurrentPoints();
    this.props.resetSelectedMorale1();
    this.props.resetSelectedMorale2();
    this.props.resetSelectedMorale3();
    this.props.resetSelectedMorale4();
    this.props.resetSelectedTactics();
    this.props.resetMasteryAbilities();
    this.props.resetMasteryMorales();
    this.props.resetMasteryTactics();
    this.props.resetPathMeterA();
    this.props.resetPathMeterB();
    this.props.resetPathMeterC();
  }

  render() {
    if (this.props.abilities == null) {
      return null;
    }
    return (
      <div className={css.container}>
        <button className={css.home} type="button" onClick={this.clickHome}>
          Home
        </button>
        <button className={css.share} type="button" onClick={this.clickShare}>
          Share
          <span className="hidden@mobile"> career</span>
        </button>
        <button
          className={css.change}
          type="button"
          onClick={this.clickChangeCareer}
        >
          Change
          <span className="hidden@mobile"> career</span>
        </button>
        <button className={css.reset} type="button" onClick={this.clickReset}>
          Reset
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionButtons);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import queryString from 'query-string';
import css from '../../css/components/Career.css';
import { calculateMasteryPoints } from '../helpers/points';

import { resetAbilities, fetchAbilities } from '../actions/actionAbilities';
import { fetchCareers } from '../actions/actionCareers';
import { setSlug } from '../actions/actionSlug';
import { resetLevel, setLevel } from '../actions/actionLevel';
import { resetRenown, setRenown } from '../actions/actionRenown';
import { resetTacticLimit, setTacticLimit } from '../actions/actionTacticLimit';
import {
  resetCurrentPoints,
  setCurrentPoints,
} from '../actions/actionCurrentPoints';
import { resetPathMeterA, setPathMeterA } from '../actions/actionPathMeterA';
import { resetPathMeterB, setPathMeterB } from '../actions/actionPathMeterB';
import { resetPathMeterC, setPathMeterC } from '../actions/actionPathMeterC';
import {
  resetMasteryAbilities,
  setMasteryAbilities,
} from '../actions/actionMasteryAbilities';
import {
  resetMasteryMorales,
  setMasteryMorales,
} from '../actions/actionMasteryMorales';
import {
  resetMasteryTactics,
  setMasteryTactics,
} from '../actions/actionMasteryTactics';
import {
  resetSelectedMorale1,
  selectMorale1,
} from '../actions/actionSelectedMorale1';
import {
  resetSelectedMorale2,
  selectMorale2,
} from '../actions/actionSelectedMorale2';
import {
  resetSelectedMorale3,
  selectMorale3,
} from '../actions/actionSelectedMorale3';
import {
  resetSelectedMorale4,
  selectMorale4,
} from '../actions/actionSelectedMorale4';
import {
  resetSelectedTactics,
  setSelectedTactics,
} from '../actions/actionSelectedTactics';
import { resetPoints, setPoints } from '../actions/actionPoints';

import Sidebar from './Sidebar';
import Overlay from './Overlay';
import Breadcrumb from './Breadcrumb';
import Loading from './Loading';
import ModalContainer from './ModalContainer';
import BarXp from './BarXp';
import BarRenown from './BarRenown';
import CareerTitle from './CareerTitle';
import SelectLevel from './SelectLevel';
import SelectRenown from './SelectRenown';
import CoreAbilities from './CoreAbilities';
import CoreMorales from './CoreMorales';
import CoreTactics from './CoreTactics';
import Mastery from './Mastery';
import ActionButtons from './ActionButtons';

class Career extends Component {
  componentDidMount() {
    // Load career data on initial load
    this.loadCareerData(this.props.match);
  }

  componentWillReceiveProps(nextProps) {
    // This will be run when a new career is selected from the Sidebar
    // Manually force the loading of new data
    if (
      this.props.match.params &&
      this.props.match.params.slug != nextProps.match.params.slug
    ) {
      // Check if it's a valid career name
      if (this.props.careers.hasOwnProperty(nextProps.match.params.slug)) {
        // Reset Career data
        this.resetCareer();

        // Load new career/ability data from new career class
        this.loadCareerData(nextProps.match);
      } else {
        // TODO redirect to not found page on else here
        console.warn('CAREER DOES NOT EXIST!');
      }
    }
  }

  // Set state from query params if first path part is /s
  setSavedCareer({ l, r, tl, mp, pA, pB, pC, ma, mm, mt, m1, m2, m3, m4, t }) {
    this.props.setLevel(l);
    this.props.setRenown(r);
    this.props.setPoints(calculateMasteryPoints(l, r));
    this.props.setTacticLimit(tl);
    this.props.setCurrentPoints(mp);
    if (pA) {
      this.props.setPathMeterA(pA);
    }
    if (pB) {
      this.props.setPathMeterB(pB);
    }
    if (pC) {
      this.props.setPathMeterC(pC);
    }
    if (ma) {
      this.props.setMasteryAbilities(ma.split(','));
    }
    if (mm) {
      this.props.setMasteryMorales(mm.split(','));
    }
    if (mt) {
      this.props.setMasteryTactics(mt.split(','));
    }
    if (m1) {
      this.props.selectMorale1(m1);
    }
    if (m2) {
      this.props.selectMorale2(m2);
    }
    if (m3) {
      this.props.selectMorale3(m3);
    }
    if (m4) {
      this.props.selectMorale4(m4);
    }
    if (t) {
      this.props.setSelectedTactics(t.split(','));
    }
  }

  resetCareer() {
    this.props.resetLevel();
    this.props.resetRenown();
    this.props.resetTacticLimit();
    this.props.resetPoints();
    this.props.resetCurrentPoints();
    this.props.resetAbilities();
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

  loadCareerData(match) {
    const slug = match.params.slug;

    // Fetch careers and abilities
    this.props.fetchCareers();
    this.props.fetchAbilities(slug);

    // Populate app state with saved details if they exist
    if (match.params.careerSaved) {
      this.setSavedCareer(queryString.parse(this.props.location.search));
    }

    // Set career slug in app state
    this.props.setSlug(slug);
  }
  renderContent() {
    // Check that all the relative state properties are populated before rendering the Career UI
    let hasCareerLoaded =
      Object.keys(this.props.careers).length > 0 &&
      this.props.slug &&
      Object.keys(this.props.abilities).length > 0;

    if (!hasCareerLoaded) {
      return (
        <div className={css.loadingContainer}>
          <Loading />
        </div>
      );
    }

    return (
      <div className="paddingTop paddingRight paddingLeft paddingBottom">
        <div className="marginBottom--medium">
          <Breadcrumb />
        </div>
        <div className="marginBottom">
          <BarXp />
        </div>
        <div className="marginBottom--medium">
          <BarRenown />
        </div>
        <div className="grid">
          <div className="grid-col-1 grid-col-7-12@sm-min grid-col-10-24@md-min">
            <div className="marginBottom--medium heightTitle">
              <CareerTitle />
            </div>
          </div>
          <div className="grid-col-1-3 grid-col-1-2@mobile grid-col-1-6@sm-min grid-col-1-6@md-min">
            <div className="heightTitle marginBottom--medium marginLeft@sm-min">
              <SelectLevel />
            </div>
          </div>
          <div className="grid-col-2-3 grid-col-1-2@mobile grid-col-1-4@sm-min grid-col-10-24@md-min">
            <div className="heightTitle marginBottom--medium">
              <SelectRenown />
            </div>
          </div>
        </div>
        <div className="grid">
          <div className="grid-col-1 grid-col-10-24@md-min">
            <div className="marginBottom">
              <CoreAbilities />
            </div>

            <div className="marginBottom">
              <CoreMorales />
            </div>

            <div className="marginBottom">
              <CoreTactics />
            </div>
          </div>
          <div className="grid-col-1 grid-col-14-24@md-min">
            <div className="marginLeft@md-min marginBottom">
              <Mastery />
            </div>

            <div className="marginLeft@md-min">
              <ActionButtons history={this.props.history} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const containerClass = classNames({
      [css.wrapper]: !this.props.sidebar,
      [css.wrapperSidebar]: this.props.sidebar,
    });

    return (
      <div className="heightFull">
        <div className={containerClass}>{this.renderContent()}</div>
        <Overlay overlayVisible={true} />
        <Sidebar />
        <ModalContainer />
      </div>
    );
  }
}

function mapStateToProps({
  sidebar,
  abilities,
  careers,
  slug,
  masteryAbilities,
}) {
  return {
    sidebar,
    abilities,
    careers,
    slug,
    masteryAbilities,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchAbilities,
    fetchCareers,
    setSlug,
    setLevel,
    setRenown,
    setTacticLimit,
    setCurrentPoints,
    setPathMeterA,
    setPathMeterB,
    setPathMeterC,
    setMasteryAbilities,
    setMasteryMorales,
    setMasteryTactics,
    selectMorale1,
    selectMorale2,
    selectMorale3,
    selectMorale4,
    setSelectedTactics,
    setPoints,
    resetRenown,
    resetLevel,
    resetTacticLimit,
    resetPoints,
    resetCurrentPoints,
    resetAbilities,
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
  },
)(Career);

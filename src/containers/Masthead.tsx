import { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import css from '../css/components/Masthead.module.css';

import CareerItem from './CareerItem';

import * as actionSidebar from '../actions/actionSidebar';
import * as actionOverlay from '../actions/actionOverlay';
import { State } from '../reducers';

type Props = {
  overlay: boolean;
  sidebar: boolean;
  toggleOverlay: typeof actionOverlay.toggleOverlay;
  toggleSidebar: typeof actionSidebar.toggleSidebar;
  careers: State['careers'];
};

class Masthead extends Component<Props, { mastheadActive: boolean }> {
  constructor(props: Props) {
    super(props);

    this.clickMasthead = this.clickMasthead.bind(this);
    this.clickMastheadMobile = this.clickMastheadMobile.bind(this);

    this.state = {
      mastheadActive: false,
    };
  }

  clickMasthead(
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>,
  ) {
    e.preventDefault();
    this.setState((prevState) => ({
      mastheadActive: !prevState.mastheadActive,
    }));
  }

  clickMastheadMobile(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const { toggleOverlay, toggleSidebar, overlay, sidebar } = this.props;
    e.preventDefault();
    toggleOverlay(!overlay);
    toggleSidebar(!sidebar);
  }

  renderCareers(key: string, faction: string) {
    const { careers } = this.props;
    if (careers[key].race === faction) {
      return (
        <div className={css.careersItem} key={key}>
          <CareerItem career={careers[key]} />
        </div>
      );
    }
    return false;
  }

  render() {
    const { mastheadActive } = this.state;
    const { careers } = this.props;

    const mastheadClass = classNames({
      [css.masthead]: !mastheadActive,
      [css.mastheadActive]: mastheadActive,
    });
    const mastheadTitleClass = classNames({
      [css.mastheadTitle]: !mastheadActive,
      [css.mastheadTitleActive]: mastheadActive,
    });
    const mastheadCtaClass = classNames({
      [css.mastheadCta]: !mastheadActive,
      [css.mastheadCtaActive]: mastheadActive,
      'hidden@mobile': true,
    });
    const mastheadCtaClassMobile = classNames({
      [css.mastheadCta]: !mastheadActive,
      [css.mastheadCtaActive]: mastheadActive,
      'visible@mobile': true,
    });
    const mastheadFooterClass = classNames({
      [css.mastheadFooter]: !mastheadActive,
      [css.mastheadFooterActive]: mastheadActive,
    });
    const careersContainerLeftClass = classNames({
      [css.careersContainerLeft]: !mastheadActive,
      [css.careersContainerLeftActive]: mastheadActive,
    });
    const careersContainerRightClass = classNames({
      [css.careersContainerRight]: !mastheadActive,
      [css.careersContainerRightActive]: mastheadActive,
    });
    return (
      <div className={mastheadClass}>
        <div className={css.mastheadOverlay}>
          <div className={mastheadTitleClass}>RoR Career Builder</div>
          <div className={css.mastheadSubtitle}>
            Online Career Builder for Return of Reckoning
          </div>
          <div className={mastheadCtaClass}>
            <button
              className={css.mastheadCtaButton}
              type="button"
              onClick={this.clickMasthead}
            >
              Select career
            </button>
            <Link className={css.mastheadRenownButton} to="/renown">
              Renown Builder
            </Link>
          </div>
          <div className={mastheadCtaClassMobile}>
            <button
              className={css.mastheadCtaButton}
              type="button"
              onClick={this.clickMastheadMobile}
            >
              Select career
            </button>

            <Link className={css.mastheadRenownButton} to="/renown">
              Renown Builder
            </Link>
          </div>
          <a
            className={mastheadFooterClass}
            href="/"
            onClick={this.clickMasthead}
          >
            Hide careers
          </a>
          <div className={css.careers}>
            <div className={careersContainerLeftClass}>
              <div className={css.careersTitle}>Order</div>
              <div className={css.careersFaction}>
                <div className={css.careersRace}>
                  <div className="row row--v-center marginBottom">
                    <img
                      alt="Dwarf"
                      src="/images/icons/dwarf.png"
                      className={css.careersRaceIcon}
                    />
                    <div className={css.careersRaceTitle}>Dwarves</div>
                  </div>
                  {Object.keys(careers).map((key) =>
                    this.renderCareers(key, 'Dwarf'),
                  )}
                </div>
                <div className={css.careersRace}>
                  <div className="row row--v-center marginBottom">
                    <img
                      alt="High Elf"
                      src="/images/icons/high-elf.png"
                      className={css.careersRaceIcon}
                    />
                    <div className={css.careersRaceTitle}>High Elves</div>
                  </div>
                  {Object.keys(careers).map((key) =>
                    this.renderCareers(key, 'High Elf'),
                  )}
                </div>
                <div className={css.careersRace}>
                  <div className="row row--v-center marginBottom">
                    <img
                      alt="Empire"
                      src="/images/icons/empire.png"
                      className={css.careersRaceIcon}
                    />
                    <div className={css.careersRaceTitle}>Empire</div>
                  </div>
                  {Object.keys(careers).map((key) =>
                    this.renderCareers(key, 'Empire'),
                  )}
                </div>
              </div>
            </div>
            <div className={careersContainerRightClass}>
              <div className={css.careersTitle}>Destruction</div>
              <div className={css.careersFaction}>
                <div className={css.careersRace}>
                  <div className="row row--v-center marginBottom">
                    <img
                      alt="Greenskin"
                      src="/images/icons/greenskin.png"
                      className={css.careersRaceIcon}
                    />
                    <div className={css.careersRaceTitle}>Greenskins</div>
                  </div>
                  {Object.keys(careers).map((key) =>
                    this.renderCareers(key, 'Greenskin'),
                  )}
                </div>
                <div className={css.careersRace}>
                  <div className="row row--v-center marginBottom">
                    <img
                      alt="Dark Elf"
                      src="/images/icons/dark-elf.png"
                      className={css.careersRaceIcon}
                    />
                    <div className={css.careersRaceTitle}>Dark Elves</div>
                  </div>
                  {Object.keys(careers).map((key) =>
                    this.renderCareers(key, 'Dark Elf'),
                  )}
                </div>
                <div className={css.careersRace}>
                  <div className="row row--v-center marginBottom">
                    <img
                      alt="Chaos"
                      src="/images/icons/chaos.png"
                      className={css.careersRaceIcon}
                    />
                    <div className={css.careersRaceTitle}>Chaos</div>
                  </div>
                  {Object.keys(careers).map((key) =>
                    this.renderCareers(key, 'Chaos'),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ careers, sidebar, overlay }: State) {
  return {
    careers,
    sidebar,
    overlay,
  };
}

export default connect(mapStateToProps, {
  toggleSidebar: actionSidebar.toggleSidebar,
  toggleOverlay: actionOverlay.toggleOverlay,
})(Masthead);

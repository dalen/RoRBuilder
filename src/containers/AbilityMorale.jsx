import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import css from '../css/components/AbilityMorale.module.css';

import Popover from '../components/Popover';
import PopoverAbility from '../components/PopoverAbility';

import {
  selectMorale1,
  resetSelectedMorale1,
} from '../actions/actionSelectedMorale1';
import {
  selectMorale2,
  resetSelectedMorale2,
} from '../actions/actionSelectedMorale2';
import {
  selectMorale3,
  resetSelectedMorale3,
} from '../actions/actionSelectedMorale3';
import {
  selectMorale4,
  resetSelectedMorale4,
} from '../actions/actionSelectedMorale4';

class AbilityMorale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      hovered: false,
      selected: false,
    };
    this.hoverOut = this.hoverOut.bind(this);
    this.hoverOver = this.hoverOver.bind(this);
    this.selectMorale = this.selectMorale.bind(this);
  }

  setInitialStatus(
    currentLevel,
    minrank,
    selectedMorale1,
    selectedMorale2,
    selectedMorale3,
    selectedMorale4,
  ) {
    if (Number(currentLevel) >= Number(minrank)) {
      this.setState({ status: true });
    } else {
      this.setState({ status: false });
    }
    switch (this.props.rank) {
      case '1':
        if (selectedMorale1 === this.props.data.id) {
          this.setState({ selected: true });
        } else {
          this.setState({ selected: false });
        }
        break;
      case '2':
        if (selectedMorale2 === this.props.data.id) {
          this.setState({ selected: true });
        } else {
          this.setState({ selected: false });
        }
        break;
      case '3':
        if (selectedMorale3 === this.props.data.id) {
          this.setState({ selected: true });
        } else {
          this.setState({ selected: false });
        }
        break;
      case '4':
        if (selectedMorale4 === this.props.data.id) {
          this.setState({ selected: true });
        } else {
          this.setState({ selected: false });
        }
        break;
      default:
        break;
    }
  }

  hoverOver() {
    this.setState({
      hovered: true,
    });
  }

  hoverOut() {
    this.setState({
      hovered: false,
    });
  }

  selectMorale() {
    if (this.state.status) {
      switch (this.props.rank) {
        case '1':
          if (this.state.selected) {
            this.props.resetSelectedMorale1();
          } else {
            this.props.selectMorale1(this.props.data.id);
          }
          break;
        case '2':
          if (this.state.selected) {
            this.props.resetSelectedMorale2();
          } else {
            this.props.selectMorale2(this.props.data.id);
          }
          break;
        case '3':
          if (this.state.selected) {
            this.props.resetSelectedMorale3();
          } else {
            this.props.selectMorale3(this.props.data.id);
          }
          break;
        case '4':
          if (this.state.selected) {
            this.props.resetSelectedMorale4();
          } else {
            this.props.selectMorale4(this.props.data.id);
          }
          break;
        default:
          break;
      }
    }
  }

  // Initial render
  componentDidMount() {
    this.setInitialStatus(
      this.props.level,
      this.props.data.minrank,
      this.props.selectedMorale1,
      this.props.selectedMorale2,
      this.props.selectedMorale3,
      this.props.selectedMorale4,
    );
  }

  // About to update because parent changed
  componentWillReceiveProps(nextProps) {
    this.setInitialStatus(
      nextProps.level,
      nextProps.data.minrank,
      nextProps.selectedMorale1,
      nextProps.selectedMorale2,
      nextProps.selectedMorale3,
      nextProps.selectedMorale4,
    );
  }

  render() {
    const abilityClass = classNames({
      [css.ability]: true,
      [css.abilitySelected]: this.state.selected,
      'is-hovered': this.state.hovered,
      popover__parent: true,
      'marginRight--small@mobile': true,
    });
    const abilityImageClass = classNames({
      [css.image]: this.state.status,
      [css.imageInactive]: !this.state.status,
    });
    const imgSrc = `../../images/abilities/${this.props.data.image}.png`;
    const popoverContent = (
      <PopoverAbility data={this.props.data} imgSrc={imgSrc} />
    );
    return (
      <div className={abilityClass} ref="popoverParent">
        <img
          className={abilityImageClass}
          src={imgSrc}
          alt={this.props.data.name}
          onMouseOver={this.hoverOver}
          onMouseOut={this.hoverOut}
          onClick={this.selectMorale}
        />
        <Popover
          content={popoverContent}
          alignment="top"
          activate={this.state.hovered}
          abilityOptional={false}
          status={this.state.status}
        />
      </div>
    );
  }
}

function mapStateToProps({
  level,
  selectedMorale1,
  selectedMorale2,
  selectedMorale3,
  selectedMorale4,
}) {
  return {
    level,
    selectedMorale1,
    selectedMorale2,
    selectedMorale3,
    selectedMorale4,
  };
}

export default connect(
  mapStateToProps,
  {
    selectMorale1,
    resetSelectedMorale1,
    selectMorale2,
    resetSelectedMorale2,
    selectMorale3,
    resetSelectedMorale3,
    selectMorale4,
    resetSelectedMorale4,
  },
)(AbilityMorale);

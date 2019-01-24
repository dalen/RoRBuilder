import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import css from '../css/components/AbilityTactic.module.css';

import Popover from '../components/Popover';
import PopoverAbility from '../components/PopoverAbility';

import { selectTactic, deselectTactic } from '../actions/actionSelectedTactics';

class AbilityTactic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      hovered: false,
      selected: false,
    };
    this.hoverOut = this.hoverOut.bind(this);
    this.hoverOver = this.hoverOver.bind(this);
    this.selectTactic = this.selectTactic.bind(this);
  }

  setInitialStatus(currentLevel, minrank, selectedTactics) {
    if (Number(currentLevel) >= Number(minrank)) {
      this.setState({ status: true });
    } else {
      this.setState({ status: false });
    }
    if (selectedTactics.indexOf(this.props.data.id) > -1) {
      this.setState({ selected: true });
    } else {
      this.setState({ selected: false });
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

  selectTactic() {
    if (this.state.status) {
      if (this.state.selected) {
        this.props.deselectTactic(
          this.props.selectedTactics,
          this.props.data.id,
        );
      } else {
        // Check that we are within our tactic limit for the current level
        if (this.props.selectedTactics.length < this.props.tacticLimit) {
          this.props.selectTactic(
            this.props.selectedTactics,
            this.props.data.id,
          );
        }
      }
    }
  }

  // Initial render
  componentDidMount() {
    this.setInitialStatus(
      this.props.level,
      this.props.data.minrank,
      this.props.selectedTactics,
    );
  }

  // About to update because parent changed
  componentWillReceiveProps(nextProps) {
    this.setInitialStatus(
      nextProps.level,
      nextProps.data.minrank,
      nextProps.selectedTactics,
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
          onClick={this.selectTactic}
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

function mapStateToProps({ level, selectedTactics, tacticLimit }) {
  return {
    level,
    selectedTactics,
    tacticLimit,
  };
}

export default connect(
  mapStateToProps,
  {
    selectTactic,
    deselectTactic,
  },
)(AbilityTactic);

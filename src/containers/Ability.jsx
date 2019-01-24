import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import css from '../css/components/Ability.module.css';

import Popover from '../components/Popover';
import PopoverAbility from '../components/PopoverAbility';

class Ability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      hovered: false,
    };
    this.hoverOut = this.hoverOut.bind(this);
    this.hoverOver = this.hoverOver.bind(this);
  }

  setInitialStatus(currentLevel, minrank) {
    if (Number(currentLevel) >= Number(minrank)) {
      this.setState({ status: true });
    } else {
      this.setState({ status: false });
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

  // Initial render
  componentDidMount() {
    this.setInitialStatus(this.props.level, this.props.data.minrank);
  }

  // About to update because parent changed
  componentWillReceiveProps(nextProps) {
    this.setInitialStatus(nextProps.level, nextProps.data.minrank);
  }

  render() {
    const abilityClass = classNames({
      [css.ability]: true,
      'is-hovered': this.state.hovered,
      popover__parent: true,
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

function mapStateToProps({ level }) {
  return {
    level,
  };
}

export default connect(
  mapStateToProps,
  null,
)(Ability);

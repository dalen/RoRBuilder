import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import css from '../css/components/Ability.module.css';

import Popover from '../components/Popover';
import PopoverAbility from '../components/PopoverAbility';
import { State } from '../reducers';

type Props = {
  level: State['level'];
  data: any;
};

class Ability extends Component<
  Props,
  {
    status: boolean;
    hovered: boolean;
  }
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      status: false,
      hovered: false,
    };
    this.hoverOut = this.hoverOut.bind(this);
    this.hoverOver = this.hoverOver.bind(this);
  }

  setInitialStatus(currentLevel: number, minrank: number) {
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
    const { level, data } = this.props;
    this.setInitialStatus(level, data.minrank);
  }

  // About to update because parent changed
  componentWillReceiveProps(nextProps: Props) {
    this.setInitialStatus(nextProps.level, nextProps.data.minrank);
  }

  render() {
    const { status, hovered } = this.state;
    const abilityClass = classNames({
      [css.ability]: true,
      'is-hovered': hovered,
      popover__parent: true,
    });
    const abilityImageClass = classNames({
      [css.image]: status,
      [css.imageInactive]: !status,
    });
    const imgSrc = `../../images/abilities/${this.props.data.image}.png`;
    const popoverContent = (
      <PopoverAbility data={this.props.data} imgSrc={imgSrc} />
    );
    return (
      <div className={abilityClass}>
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
          activate={hovered}
          abilityOptional={false}
          status={status}
        />
      </div>
    );
  }
}

function mapStateToProps({ level }: State) {
  return {
    level,
  };
}

export default connect(mapStateToProps)(Ability);

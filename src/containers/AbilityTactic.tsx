import { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import css from '../css/components/AbilityTactic.module.css';

import Popover from '../components/Popover';
import PopoverAbility from '../components/PopoverAbility';

import { selectTactic, deselectTactic } from '../actions/actionSelectedTactics';

import { State } from '../reducers';
import { Ability } from '../helpers/abilities';

type Props = {
  data: Ability;
  level: State['level'];
  selectedTactics: State['selectedTactics'];
  tacticLimit: State['tacticLimit'];
  selectTactic: typeof selectTactic;
  deselectTactic: typeof deselectTactic;
};

class AbilityTactic extends Component<
  Props,
  { status: boolean; hovered: boolean; selected: boolean }
> {
  constructor(props: Props) {
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

  // Initial render
  componentDidMount() {
    const { level, data, selectedTactics } = this.props;
    this.setInitialStatus(level, Number(data.minrank), selectedTactics);
  }

  // About to update because parent changed
  componentWillReceiveProps({ level, data, selectedTactics }: Props) {
    this.setInitialStatus(level, Number(data.minrank), selectedTactics);
  }

  setInitialStatus(
    currentLevel: number,
    minrank: number,
    selectedTactics: number[],
  ) {
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
      } else if (this.props.selectedTactics.length < this.props.tacticLimit) {
        // Check that we are within our tactic limit for the current level
        this.props.selectTactic(this.props.selectedTactics, this.props.data.id);
      }
    }
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
      <div
        className={abilityClass}
        ref="popoverParent"
        role="button"
        tabIndex={0}
        onMouseOver={this.hoverOver}
        onFocus={this.hoverOver}
        onMouseOut={this.hoverOut}
        onBlur={this.hoverOut}
        onClick={this.selectTactic}
        onKeyPress={this.selectTactic}
      >
        <img
          className={abilityImageClass}
          src={imgSrc}
          alt={this.props.data.name}
        />
        <Popover
          alignment="top"
          activate={this.state.hovered}
          abilityOptional={false}
          status={this.state.status}
        >
          {popoverContent}
        </Popover>
      </div>
    );
  }
}

function mapStateToProps({ level, selectedTactics, tacticLimit }: State) {
  return {
    level,
    selectedTactics,
    tacticLimit,
  };
}

export default connect(mapStateToProps, {
  selectTactic,
  deselectTactic,
})(AbilityTactic);

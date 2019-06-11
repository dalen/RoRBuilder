import React from 'react';
import classNames from 'classnames';
import Popover from './Popover';
import css from '../css/components/PathInfo.module.css';

type Props = {
  pathPopover: {
    primary: string;
    secondary: string;
  };
};
type State = { hovered: boolean };

class PathInfo extends React.Component<Props, State> {
  /*
  infoHovered = info is currently in hover state
  */
  constructor(props: Props) {
    super(props);
    this.hoverOver = this.hoverOver.bind(this);
    this.hoverOut = this.hoverOut.bind(this);

    this.state = {
      hovered: false,
    };
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

  renderPopoverPrimary() {
    const { pathPopover } = this.props;
    if (pathPopover.primary) {
      return <div className={css.popoverPrimary}>{pathPopover.primary}</div>;
    }
    return false;
  }

  renderPopoverSecondary() {
    const { pathPopover } = this.props;
    if (pathPopover.secondary) {
      return (
        <div className={css.popoverSecondary}>{pathPopover.secondary}</div>
      );
    }
    return false;
  }

  renderPopoverContent() {
    return (
      <div>
        {this.renderPopoverPrimary()}
        {this.renderPopoverSecondary()}
      </div>
    );
  }

  render() {
    const { hovered } = this.state;

    const infoClass = classNames({
      'is-hovered': hovered,
      popover__parent: true,
    });
    return (
      <div className={infoClass}>
        <div
          className={css.container}
          onFocus={this.hoverOver}
          onBlur={this.hoverOut}
          onMouseOver={this.hoverOver}
          onMouseOut={this.hoverOut}
        >
          <div className={css.icon}>?</div>
        </div>
        <Popover
          content={this.renderPopoverContent()}
          alignment="top"
          activate={hovered}
        />
      </div>
    );
  }
}

export default PathInfo;

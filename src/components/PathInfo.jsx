import React from 'react';
import classNames from 'classnames';
import Popover from './Popover';
import css from '../css/components/PathInfo.module.css';

class PathInfo extends React.Component {
  /*
  infoHovered = info is currently in hover state
  */
  constructor(props) {
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
    if (this.props.pathPopover.primary) {
      return (
        <div className={css.popoverPrimary}>
          {this.props.pathPopover.primary}
        </div>
      );
    }
    return false;
  }

  renderPopoverSecondary() {
    if (this.props.pathPopover.secondary) {
      return (
        <div className={css.popoverSecondary}>
          {this.props.pathPopover.secondary}
        </div>
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
    const infoClass = classNames({
      'is-hovered': this.state.hovered,
      popover__parent: true,
    });
    return (
      <div className={infoClass} ref="popoverParent">
        <div
          className={css.container}
          onMouseOver={this.hoverOver}
          onMouseOut={this.hoverOut}
        >
          <div className={css.icon}>?</div>
        </div>
        <Popover
          content={this.renderPopoverContent()}
          alignment="top"
          activate={this.state.hovered}
        />
      </div>
    );
  }
}

export default PathInfo;

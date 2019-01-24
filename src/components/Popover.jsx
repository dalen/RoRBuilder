import React from 'react';
import classNames from 'classnames';
import css from '../css/components/Popover.module.css';

class Popover extends React.Component {
  constructor(props) {
    super(props);
    // 'popoverSpacing' is the distance of the Popover from the parent element.
    // Matches 'popoverSpacing' in CSS. Likewise for 'popoverArrowSize'
    this.state = {
      popoverSpacing: 5,
      popoverArrowSize: 10,
      popoverActive: false,
      selectionText: 'Deselect',
    };
    // Bind functions early. More performant. Upgrade to autobind when Babel6 sorts itself out
    this.clickClose = this.clickClose.bind(this);
    this.clickSelection = this.clickSelection.bind(this);
    this.setSelectionText = this.setSelectionText.bind(this);
  }

  componentDidMount() {
    // TODO: Currently statically adding this to <Ability />, feels dirty
    // Set parent element to position:relative (popover is absolutely positioned relative to this)
    // this.refs.popover.parentNode.classList.add = 'c-popover__parent';
  }

  // Controlling hide/show of Popover in local state now. This is so button can also control it as well as ability hover.
  componentWillReceiveProps(nextProps) {
    if (nextProps.activate) {
      this.setState({
        popoverActive: true,
      });
    } else {
      this.setState({
        popoverActive: false,
      });
    }
  }

  componentDidUpdate() {
    const popover = this.refs.popover;
    if (popover) {
      // If popover is activated e.g. hover on parent
      if (this.state.popoverActive) {
        // Test (and store) each alignment to see if Popover will be off-screen
        this.setAlignment(popover, 'top');
        const offScreenTop = this.offScreenCheck(popover);
        this.setAlignment(popover, 'right');
        const offScreenRight = this.offScreenCheck(popover);
        this.setAlignment(popover, 'bottom');
        const offScreenBottom = this.offScreenCheck(popover);
        this.setAlignment(popover, 'left');
        const offScreenLeft = this.offScreenCheck(popover);

        // Set intended alignment of Popover from props
        this.setAlignment(popover, this.props.alignment);

        // If intended alignment is off-screen, try to find an alternative alignment
        if (this.offScreenCheck(popover)) {
          if (
            offScreenTop &&
            offScreenRight &&
            offScreenBottom &&
            offScreenLeft
          ) {
            // Always offscreen, do nothing
          } else {
            // Try top
            if (!offScreenTop) {
              this.setAlignment(popover, 'top');
            } else if (!offScreenRight) {
              // Try right
              this.setAlignment(popover, 'right');
            } else if (!offScreenLeft) {
              // Try left
              this.setAlignment(popover, 'left');
            } else if (!offScreenBottom) {
              // Try bottom
              this.setAlignment(popover, 'bottom');
            }
          }
        }
        // Add .fade class at the end to ensure animation happens after display:block
        popover.classList.add('popover--fade');
      } else {
        popover.classList.remove('popover--fade');
      }
    }
  }

  // Set alignment of Popover
  setAlignment(element, position) {
    const positionClassName = `popover--${position}`;
    const popoverElement = element;
    this.removeClasses(element);
    popoverElement.classList.add(positionClassName);
    this.setVerticalCoords(element, position);
  }

  setVerticalCoords(element, alignment) {
    const popoverElement = element;
    const popoverHeight = popoverElement.offsetHeight;
    const parentHeight = popoverElement.parentNode.offsetHeight;

    // Reset current inline height values
    popoverElement.style.top = 'auto';
    popoverElement.style.bottom = 'auto';

    // .popover.top
    if (alignment === 'top') {
      popoverElement.style.top = `${-popoverHeight -
        this.state.popoverArrowSize -
        this.state.popoverSpacing}px`;
    }

    // .popover.right .popover.left
    if (alignment === 'left' || alignment === 'right') {
      popoverElement.style.top = `${-popoverHeight / 2 + parentHeight / 2}px`;
    }

    // .popover.bottom
    if (alignment === 'bottom') {
      popoverElement.style.bottom = `${-popoverHeight -
        this.state.popoverArrowSize -
        this.state.popoverSpacing}px`;
    }
  }

  // Reset alignment classes on Popover
  removeClasses(element) {
    const popoverElement = element;
    popoverElement.classList.remove('popover--top');
    popoverElement.classList.remove('popover--right');
    popoverElement.classList.remove('popover--bottom');
    popoverElement.classList.remove('popover--left');
  }

  // Check if Popover is currently off-screen
  offScreenCheck(element) {
    const popoverCoords = element.getBoundingClientRect();
    const popoverTop = popoverCoords.top;
    const popoverRight = popoverCoords.right;
    const popoverBottom = popoverCoords.bottom;
    const popoverLeft = popoverCoords.left;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let alignmentCheck = false;

    // Try top
    if (popoverTop < 0) {
      alignmentCheck = true;
    }
    // Try right
    if (popoverRight > viewportWidth) {
      alignmentCheck = true;
    }
    // Try bottom
    if (popoverBottom > viewportHeight) {
      alignmentCheck = true;
    }
    // Try left
    if (popoverLeft < 0) {
      alignmentCheck = true;
    }

    return alignmentCheck;
  }

  clickClose() {
    this.setState({
      popoverActive: false,
    });
  }

  clickSelection() {
    if (this.props.abilityOptional) {
      this.props.abilityClicked();
    }
  }

  setSelectionText() {
    if (this.props.abilityOptional) {
      if (this.props.abilitySelected) {
        return 'Deselect';
      }
      return 'Select';
    }
    return false;
  }

  render() {
    const popoverClass = classNames({
      popover: true,
      'popover--active': this.state.popoverActive,
    });
    const selectionClass = classNames({
      hidden:
        !this.props.abilityOptional ||
        !this.props.status ||
        (!this.props.abilityOperational && !this.props.abilitySelected),
      [css.actionRemove]: this.props.abilitySelected,
      [css.actionAdd]: !this.props.abilitySelected,
    });
    return (
      <div className={popoverClass} ref="popover">
        <div className="popover__arrow" />
        {this.props.content}
        <div className="marginTop--medium popover__footer">
          <button
            className={selectionClass}
            type="button"
            onClick={this.clickSelection}
          >
            {this.setSelectionText()}
          </button>
          <button className={css.close} type="button" onClick={this.clickClose}>
            Close
          </button>
        </div>
      </div>
    );
  }
}

export default Popover;

import React from 'react';
import classNames from 'classnames';
import css from '../css/components/Popover.module.css';

interface Props {
  activate: boolean;
  alignment: string;
  abilityOptional: boolean;
  status: boolean;
  children: JSX.Element;
  abilityOperational: boolean;
  abilitySelected?: boolean;
  abilityClicked?: () => void;
}

interface State {
  popoverSpacing: number;
  popoverArrowSize: number;
  popoverActive: boolean;
}

// Reset alignment classes on Popover
const removeClasses = (element: HTMLDivElement) => {
  const popoverElement = element;
  popoverElement.classList.remove('popover--top');
  popoverElement.classList.remove('popover--right');
  popoverElement.classList.remove('popover--bottom');
  popoverElement.classList.remove('popover--left');
};

// Check if Popover is currently off-screen
const offScreenCheck = (element: HTMLDivElement) => {
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
};

class Popover extends React.Component<Props, State> {
  popover: HTMLDivElement | null = null;

  static defaultProps = {
    abilityOperational: false,
    status: false,
    abilityOptional: false,
  };

  constructor(props: Props) {
    super(props);

    // 'popoverSpacing' is the distance of the Popover from the parent element.
    // Matches 'popoverSpacing' in CSS. Likewise for 'popoverArrowSize'

    this.state = {
      popoverSpacing: 5,
      popoverArrowSize: 10,
      popoverActive: false,
    };

    // Bind functions early. More performant. Upgrade to autobind when Babel6 sorts itself out
    this.clickClose = this.clickClose.bind(this);
    this.clickSelection = this.clickSelection.bind(this);
    this.selectionText = this.selectionText.bind(this);
  }

  componentDidMount() {
    // TODO: Currently statically adding this to <Ability />, feels dirty
    // Set parent element to position:relative (popover is absolutely positioned relative to this)
    // this.refs.popover.parentNode.classList.add = 'c-popover__parent';
  }

  // Controlling hide/show of Popover in local state now. This is so button can also control it as well as ability hover.
  componentWillReceiveProps(nextProps: Props) {
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
    const { popover } = this;
    const { popoverActive } = this.state;
    const { alignment } = this.props;
    if (popover) {
      // If popover is activated e.g. hover on parent
      if (popoverActive) {
        // Test (and store) each alignment to see if Popover will be off-screen
        this.setAlignment(popover, 'top');
        const offScreenTop = offScreenCheck(popover);
        this.setAlignment(popover, 'right');
        const offScreenRight = offScreenCheck(popover);
        this.setAlignment(popover, 'bottom');
        const offScreenBottom = offScreenCheck(popover);
        this.setAlignment(popover, 'left');
        const offScreenLeft = offScreenCheck(popover);

        // Set intended alignment of Popover from props
        this.setAlignment(popover, alignment);

        // If intended alignment is off-screen, try to find an alternative alignment
        if (offScreenCheck(popover)) {
          if (
            offScreenTop &&
            offScreenRight &&
            offScreenBottom &&
            offScreenLeft
          ) {
            // Always offscreen, do nothing
          } else if (!offScreenTop) {
            // Try top
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
        // Add .fade class at the end to ensure animation happens after display:block
        popover.classList.add('popover--fade');
      } else {
        popover.classList.remove('popover--fade');
      }
    }
  }

  // Set alignment of Popover
  setAlignment(element: HTMLDivElement, position: string) {
    const positionClassName = `popover--${position}`;
    const popoverElement = element;
    removeClasses(element);
    popoverElement.classList.add(positionClassName);
    this.setVerticalCoords(element, position);
  }

  setVerticalCoords(element: HTMLDivElement, alignment: string) {
    const popoverElement = element;
    const popoverHeight = popoverElement.offsetHeight;
    const parentHeight = (popoverElement.parentNode as HTMLElement)
      .offsetHeight;

    // Reset current inline height values
    popoverElement.style.top = 'auto';
    popoverElement.style.bottom = 'auto';

    // .popover.top
    if (alignment === 'top') {
      const { popoverArrowSize, popoverSpacing } = this.state;
      popoverElement.style.top = `${
        -popoverHeight - popoverArrowSize - popoverSpacing
      }px`;
    }

    // .popover.right .popover.left
    if (alignment === 'left' || alignment === 'right') {
      popoverElement.style.top = `${-popoverHeight / 2 + parentHeight / 2}px`;
    }

    // .popover.bottom
    if (alignment === 'bottom') {
      const { popoverArrowSize, popoverSpacing } = this.state;
      popoverElement.style.bottom = `${
        -popoverHeight - popoverArrowSize - popoverSpacing
      }px`;
    }
  }

  clickClose() {
    this.setState({
      popoverActive: false,
    });
  }

  clickSelection() {
    const { abilityOptional, abilityClicked } = this.props;
    if (abilityOptional && abilityClicked) {
      abilityClicked();
    }
  }

  selectionText() {
    const { abilityOptional, abilitySelected } = this.props;
    if (abilityOptional) {
      if (abilitySelected) {
        return 'Deselect';
      }
      return 'Select';
    }
    return false;
  }

  render() {
    const { popoverActive } = this.state;
    const {
      abilityOptional,
      status,
      abilityOperational,
      abilitySelected,
      children,
    } = this.props;

    const popoverClass = classNames({
      popover: true,
      'popover--active': popoverActive,
    });
    const selectionClass = classNames({
      hidden:
        !abilityOptional ||
        !status ||
        (!abilityOperational && !abilitySelected),
      [css.actionRemove]: abilitySelected,
      [css.actionAdd]: !abilitySelected,
    });
    return (
      <div
        className={popoverClass}
        ref={(c) => {
          this.popover = c;
        }}
      >
        <div className="popover__arrow" />
        {children}
        <div className="marginTop--medium popover__footer">
          <button
            className={selectionClass}
            type="button"
            onClick={this.clickSelection}
          >
            {this.selectionText()}
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

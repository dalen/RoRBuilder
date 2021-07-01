import { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import css from '../css/components/Overlay.module.css';

import { toggleOverlay } from '../actions/actionOverlay';
import { toggleSidebar } from '../actions/actionSidebar';
import { closeModal } from '../actions/actionModal';
import { State } from '../reducers';

// Overlay is used in a few places. Mainly as background when Sidebar is present, behind modal and behind PopoverAbility.
// props.show = is the Overlay rendered at all
// props.visible = is the Overlay rendered as visible or invisible (invisible is used for Popover background)

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    overlayVisible: boolean;
  };

class Overlay extends Component<Props> {
  constructor(props: Props) {
    super(props);

    this.clickOverlay = this.clickOverlay.bind(this);
  }

  componentDidUpdate() {
    const body = document.querySelector('body');
    if (!body) return;

    if (this.props.overlay) {
      body.classList.add('overflowYHidden');
    } else {
      body.classList.remove('overflowYHidden');
    }
  }

  clickOverlay() {
    this.props.toggleOverlay(!this.props.overlay);
    // Also close sidebar if it's open
    if (this.props.sidebar) {
      this.props.toggleSidebar(!this.props.sidebar);
    }
    // Also close modal if it's open
    if (this.props.modal) {
      this.props.closeModal();
    }
  }

  render() {
    const overlayClass = classNames({
      [css.overlay]: !this.props.overlay,
      [css.overlayActive]: this.props.overlay && this.props.overlayVisible,
      [css.overlayActiveInvisible]:
        this.props.overlay && !this.props.overlayVisible,
    });
    return (
      <div
        role="button"
        aria-label="Popup"
        tabIndex={0}
        className={overlayClass}
        onKeyPress={this.clickOverlay}
        onClick={this.clickOverlay}
      />
    );
  }
}

function mapStateToProps({ overlay, sidebar, modal }: State) {
  return {
    modal,
    sidebar,
    overlay,
  };
}

const mapDispatchToProps = { toggleOverlay, toggleSidebar, closeModal };

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);

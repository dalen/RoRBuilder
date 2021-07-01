import { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import css from '../css/components/Modal.module.css';

import * as actionModal from '../actions/actionModal';
import * as actionOverlay from '../actions/actionOverlay';
import { State } from '../reducers';

function mapStateToProps({ modal }: State) {
  return {
    modal,
  };
}

const mapDispatchToProps = {
  closeModal: actionModal.closeModal,
  toggleOverlay: actionOverlay.toggleOverlay,
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & { children: JSX.Element[] };

class Modal extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.clickClose = this.clickClose.bind(this);
  }

  clickClose(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const { closeModal, toggleOverlay } = this.props;
    e.preventDefault();
    closeModal();
    toggleOverlay(false);
  }

  render() {
    const { children, modal } = this.props;
    const modalClass = classNames({
      [css.modal]: !modal,
      [css.modalVisible]: modal,
    });
    return (
      <div className={modalClass}>
        <div className={css.container}>
          <div className={css.content}>{children}</div>
          <div className={css.footer}>
            <button
              className={css.close}
              type="button"
              onClick={this.clickClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

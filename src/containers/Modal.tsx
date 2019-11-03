import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import css from '../css/components/Modal.module.css';

import { closeModal } from '../actions/actionModal';
import { toggleOverlay } from '../actions/actionOverlay';
import { State } from '../reducers';

type Props = ReturnType<typeof mapStateToProps> & {
  closeModal: typeof closeModal;
  toggleOverlay: typeof toggleOverlay;
};

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

function mapStateToProps({ modal }: State) {
  return {
    modal,
  };
}

export default connect(
  mapStateToProps,
  { closeModal, toggleOverlay },
)(Modal);

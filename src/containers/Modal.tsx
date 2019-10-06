import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import css from '../css/components/Modal.module.css';

import { closeModal } from '../actions/actionModal';
import { toggleOverlay } from '../actions/actionOverlay';
import { State } from '../reducers';

type Props = {
  modal: boolean;
  closeModal: () => void;
  toggleOverlay: typeof toggleOverlay;
};

class Modal extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.clickClose = this.clickClose.bind(this);
  }

  clickClose(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    this.props.closeModal();
    this.props.toggleOverlay(false);
  }

  render() {
    const modalClass = classNames({
      [css.modal]: !this.props.modal,
      [css.modalVisible]: this.props.modal,
    });
    return (
      <div className={modalClass}>
        <div className={css.container}>
          <div className={css.content}>{this.props.children}</div>
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

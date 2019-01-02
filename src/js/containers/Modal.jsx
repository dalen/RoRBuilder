import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import css from '../../css/components/Modal.css';

import { closeModal } from '../actions/actionModal';
import { toggleOverlay } from '../actions/actionOverlay';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.clickClose = this.clickClose.bind(this);
  }

  clickClose(e) {
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

function mapStateToProps({ modal }) {
  return {
    modal,
  };
}

export default connect(
  mapStateToProps,
  { closeModal, toggleOverlay },
)(Modal);

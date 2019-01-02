import React, { Component } from 'react';
import { connect } from 'react-redux';

import ModalShare from './ModalShare';
import { MODAL_SHARE } from '../helpers/modalTypes';

// Map modal types to modal components/containers
// Add/import other modals to this object when/if necessary
const MODAL_COMPONENTS = {};
MODAL_COMPONENTS[MODAL_SHARE] = ModalShare;

class ModalContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.modal) {
      return null;
    }
    const SpecificModal = MODAL_COMPONENTS[this.props.modal];
    return <SpecificModal />;
  }
}

function mapStateToProps({ modal }) {
  return {
    modal,
  };
}

export default connect(
  mapStateToProps,
  null,
)(ModalContainer);

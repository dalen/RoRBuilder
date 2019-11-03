import React from 'react';
import { connect } from 'react-redux';

import ModalShare from './ModalShare';
import { MODAL_SHARE } from '../helpers/modalTypes';

import { State } from '../reducers';

// Map modal types to modal components/containers
// Add/import other modals to this object when/if necessary
const MODAL_COMPONENTS = {
  [MODAL_SHARE]: ModalShare,
};

const ModalContainer = ({ modal }: ReturnType<typeof mapStateToProps>) => {
  if (!modal) {
    return null;
  }
  const SpecificModal = MODAL_COMPONENTS[modal];
  return <SpecificModal />;
};

function mapStateToProps({ modal }: State) {
  return {
    modal,
  };
}

export default connect(mapStateToProps)(ModalContainer);

import { connect } from 'react-redux';

import ModalShareCareer from './ModalShareCareer';
import { MODAL_SHARE } from '../helpers/modalTypes';

import { State } from '../reducers';

function mapStateToProps({ modal }: State) {
  return {
    modal,
  };
}

// Map modal types to modal components/containers
// Add/import other modals to this object when/if necessary
const MODAL_COMPONENTS = {
  [MODAL_SHARE]: ModalShareCareer,
};

const ModalContainer = ({ modal }: ReturnType<typeof mapStateToProps>) => {
  if (!modal) {
    return null;
  }
  const SpecificModal = MODAL_COMPONENTS[modal];
  return <SpecificModal />;
};

export default connect(mapStateToProps)(ModalContainer);

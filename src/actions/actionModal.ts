import { ModalType } from '../helpers/modalTypes';

export const OPEN_MODAL = 'open_modal';
export const CLOSE_MODAL = 'close_modal';

export function openModal(
  modalType: ModalType,
): {
  type: 'open_modal';
  payload: ModalType;
} {
  return {
    type: OPEN_MODAL,
    payload: modalType,
  };
}

export function closeModal(): {
  type: 'close_modal';
  payload: false;
} {
  return {
    type: CLOSE_MODAL,
    payload: false,
  };
}

export type ActionModal =
  | ReturnType<typeof openModal>
  | ReturnType<typeof closeModal>;

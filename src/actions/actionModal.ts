import { ModalType } from '../helpers/modalTypes';

export const OPEN_MODAL = 'open_modal';
export const CLOSE_MODAL = 'close_modal';

export function openModal(modalType: ModalType) {
  return {
    type: OPEN_MODAL,
    payload: modalType,
  } as const;
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
    payload: false,
  } as const;
}

export type ActionModal =
  | ReturnType<typeof openModal>
  | ReturnType<typeof closeModal>;

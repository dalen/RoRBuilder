export const OPEN_MODAL = 'open_modal';
export const CLOSE_MODAL = 'close_modal';

export function openModal(modalType) {
  return {
    type: OPEN_MODAL,
    payload: modalType,
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
    payload: false,
  };
}

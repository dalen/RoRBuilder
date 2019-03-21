export const TOGGLE_OVERLAY = 'toggle_overlay';

export function toggleOverlay(bool: boolean) {
  return {
    type: TOGGLE_OVERLAY,
    payload: bool,
  };
}

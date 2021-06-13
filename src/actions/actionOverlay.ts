export const TOGGLE_OVERLAY = 'toggle_overlay';

export function toggleOverlay(bool: boolean): {
  type: 'toggle_overlay';
  payload: boolean;
} {
  return {
    type: TOGGLE_OVERLAY,
    payload: bool,
  };
}

export type ActionOverlay = ReturnType<typeof toggleOverlay>;

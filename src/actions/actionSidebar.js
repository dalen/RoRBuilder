export const TOGGLE_SIDEBAR = 'toggle_sidebar';

export function toggleSidebar(bool) {
  return {
    type: TOGGLE_SIDEBAR,
    payload: bool,
  };
}

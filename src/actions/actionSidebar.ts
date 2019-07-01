export const TOGGLE_SIDEBAR = 'toggle_sidebar';

export const toggleSidebar = (
  bool: boolean,
): {
  type: 'toggle_sidebar';
  payload: boolean;
} => {
  return {
    type: TOGGLE_SIDEBAR,
    payload: bool,
  };
};

export type ActionSidebar = ReturnType<typeof toggleSidebar>;

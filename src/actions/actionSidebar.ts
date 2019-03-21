export const TOGGLE_SIDEBAR = 'toggle_sidebar';

export const toggleSidebar = (bool: boolean) => {
  return {
    type: TOGGLE_SIDEBAR,
    payload: bool,
  };
};

export type ToggleSidebarAction = ReturnType<typeof toggleSidebar>;

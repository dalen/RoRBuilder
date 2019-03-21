export const SELECT_TACTIC = 'select_tactic';
export const DESELECT_TACTIC = 'deselect_tactic';
export const RESET_SELECTED_TACTICS = 'reset_selected_tactics';
export const SET_SELECTED_TACTICS = 'set_selected_tactics';

export function selectTactic(tacticsArray: number[], tacticId: number) {
  return {
    type: SELECT_TACTIC,
    payload: {
      tacticsArray,
      tacticId,
    },
  };
}

export function deselectTactic(tacticsArray: number[], tacticId: number) {
  return {
    type: DESELECT_TACTIC,
    payload: {
      tacticsArray,
      tacticIndex: tacticsArray.indexOf(tacticId),
    },
  };
}

export function resetSelectedTactics() {
  return {
    type: RESET_SELECTED_TACTICS,
    payload: [],
  };
}

export function setSelectedTactics(tactics: (string | number)[]) {
  // Ensure that values are integers not string (as can happen coming from query string)
  const newArray = tactics.map(abilityId => Number(abilityId));

  return {
    type: SET_SELECTED_TACTICS,
    payload: newArray,
  };
}

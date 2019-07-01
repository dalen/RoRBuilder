export const SELECT_TACTIC = 'select_tactic';
export const DESELECT_TACTIC = 'deselect_tactic';
export const RESET_SELECTED_TACTICS = 'reset_selected_tactics';
export const SET_SELECTED_TACTICS = 'set_selected_tactics';

export function selectTactic(
  tacticsArray: number[],
  tacticId: number,
): {
  type: 'select_tactic';
  payload: {
    tacticsArray: number[];
    tacticId: number;
  };
} {
  return {
    type: SELECT_TACTIC,
    payload: {
      tacticsArray,
      tacticId,
    },
  };
}

export function deselectTactic(
  tacticsArray: number[],
  tacticId: number,
): {
  type: 'deselect_tactic';
  payload: {
    tacticsArray: number[];
    tacticIndex: number;
  };
} {
  return {
    type: DESELECT_TACTIC,
    payload: {
      tacticsArray,
      tacticIndex: tacticsArray.indexOf(tacticId),
    },
  };
}

export function resetSelectedTactics(): {
  type: 'reset_selected_tactics';
  payload: never[];
} {
  return {
    type: RESET_SELECTED_TACTICS,
    payload: [],
  };
}

export function setSelectedTactics(
  tactics: (string | number)[],
): {
  type: 'set_selected_tactics';
  payload: number[];
} {
  // Ensure that values are integers not string (as can happen coming from query string)
  const newArray = tactics.map(abilityId => Number(abilityId));

  return {
    type: SET_SELECTED_TACTICS,
    payload: newArray,
  };
}

export type ActionSelectedTactics =
  | ReturnType<typeof selectTactic>
  | ReturnType<typeof deselectTactic>
  | ReturnType<typeof resetSelectedTactics>
  | ReturnType<typeof setSelectedTactics>;

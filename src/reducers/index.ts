import { combineReducers } from 'redux';
import ReducerCareers from './reducerCareers';
import ReducerSidebar from './reducerSidebar';
import ReducerOverlay from './reducerOverlay';
import ReducerAbilities, {
  Abilities as AbilitiesImport,
} from './reducerAbilities';
import ReducerSlug from './reducerSlug';
import ReducerLevel from './reducerLevel';
import ReducerRenown from './reducerRenown';
import ReducerTacticLimit from './reducerTacticLimit';
import ReducerPoints from './reducerPoints';
import ReducerCurrentPoints from './reducerCurrentPoints';
import ReducerSelectedMorale1 from './reducerSelectedMorale1';
import ReducerSelectedMorale2 from './reducerSelectedMorale2';
import ReducerSelectedMorale3 from './reducerSelectedMorale3';
import ReducerSelectedMorale4 from './reducerSelectedMorale4';
import ReducerSelectedTactics from './reducerSelectedTactics';
import ReducerPathMeterA from './reducerPathMeterA';
import ReducerPathMeterB from './reducerPathMeterB';
import ReducerPathMeterC from './reducerPathMeterC';
import ReducerMasteryAbilities from './reducerMasteryAbilities';
import ReducerMasteryTactics from './reducerMasteryTactics';
import ReducerMasteryMorales from './reducerMasteryMorales';
import ReducerModal from './reducerModal';
import ReducerSharingLink from './reducerSharingLink';
import { ModalType } from '../helpers/modalTypes';

export type Abilities = AbilitiesImport;

export type State = {
  careers: ReturnType<typeof ReducerCareers>;
  abilities: ReturnType<typeof ReducerAbilities>;
  sidebar: boolean;
  overlay: boolean;
  slug: string | null;
  level: number;
  renown: number;
  tacticLimit: number;
  points: number;
  currentPoints: number;
  selectedMorale1: number;
  selectedMorale2: number;
  selectedMorale3: number;
  selectedMorale4: number;
  selectedTactics: number[];
  pathMeterA: number;
  pathMeterB: number;
  pathMeterC: number;
  masteryAbilities: number[];
  masteryTactics: number[];
  masteryMorales: number[];
  modal: ModalType;
  sharingLink: string | null;
};

const rootReducer = combineReducers({
  careers: ReducerCareers,
  abilities: ReducerAbilities,
  sidebar: ReducerSidebar,
  overlay: ReducerOverlay,
  slug: ReducerSlug,
  level: ReducerLevel,
  renown: ReducerRenown,
  tacticLimit: ReducerTacticLimit,
  points: ReducerPoints,
  currentPoints: ReducerCurrentPoints,
  selectedMorale1: ReducerSelectedMorale1,
  selectedMorale2: ReducerSelectedMorale2,
  selectedMorale3: ReducerSelectedMorale3,
  selectedMorale4: ReducerSelectedMorale4,
  selectedTactics: ReducerSelectedTactics,
  pathMeterA: ReducerPathMeterA,
  pathMeterB: ReducerPathMeterB,
  pathMeterC: ReducerPathMeterC,
  masteryAbilities: ReducerMasteryAbilities,
  masteryTactics: ReducerMasteryTactics,
  masteryMorales: ReducerMasteryMorales,
  modal: ReducerModal,
  sharingLink: ReducerSharingLink,
});

export default rootReducer;

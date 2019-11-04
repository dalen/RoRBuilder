import { Reducer } from 'redux';
import _ from 'lodash';
import {
  FETCH_ABILITIES,
  RESET_ABILITIES,
  AbilitiesAction,
} from '../actions/actionAbilities';
import { getAbilityType, Ability, Career } from '../helpers/abilities';

// This is an indexed object of all abilities
// Will make it easy to query an ability when we have only the ability id
function indexedAbilities(abilities: Ability[]) {
  return _.mapKeys(abilities, 'id');
}

function structureAbilities(abilities: Ability[]) {
  const obj: {
    coreAbilities: number[];
    coreMorales1: number[];
    coreMorales2: number[];
    coreMorales3: number[];
    coreMorales4: number[];
    coreTactics: number[];
  } = {
    coreAbilities: [],
    coreMorales1: [],
    coreMorales2: [],
    coreMorales3: [],
    coreMorales4: [],
    coreTactics: [],
  };

  // Extract the core abilities from the raw data into a more structured form
  // Each of the three set of abilities are an array of ability ids (coreAbilities, coreMorales (1-4) and coreTactics)
  for (let i = 0; i < abilities.length; i += 1) {
    const ability = abilities[i];
    ability.abilityType = getAbilityType(ability.category);
    if (ability.spec === 'Core Ability') {
      switch (ability.abilityType) {
        case 'standard':
          obj.coreAbilities.push(ability.id);
          break;
        case 'morale':
          switch (ability.cost) {
            case 'Rank 1 morale':
              obj.coreMorales1.push(ability.id);
              break;
            case 'Rank 2 morale':
              obj.coreMorales2.push(ability.id);
              break;
            case 'Rank 3 morale':
              obj.coreMorales3.push(ability.id);
              break;
            case 'Rank 4 morale':
              obj.coreMorales4.push(ability.id);
              break;
            default:
              break;
          }
          break;
        case 'tactic':
          obj.coreTactics.push(ability.id);
          break;
        default:
          break;
      }
    }
  }

  const indexed = indexedAbilities(abilities);
  const compareAbility = (a: number, b: number) => {
    const aRank = parseInt(indexed[a].minrank, 10);
    const bRank = parseInt(indexed[b].minrank, 10);
    if (aRank < bRank) {
      return -1;
    }
    if (aRank > bRank) {
      return 1;
    }
    // a must be equal to b
    return 0;
  };

  // Sort the abilites by min level
  obj.coreAbilities.sort(compareAbility);
  obj.coreMorales1.sort(compareAbility);
  obj.coreMorales2.sort(compareAbility);
  obj.coreMorales3.sort(compareAbility);
  obj.coreMorales4.sort(compareAbility);
  obj.coreTactics.sort(compareAbility);

  return obj;
}

function formatData(originalObject: Career) {
  const indexed = indexedAbilities(originalObject.data);
  const compareAbility = (a: number, b: number) => {
    const aRank = parseInt(indexed[a].minrank, 10);
    const bRank = parseInt(indexed[b].minrank, 10);
    if (aRank < bRank) {
      return -1;
    }
    if (aRank > bRank) {
      return 1;
    }
    // a must be equal to b
    return 0;
  };

  originalObject.mastery.a.coreAbilities.sort(compareAbility);
  originalObject.mastery.b.coreAbilities.sort(compareAbility);
  originalObject.mastery.c.coreAbilities.sort(compareAbility);

  return {
    mastery: originalObject.mastery,
    structured: structureAbilities(originalObject.data),
    indexed,
  };
}
export type Abilities = ReturnType<typeof formatData>;

const reducer: Reducer<
  ReturnType<typeof formatData> | null,
  AbilitiesAction
> = (state = null, action) => {
  switch (action.type) {
    case FETCH_ABILITIES:
      return formatData(action.payload);
    case RESET_ABILITIES:
      return null;
    default:
      return state;
  }
};

export default reducer;

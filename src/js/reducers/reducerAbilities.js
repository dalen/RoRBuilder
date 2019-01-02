import _ from 'lodash';
import { FETCH_ABILITIES, RESET_ABILITIES } from '../actions/actionAbilities';
import { getAbilityType } from '../helpers/abilities';

function structureAbilities(abilities) {
  const obj = {};
  obj.coreAbilities = [];
  obj.coreMorales1 = [];
  obj.coreMorales2 = [];
  obj.coreMorales3 = [];
  obj.coreMorales4 = [];
  obj.coreTactics = [];

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

  return obj;
}

// This is an indexed object of all abilities
// Will make it easy to query an ability when we have only the ability id
function indexedAbilities(abilities) {
  return _.mapKeys(abilities, 'id');
}

function formatData(originalObject) {
  const newObject = {};
  newObject.mastery = originalObject.mastery;
  newObject.structured = structureAbilities(originalObject.data);
  newObject.indexed = indexedAbilities(originalObject.data);

  return newObject;
}

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_ABILITIES:
      return formatData(action.payload.data);
    case RESET_ABILITIES:
      return action.payload;
    default:
      return state;
  }
}

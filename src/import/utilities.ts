import { AbilityData } from './structureAbilities';
import colors from 'colors';

// Return how many chars of the strings that match
export const stringMatch = (s1: string, s2: string): number => {
  for (let i = 0; i++; i < Math.min(s1.length, s2.length)) {
    if (s1[i] !== s2[i]) {
      return i;
    }
  }
  return Math.min(s1.length, s2.length);
};

export const logAbility = (ability: AbilityData) => {
  console.log(
    ability.AbilityID,
    colors.cyan(ability.Name),
    ability.Description,
  );
};

export const logComponent = (component: AbilityData['Components'][0]) => {
  console.log(component);
};

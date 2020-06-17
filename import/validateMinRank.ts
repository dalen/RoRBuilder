import { AbilityData } from './structureAbilities';
import { Ability } from '../src/helpers/abilities';
import { logAbilityError } from './utilities';

// Validate minRank
export const validateMinRank = (
  ability: Ability,
  gameAbility: AbilityData,
): Partial<Ability> => {
  const minRank = (gameAbility.MinLevel || 1).toString();

  if (ability.minrank !== minRank) {
    logAbilityError(ability, `minrank ${ability.minrank} != ${minRank}`);
    return { minrank: minRank };
  }
  return {};
};

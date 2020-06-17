import { AbilityData } from './structureAbilities';
import { Ability } from '../src/helpers/abilities';
import { logAbilityError } from './utilities';

// Validate range
export const validateRange = (
  ability: Ability,
  gameAbility: AbilityData,
): Partial<Ability> => {
  const range = ((): string => {
    if (gameAbility.Range > 0) {
      if (gameAbility.A44 > 0) {
        return `${gameAbility.A44 / 12} - ${gameAbility.Range / 12}ft range`;
      }
      return `${gameAbility.Range / 12}ft range`;
    }

    return 'Self';
  })();

  if (ability.range !== range) {
    logAbilityError(ability, `Range ${ability.range} != ${range}`);
    return { range };
  }
  return {};
};

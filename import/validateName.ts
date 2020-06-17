import { AbilityData } from './structureAbilities';
import { Ability } from '../src/helpers/abilities';
import { logAbilityError } from './utilities';

export const validateName = (
  ability: Ability,
  gameAbility: AbilityData,
): Partial<Ability> => {
  const name = gameAbility.Name;

  if (ability.name !== name) {
    logAbilityError(ability, `name ${ability.name} != ${name}`);
    return { name };
  }
  return {};
};

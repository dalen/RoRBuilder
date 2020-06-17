import { AbilityData } from './structureAbilities';
import { Ability } from '../src/helpers/abilities';
import { logAbilityError } from './utilities';

// Validate cooldown
export const validateCooldown = (
  ability: Ability,
  gameAbility: AbilityData,
): Partial<Ability> => {
  const cooldown = ((): string => {
    if (gameAbility.Cooldown === 0) {
      return 'No cooldown';
    }

    if (gameAbility.Cooldown > 60 * 1000) {
      return `${gameAbility.Cooldown / (60 * 1000)}m cooldown`;
    }

    return `${gameAbility.Cooldown / 1000}s cooldown`;
  })();

  if (ability.cooldown !== cooldown) {
    logAbilityError(ability, `Cooldown ${ability.cooldown} != ${cooldown}`);
    return { cooldown };
  }
  return {};
};

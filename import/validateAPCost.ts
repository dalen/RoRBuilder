import { AbilityData } from './structureAbilities';
import { Ability } from '../src/helpers/abilities';
import { logAbilityError } from './utilities';
import { AbilityType } from './types';

// Validate AP cost
export const validateAPCost = (
  ability: Ability,
  gameAbility: AbilityData,
): Partial<Ability> => {
  const cost = ((): string => {
    if (gameAbility.AP > 0 && gameAbility.ChannelInterval > 0) {
      return `${Math.round(
        gameAbility.AP / (gameAbility.ChannelInterval / 1000),
      )} Action Points / Sec`;
    }

    if (gameAbility.AP > 0) {
      return `${gameAbility.AP} Action Points`;
    }

    if (gameAbility.AbilityType === AbilityType.TACTIC) {
      return 'Tactic';
    }

    if (gameAbility.AbilityType == AbilityType.MORALE) {
      return `Rank ${gameAbility.MoraleLevel} morale`;
    }

    return 'No AP Cost';
  })();

  if (ability.cost !== cost) {
    logAbilityError(ability, `cost ${ability.cost} != ${cost}`);
    return { cost };
  }
  return {};
};

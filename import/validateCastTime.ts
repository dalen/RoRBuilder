import { AbilityData } from './structureAbilities';
import { Ability } from '../src/helpers/abilities';
import { AbilityType, AbilityFlags } from './types';
import { logAbilityError } from './utilities';

// Validate Cast Time
export const validateCastTime = (
  ability: Ability,
  gameAbility: AbilityData,
): Partial<Ability> => {
  const castTime = ((): string => {
    if (
      gameAbility.Castime === 0 &&
      (gameAbility.AbilityType === AbilityType.PASSIVE ||
        gameAbility.AbilityType === AbilityType.TACTIC)
    ) {
      return 'Passive';
    }

    const msCastTime = ((): number => {
      if (gameAbility.Castime > 0) {
        return gameAbility.Castime;
      }

      // Firball Barrage seems to have a 60m duration component though !?!
      // So filter that out
      if (gameAbility.Flags & AbilityFlags.CHANNEL) {
        return Math.max(
          ...gameAbility.Components.map(c => c.Duration).filter(d => d < 30000),
        );
      }

      return gameAbility.Castime;
    })();

    if (msCastTime === 0) {
      return 'Instant cast';
    }
    if (msCastTime >= 60000) {
      return `${msCastTime / 60000}m cast`;
    }

    if (msCastTime < 10000) {
      return `${(msCastTime / 1000).toFixed(1)}s cast`;
    }

    return `${msCastTime / 1000}s cast`;
  })();

  if (ability.incant !== castTime) {
    logAbilityError(ability, `incant ${ability.incant} != ${castTime}`);

    return { incant: castTime };
  }

  return {};
};

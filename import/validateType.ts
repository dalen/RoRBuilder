import { AbilityData } from './structureAbilities';
import { Ability } from '../src/helpers/abilities';
import { logAbilityError } from './utilities';
import { AbilityFlags } from './types';

const getType = (gameAbility: AbilityData): Partial<Ability> => {
  // From abilityline_to_bufftype.csv
  if (gameAbility.Groups.includes(1001)) return { type: 'Hex' };
  if (gameAbility.Groups.includes(1002)) return { type: 'Curse' };
  if (gameAbility.Groups.includes(1003)) return { type: 'Cripple' };
  if (gameAbility.Groups.includes(1004)) return { type: 'Ailment' };
  if (gameAbility.Groups.includes(1005)) return { type: 'Bolster' };
  if (gameAbility.Groups.includes(1006)) return { type: 'Augmentation' };
  if (gameAbility.Groups.includes(1007)) return { type: 'Blessing' };
  if (gameAbility.Groups.includes(1008)) return { type: 'Enchantment' };

  if (gameAbility.Flags & AbilityFlags.FLAG4) return { type: 'Damaging' };
  if (gameAbility.Flags & AbilityFlags.FLAG5) return { type: 'Healing' };
  if (gameAbility.Flags & AbilityFlags.FLAG3) return { type: 'Debuff' };
  if (gameAbility.Flags & AbilityFlags.FLAG2) return { type: 'Buff' };
  if (gameAbility.Flags & AbilityFlags.FLAG6) return { type: 'Defensive' };

  return { type: 'Unknown' };
};

// Validate type
export const validateType = (
  ability: Ability,
  gameAbility: AbilityData,
): Partial<Ability> => {
  const type = getType(gameAbility);

  if (type.type !== ability.type) {
    logAbilityError(
      ability,
      `Type ${ability.type} != ${type.type} (${gameAbility.Flags.toString(2)})`,
    );
  }

  // From abilityline_to_bufftype.csv
  if (gameAbility.Groups.includes(1001)) return { type: 'Hex' };
  if (gameAbility.Groups.includes(1002)) return { type: 'Curse' };
  if (gameAbility.Groups.includes(1003)) return { type: 'Cripple' };
  if (gameAbility.Groups.includes(1004)) return { type: 'Ailment' };
  if (gameAbility.Groups.includes(1005)) return { type: 'Bolster' };
  if (gameAbility.Groups.includes(1006)) return { type: 'Augmentation' };
  if (gameAbility.Groups.includes(1007)) return { type: 'Blessing' };
  if (gameAbility.Groups.includes(1008)) return { type: 'Enchantment' };

  if (gameAbility.Flags & AbilityFlags.FLAG4) return { type: 'Damaging' };
  if (gameAbility.Flags & AbilityFlags.FLAG5) return { type: 'Healing' };
  if (gameAbility.Flags & AbilityFlags.FLAG3) return { type: 'Debuff' };
  if (gameAbility.Flags & AbilityFlags.FLAG2) return { type: 'Buff' };
  if (gameAbility.Flags & AbilityFlags.FLAG6) return { type: 'Defensive' };

  return { type: 'Unknown' };
};

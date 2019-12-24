import colors from 'colors';

import { Ability } from '../helpers/abilities';
import { AbilityData } from './structureAbilities';
import { AbilityFlags, CareerLine } from './types';

export const validateNote = (
  ability: Ability,
  gameAbility: AbilityData,
): Partial<Ability> => {
  const note = gameAbility.LabelTexts.join('<br>');

  if (ability.note !== note) {
    console.log(
      ability.name,
      colors.blue(ability.note),
      '!=',
      colors.red(note),
    );
    console.log(gameAbility.Labels);
    return { note };
  }

  return {};
};

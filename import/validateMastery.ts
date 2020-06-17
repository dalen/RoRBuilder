import { AbilityData } from './structureAbilities';
import { Career, Ability } from '../src/helpers/abilities';
import { logAbilityError } from './utilities';

// Validate mastery
export const validateMastery = (
  ability: Ability,
  gameAbility: AbilityData,
  career: Career,
) => {
  const spec = ((): string => {
    if (gameAbility.Specialization === 0) {
      return 'Core Ability';
    }
    if (gameAbility.Specialization === 1) {
      return career.mastery.a.name;
    }
    if (gameAbility.Specialization === 2) {
      return career.mastery.b.name;
    }
    if (gameAbility.Specialization === 3) {
      return career.mastery.c.name;
    }
    throw new Error(
      `Unknown Specialization ${gameAbility.Specialization}, ability ${gameAbility.AbilityID}`,
    );
  })();

  if (ability.spec !== spec) {
    logAbilityError(ability, `spec ${ability.spec} != ${spec}`);
    return { spec };
  }
  return {};
};

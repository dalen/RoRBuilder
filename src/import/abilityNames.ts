import { readTextFile } from './readTextFile';

export const readAbilityNames = async () => {
  return readTextFile('data/abilitynames.txt', 'utf16be');
};

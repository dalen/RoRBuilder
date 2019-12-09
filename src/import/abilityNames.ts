import { promises as fs } from 'fs';
import iconv from 'iconv-lite';

export const readAbilityNames = async () => {
  const abilityNames: { [key: number]: string } = Object.fromEntries(
    iconv
      .decode(
        await fs.readFile('data/abilitynames.txt', {
          flag: 'r',
        }),
        'utf16be',
      )
      .split('\r\n')
      .map(line => Array.from(line.trim().matchAll(/(\d+)\s+(.*)\^n/)).flat(1))
      .filter(ability => ability.length > 0) // Skip lines that didn't match regexp
      .map(ability => [Number(ability[1]), ability[2]]),
  );

  return abilityNames;
};

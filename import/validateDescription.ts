import colors from 'colors';

import { Ability } from '../src/helpers/abilities';
import { AbilityData } from './structureAbilities';

export const escapeRegExp = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};

// From a description, extract an array of all the replacements needed
export const extractComponentValueNames = (description: string): string[] => {
  const regexp = /\{([A-Z\d_]+)\}/g;

  return Array.from(description.matchAll(regexp)).map((m) => m[1]);
};

export const descriptionRegexp = (description: string): string => {
  return extractComponentValueNames(description).reduce((ret, val): string => {
    return ret
      .replace(`\\{${val}\\}`, '(.*)')
      .replace(/  +/g, '\\s+')
      .replace('<BR>', '<br>');
  }, escapeRegExp(description));
};

// Create the map of componentValues based on old description
export const extractComponentValues = (
  ability: Ability,
  gameAbility: AbilityData,
): Partial<Ability> => {
  const componentValueNames = extractComponentValueNames(
    gameAbility.Description,
  );
  const matches = Array.from(
    ability.description.matchAll(
      new RegExp(descriptionRegexp(gameAbility.Description)),
    ),
  );

  if (matches.length > 0) {
    const componentValues = Object.fromEntries(
      componentValueNames.map((compValue, index) => {
        const num = matches[0][1 + index].match(/(\d+)/);
        return [compValue, Number(num ? num[0] : '0')];
      }),
    );

    return { rawDescription: gameAbility.Description, componentValues };
  } else {
    console.log(
      `No match for ${colors.cyan(ability.name)} (${colors.red(
        gameAbility.AbilityID.toString(),
      )})`,
    );
    console.log(colors.yellow(ability.description));
    console.log(gameAbility.Description);
    console.log(colors.gray(descriptionRegexp(gameAbility.Description)));
    return {
      rawDescription: gameAbility.Description,
      componentValues: Object.fromEntries(
        componentValueNames.map((compValue) => [compValue, 0]),
      ),
    };
  }
  return {};
};

// Convert something like COM_0_VAL0_DAMAGE, 100 to '100 health'
const componentValueToText = (name: string, number: number): string => {
  if (name.endsWith('_DAMAGE')) {
    return `${number} damage`;
  } else if (name.endsWith('_TOD_SPIRITDAMAGE')) {
    return `${number} Spirit damage`;
  } else if (name.endsWith('_SPIRITDAMAGE')) {
    return `${number} Spirit damage`;
  } else if (name.endsWith('_TOD_CORPOREALDAMAGE')) {
    return `${number} Corporeal damage`;
  } else if (name.endsWith('_CORPOREALDAMAGE')) {
    return `${number} Corporeal damage`;
  } else if (name.endsWith('_TOD_ELEMENTALDAMAGE')) {
    return `${number} Elemental damage`;
  } else if (name.endsWith('_ELEMENTALDAMAGE')) {
    return `${number} Elemental damage`;
  } else if (name.endsWith('_DURA_SECONDS')) {
    return `${number} seconds`;
  } else if (name.endsWith('_FREQ_SECONDS')) {
    return `${number} seconds`;
  } else if (name.endsWith('_SECONDS')) {
    return `${number} seconds`;
  } else if (name.endsWith('_DURA_MINUTES')) {
    return `${number} minutes`;
  } else if (name.endsWith('_DURA_HOURS')) {
    return `${number} hours`;
  } else if (name.endsWith('_RADI_FEET')) {
    return `${number} feet`;
  } else if (name.endsWith('_ACTIONPOINTS')) {
    return `${number} Action Points`;
  } else if (name.endsWith('_HEALTH')) {
    return `${number} health`;
  }

  return number.toString();
};

export const validateDescription = (
  ability: Ability,
  gameAbility: AbilityData,
): Partial<Ability> => {
  const componentValues = ability.componentValues;

  if (
    componentValues === undefined ||
    (componentValues && Object.values(componentValues).includes(0))
  ) {
    console.log(
      `Missing componentValues for ${colors.cyan(ability.name)} (${colors.red(
        gameAbility.AbilityID.toString(),
      )})`,
    );
    return {
      rawDescription: gameAbility.Description,
    };
  }

  const componentValueNames = extractComponentValueNames(
    gameAbility.Description,
  );

  if (
    Array.from(new Set(componentValueNames)).sort().toString() !==
    Object.keys(componentValues).sort().toString()
  ) {
    console.log(
      `componentValues mismatch for ${colors.cyan(ability.name)} (${colors.red(
        gameAbility.AbilityID.toString(),
      )}) expected:`,
      componentValueNames,
    );
    return {
      rawDescription: gameAbility.Description,
    };
  }

  const description = componentValueNames.reduce((ret, name) => {
    return ret.replace(
      `{${name}}`,
      componentValueToText(name, componentValues[name] || 0),
    );
  }, gameAbility.Description);

  if (ability.description !== description) {
    console.log(
      `Description for ${colors.cyan(ability.name)} (${colors.red(
        gameAbility.AbilityID.toString(),
      )})`,
    );
    console.log(colors.red('From:'), ability.description);
    console.log(colors.green('To:'), description);
    return {
      description,
      rawDescription: gameAbility.Description,
    };
  }
  return {
    rawDescription: gameAbility.Description,
  };
};

/*
const calculateDamage = (
  ability: AbilityData,
  component: AbilityData['Components'][0],
  valIndex: number,
  level: number,
  effectiveLevel: number,
  mastery: number,
  staticLevel: number,
) => {
  const multIndex = 0;
  let num1 = 1;
  if (component.Interval > 0) {
    num1 = component.Duration / component.Interval;
  }
  let num2 = level;
  if (level != effectiveLevel) {
    let num3 = effectiveLevel <= 25 ? effectiveLevel : 25;
    if (effectiveLevel > 40) {
      num3 += effectiveLevel - 40;
    } else if (level < 25) {
      num3 = effectiveLevel;
    }
    num2 = num3 + mastery;
  }
  level = num2;
  if (staticLevel > 0) {
    num2 = staticLevel;
    level = staticLevel;
  }
  let num4 = component.Values[valIndex];
  let multiplier = component.Multipliers[multIndex];
  let num5 = 0.166667;
  let num6 = 1;
  let num7 = 3;
  if (component.Operation == ComponentOP.STAT_CHANGE) {
    num5 = 1;
  }
  if (component.Duration > 0 && component.Interval > 0) {
    num6 = component.Duration / component.Interval;
  }
  //num7 = component.OperationFlags;
  //if (ability.Components[compIndex].OperationFlags == 32)
  if (component.OperationFlags == 32) {
    return num4;
  }
  let num8 = (((num2 - 1) * num5 * num4 + num4) * multiplier) / 100;
  if (num6 > 1 && ability.ChannelInterval <= 0) num8 *= num6;
  return num8;
};

*/

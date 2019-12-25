import colors from 'colors';

import { Ability } from '../helpers/abilities';
import { AbilityData } from './structureAbilities';
import { AbilityFlags, CareerLine, ComponentOP } from './types';

export const getAbilityID = (componentString: string): void | number => {
  const match = Array.from(componentString.matchAll(/^ABIL_(\d+)_.*/)).flat(1);
  if (match.length > 0) {
    return Number(match[1]);
  }
};

export const getComponentIndices = (componentString: string): number[] => {
  return Array.from(componentString.matchAll(/COM_(\d+)_/g)).map(m =>
    Number(m[1]),
  );
};

export const getValueIndices = (componentString: string): number[] => {
  return Array.from(componentString.matchAll(/COM_\d+_VAL(\d+)/g)).map(m =>
    Number(m[1]),
  );
};

// Values should have been extracted as signed...
const getValue = (
  component: AbilityData['Components'][0],
  valueIndex: number,
) => {
  if (component.Values[valueIndex] > Math.pow(2, 15)) {
    return component.Values[valueIndex] - Math.pow(2, 16);
  }
  return component.Values[valueIndex];
};

const calculateValue = (
  component: AbilityData['Components'][0],
  valueIndex: number,
): number | void => {
  switch (component.Operation) {
    case ComponentOP.DAMAGE_CHANGE_PCT:
      return Math.abs(component.Values[valueIndex]);
    case ComponentOP.AP_CHANGE:
      return Math.abs(component.Values[valueIndex]);
    case ComponentOP.MOVEMENT_SPEED:
      return Math.abs(component.Values[valueIndex]);
    case ComponentOP.MECHANIC_CHANGE:
      return Math.abs(component.Values[valueIndex + 1]);
    case ComponentOP.DEFENSIVE_STAT_CHANGE:
      return Math.abs(component.Values[valueIndex]);
    case ComponentOP.AP_REGEN_CHANGE:
      return Math.abs(component.Values[valueIndex]);
    case ComponentOP.MORALE_CHANGE:
      return Math.abs(component.Values[valueIndex]);
    case ComponentOP.COOLDOWN_CHANGE:
      return Math.abs(component.Values[valueIndex]);
    case ComponentOP.CASTIME_CHANGE:
      return Math.abs(component.Values[valueIndex]);
    case ComponentOP.BONUS_TYPE:
      if (valueIndex === 0) {
        return Math.abs(component.Values[valueIndex]);
      }
      return Math.abs(component.Values[valueIndex + 1]);
    case ComponentOP.CAREER_RESOURCE:
      return Math.abs(component.Values[valueIndex]);
  }
};

const validateComponentValue = (
  name: string,
  number: number,
  gameAbility: AbilityData,
  abilityData: {
    [key: number]: AbilityData;
  },
): number => {
  // Ability refered might be different than current one
  const ability = abilityData[getAbilityID(name) || gameAbility.AbilityID];
  const componentIndices = getComponentIndices(name);

  if (componentIndices.length !== 1) {
    // Don't know how to handle stuff like COM_1_VAL0_COM_0_DURA_SECONDS yet
    return number;
  }

  const component = ability.Components[componentIndices[0]];

  const valueIndex = getValueIndices(name)[0];

  if (component === undefined) {
    console.log(
      `Can't find component for ${colors.cyan(
        name,
      )} Component ID: ${colors.yellow(
        componentIndices[0].toString(),
      )} for ${colors.cyan(ability.Name)} (${colors.red(
        ability.AbilityID.toString(),
      )})`,
    );
    return number;
  }

  const num = (() => {
    if (name.endsWith('_DAMAGE')) {
      return number;
    } else if (name.endsWith('_TOD_SPIRITDAMAGE')) {
      return number;
    } else if (name.endsWith('_SPIRITDAMAGE')) {
      return number;
    } else if (name.endsWith('_TOD_CORPOREALDAMAGE')) {
      return number;
    } else if (name.endsWith('_CORPOREALDAMAGE')) {
      return number;
    } else if (name.endsWith('_TOD_ELEMENTALDAMAGE')) {
      return number;
    } else if (name.endsWith('_ELEMENTALDAMAGE')) {
      return number;
    } else if (name.endsWith('_DURA_SECONDS')) {
      return component.Duration / 1000;
    } else if (name.endsWith('_DURA_MINUTES')) {
      return component.Duration / 1000 / 60;
    } else if (name.endsWith('_FREQ_SECONDS')) {
      return component.Interval / 1000;
    } else if (name.endsWith('_SECONDS')) {
      return number;
    } else if (name.endsWith('_RADI_FEET')) {
      // The 10 extra feet seems consistent
      return Math.round(component.Radius / 12 + 10);
    } else if (name.endsWith('_ACTIONPOINTS')) {
      return number;
    } else if (name.endsWith('_HEALTH')) {
      return number;
    } else if (name.endsWith('_TOD')) {
      return number;
    }

    if (
      !calculateValue(component, valueIndex) &&
      number > 0 &&
      ![1, 2, 3, 5].includes(component.Operation)
    ) {
      console.log(
        'Failed to calculate:',
        'name',
        colors.cyan(name),
        'operation',
        component.Operation,
        'number:',
        number,
        'values',
        component.Values,
      );
      // console.log(component);
    }
    return calculateValue(component, valueIndex) || number;
  })();

  if (num !== number) {
    console.log(
      `${colors.cyan(gameAbility.Name)} (${colors.red(
        gameAbility.AbilityID.toString(),
      )}): Component value for ${colors.red(name)}: was ${colors.yellow(
        number.toString(),
      )} now ${colors.yellow(num.toString())}`,
    );
    // console.log(component);
  }
  return num;
};

export const validateComponentValues = (
  ability: Ability,
  gameAbility: AbilityData,
  abilityData: {
    [key: number]: AbilityData;
  },
): Partial<Ability> => {
  const componentValues = ability.componentValues;
  if (componentValues === undefined) {
    return {};
  }

  return {
    componentValues: Object.fromEntries(
      Object.entries(componentValues).map(([name, number]) => {
        return [
          name,
          validateComponentValue(name, number, gameAbility, abilityData),
        ];
      }),
    ),
  };
};

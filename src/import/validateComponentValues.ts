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

const calculateValue = (
  component: AbilityData['Components'][0],
  valueIndex: number,
  abilityLevel: number,
): number | void => {
  const calcWithMultiplier = (): number => {
    if (component.A15 === 4) {
      // It seems A15 == 4 means it is a static value
      return Math.abs(component.Values[valueIndex]);
    }
    return Math.floor(
      Math.abs(
        (component.Values[valueIndex] *
          abilityLevel *
          component.Multipliers[0]) /
          100,
      ),
    );
  };

  switch (component.Operation) {
    case ComponentOP.DAMAGE:
      return;
    case ComponentOP.STAT_CHANGE:
      return calcWithMultiplier();
    case ComponentOP.DAMAGE_CHANGE_PCT:
      return Math.abs(component.Values[valueIndex]);
    case ComponentOP.ARMOR_CHANGE_PCT:
      return calcWithMultiplier();
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

// Get the component we should calculate on
const getComponent = (
  ability: AbilityData,
  abilityData: {
    [key: number]: AbilityData;
  },
  componentIndices: number[],
  valueIndices: number[],
): [AbilityData['Components'][0], number] | [] => {
  if (componentIndices.length > 1) {
    // We got something like `COM_1_VAL0_COM_0_VAL1`
    if (
      ability.Components[componentIndices[0]].Operation ===
      ComponentOP.LINKED_ABILITY
    ) {
      return getComponent(
        abilityData[
          ability.Components[componentIndices[0]].Values[valueIndices[0]]
        ],
        abilityData,
        componentIndices.slice(1),
        valueIndices.slice(1),
      );
    }
    // Something odd we don't know how to handle yet
    console.log(
      `Ability: ${colors.green(ability.Name)} (${
        ability.AbilityID
      }) Unhandled ${componentIndices} ${valueIndices} ${
        ability.Components[componentIndices[0]].Operation
      }`,
    );
    return [];
  }
  return [ability.Components[componentIndices[0]], valueIndices[0]];
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
  const valueIndices = getValueIndices(name);

  const [component, valueIndex] = getComponent(
    ability,
    abilityData,
    componentIndices,
    valueIndices,
  );

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
    } else if (name.endsWith('_DURA_HOURS')) {
      return component.Duration / 1000 / 60 / 60;
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

    if (valueIndex === undefined) {
      console.log(
        'valueIndex is undefined for',
        'name',
        colors.cyan(name),
        'operation',
        component.Operation,
        'number:',
        number,
        'values',
        component.Values,
      );
      return number;
    }

    // At lvl 40 with no mastery abilityLevel will be 40 for core abilities and
    // 25 for mastery abilities.
    const abilityLevel = gameAbility.Specialization === 0 ? 40 : 25;

    if (
      !calculateValue(component, valueIndex, abilityLevel) &&
      number > 0 &&
      ![1, 3].includes(component.Operation)
    ) {
      console.log(
        'Failed to calculate:',
        'name',
        colors.cyan(name),
        'operation',
        component.Operation,
        'specialization',
        gameAbility.Specialization,
        'number:',
        number,
        'values',
        component.Values,
        'multipliers',
        component.Multipliers,
      );
      // console.log(component);
    }
    return calculateValue(component, valueIndex, abilityLevel) || number;
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

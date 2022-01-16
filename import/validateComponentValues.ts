import colors from 'colors';

import { Ability } from '../src/helpers/abilities';
import { AbilityData } from './structureAbilities';
import { extractComponentValueNames } from './validateDescription';
import {
  ComponentOP,
  Stats,
  AttackType,
  EComponentFlags as ComponentOperationFlags,
  ComponentComponentFlags,
} from './types';
import { Component } from './abilityComponents';

export const getAbilityID = (componentString: string): void | number => {
  const match = Array.from(componentString.matchAll(/^ABIL_(\d+)_.*/g)).flat(1);
  if (match.length > 0) {
    return Number(match[1]);
  }
};

export const getComponentIndices = (componentString: string): number[] => {
  return Array.from(componentString.matchAll(/COM_(\d+)_/g)).map((m) =>
    Number(m[1]),
  );
};

export const getValueIndices = (componentString: string): number[] => {
  return Array.from(componentString.matchAll(/COM_\d+_VAL(\d+)/g)).map((m) =>
    Number(m[1]),
  );
};

// Calculate damage value without stat contribution
const calculateDamage = (
  ability: AbilityData,
  component: AbilityData['Components'][0],
  valueIndex: number,
  abilityLevel: number,
  tod: boolean,
) => {
  const multIndex = 0;
  const intervalNumber =
    component.Duration > 0 && component.Interval > 0
      ? Math.floor(component.Duration / component.Interval) +
        (component.ComponentFlags & ComponentComponentFlags.NO_FINAL_TICK
          ? 0
          : 1)
      : 1;

  const baseValue = component.Values[valueIndex];
  const multiplier = component.Multipliers[multIndex];
  let baseMultiplier =
    component.Operation === ComponentOP.STAT_CHANGE ? 1 : 0.166667;

  // This seems to be mostly Alter Fate heal component
  const adjustedLevel = ability.ScalingFlags == 0 ? 1 : abilityLevel;

  const result = Math.floor(
    (((adjustedLevel - 1) * baseMultiplier * baseValue +
      Math.floor(baseValue)) *
      Math.floor(multiplier)) /
      100,
  );

  if (component.OperationFlags == 32) {
    return baseValue;
  }

  if (tod) {
    /*
    // Some abilities should return this, but unknown why exactly
    if (
      component.Operation == ComponentOP.HEAL &&
      ability.AttackType == AttackType.GENERIC
    ) {
      return ((baseValue * multiplier) / 100) * intervalNumber;
    }
    */

    if (
      component.Duration == 0 &&
      component.Interval == 0 &&
      ability.ChannelInterval == 0
    ) {
      return result;
    }

    return result * intervalNumber;
  }

  return result;
};

// Calculate the contribution from stats
const calculateStatContribution = (
  ability: AbilityData,
  component: AbilityData['Components'][0],
  stats: Stats,
  operation: number,
  tod: boolean,
): number => {
  if (
    component.OperationFlags & ComponentOperationFlags.NO_STAT_CONTRIBUTION ||
    component.OperationFlags & ComponentOperationFlags.FLAG2
  ) {
    return 0;
  }

  // ScaleStateMult = 0 seems to mean this value instead in fact
  const defaultScaleStat = 150;

  const intervalNumber =
    component.Duration > 0 && component.Interval > 0
      ? Math.floor(component.Duration / component.Interval) +
        (component.ComponentFlags & ComponentComponentFlags.NO_FINAL_TICK
          ? 0
          : 1)
      : 1;

  const stat = (() => {
    if (operation === ComponentOP.HEAL) {
      return stats.willpower;
    }
    switch (ability.AttackType) {
      case AttackType.MELEE:
        return stats.strength;
      case AttackType.RANGED:
        return stats.ballisticSkill;
      case AttackType.MAGIC:
        return stats.intelligence;
    }
    return 0;
  })();

  const result = Math.round(
    (stat * (ability.ScaleStatMult || defaultScaleStat)) / 100 / 5,
  );

  if (tod) {
    if (
      component.Duration == 0 &&
      component.Interval == 0 &&
      ability.ChannelInterval == 0
    ) {
      return result;
    }

    return result * intervalNumber;
  }

  return result;
};

const calculateValue = (
  ability: AbilityData,
  component: AbilityData['Components'][0],
  valueIndex: number,
  abilityLevel: number,
  stats: Stats,
  tod: boolean = false, // Total over Duration?
): number | void => {
  const calcWithMultiplier = (
    level: number,
    valueIndex: number,
    multiplierIndex: number,
    component: Component,
    tod: boolean,
  ): number => {
    const intervalNumber =
      component.Duration > 0 && component.Interval > 0
        ? Math.floor(component.Duration / component.Interval)
        : 1;

    if (component.ComponentFlags & ComponentComponentFlags.STATIC_VALUE) {
      // It seems ComponentFlags == 4 means it is a static value
      return (
        Math.abs(component.Values[valueIndex]) * (tod ? intervalNumber : 1)
      );
    }
    return (
      Math.floor(
        Math.abs(
          (component.Values[valueIndex] *
            level *
            component.Multipliers[multiplierIndex]) /
            100,
        ),
      ) * (tod ? intervalNumber : 1)
    );
  };

  switch (component.Operation) {
    case ComponentOP.DAMAGE:
      console.log(
        colors.cyan(ability.Name),
        `(${colors.red(ability.AbilityID.toString())})`,
        'ScaleStatMult',
        ability.ScaleStatMult,
        'OperationFlags',
        component.OperationFlags,
        'ComponentFlags',
        component.ComponentFlags,
        'duration',
        component.Duration,
        'Interval',
        component.Interval,
        'ChannelInterval',
        ability.ChannelInterval,
        'tod',
        tod,
        'damage',
        calculateDamage(ability, component, valueIndex, abilityLevel, tod),
        'statContrib',
        calculateStatContribution(
          ability,
          component,
          stats,
          component.Operation,
          tod,
        ),
      );
      /* if (tod) {
        console.log(
          component.Duration,
          component.Interval,
          component.ComponentFlags,
          calculateDamage(ability, component, valueIndex, abilityLevel),
          calculateStatContribution(
            ability,
            stats,
            component.Operation,
            tod ? component.Duration : 1000,
          ),
        );
      } */
      return (
        calculateDamage(ability, component, valueIndex, abilityLevel, tod) +
        calculateStatContribution(
          ability,
          component,
          stats,
          component.Operation,
          tod,
        )
      );
    case ComponentOP.HEAL:
      console.log(
        colors.cyan(ability.Name),
        `(${colors.red(ability.AbilityID.toString())})`,
        'ScaleStatMult',
        ability.ScaleStatMult,
        'OperationFlags',
        component.OperationFlags,
        'ComponentFlags',
        component.ComponentFlags,
        'duration',
        component.Duration,
        'Interval',
        component.Interval,
        'ChannelInterval',
        ability.ChannelInterval,
        'tod',
        tod,
        colors.green('healing'),
        calculateDamage(ability, component, valueIndex, abilityLevel, tod),
        'statContrib',
        calculateStatContribution(
          ability,
          component,
          stats,
          component.Operation,
          tod,
        ),
      );
      return (
        calculateDamage(ability, component, valueIndex, abilityLevel, tod) +
        calculateStatContribution(
          ability,
          component,
          stats,
          component.Operation,
          tod,
        )
      );

    case ComponentOP.STAT_CHANGE:
      return calcWithMultiplier(abilityLevel, valueIndex, 0, component, false);
    case ComponentOP.DAMAGE_CHANGE_PCT:
      return calcWithMultiplier(1, valueIndex, 0, component, false);
    case ComponentOP.ARMOR_CHANGE_PCT:
      return calcWithMultiplier(abilityLevel, valueIndex, 0, component, false);
    case ComponentOP.AP_CHANGE:
      return calcWithMultiplier(1, valueIndex, 0, component, false);
    case ComponentOP.MOVEMENT_SPEED:
      return calcWithMultiplier(1, valueIndex, 0, component, false);
    case ComponentOP.MECHANIC_CHANGE:
      return calcWithMultiplier(1, valueIndex + 1, 0, component, false);
    case ComponentOP.DEFENSIVE_STAT_CHANGE:
      return calcWithMultiplier(1, valueIndex, 0, component, false);
    case ComponentOP.AP_REGEN_CHANGE:
      return calcWithMultiplier(1, valueIndex, 0, component, false);
    case ComponentOP.MORALE_CHANGE:
      return calcWithMultiplier(1, valueIndex, 0, component, tod);
    case ComponentOP.COOLDOWN_CHANGE:
      return calcWithMultiplier(1, valueIndex, 0, component, false);
    case ComponentOP.CASTIME_CHANGE:
      return calcWithMultiplier(1, valueIndex, 0, component, false);
    case ComponentOP.BONUS_TYPE:
      if (component.Values[0] === 47) {
        // This seems to mean it is an absorb shield, and needs do multiply value by 5 for abilityLevel 25
        // or 7.5 for abilityLevel 40
        // TODO: find out exactly how thir scales with ability level

        return (
          calcWithMultiplier(1, valueIndex + 1, valueIndex, component, false) *
          (abilityLevel === 40 ? 7.5 : 5)
        );
      }
      return calcWithMultiplier(
        1,
        valueIndex + 1,
        valueIndex,
        component,
        false,
      );
    case ComponentOP.CAREER_RESOURCE:
      return calcWithMultiplier(1, valueIndex, 0, component, false);
    default:
      console.log(`unknown op ${component.Operation}`);
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
): [AbilityData, AbilityData['Components'][0], number] | [] => {
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
  return [ability, ability.Components[componentIndices[0]], valueIndices[0]];
};

const validateComponentValue = (
  name: string,
  number: number,
  gameAbility: AbilityData,
  stats: Stats,
  abilityData: {
    [key: number]: AbilityData;
  },
): number => {
  // Ability refered might be different than current one
  const ability = abilityData[getAbilityID(name) || gameAbility.AbilityID];
  const componentIndices = getComponentIndices(name);
  const valueIndices = getValueIndices(name);

  // linkedAbility is same as ability if there was no linking
  const [linkedAbility, component, valueIndex] = getComponent(
    ability,
    abilityData,
    componentIndices,
    valueIndices,
  );

  if (component === undefined || linkedAbility === undefined) {
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
    // At lvl 40 with no mastery abilityLevel will be 40 for core abilities and
    // 25 for mastery abilities.
    const abilityLevel = gameAbility.Specialization === 0 ? 40 : 25;

    if (valueIndex !== undefined) {
      const value = calculateValue(
        linkedAbility,
        component,
        valueIndex,
        abilityLevel,
        stats,
        name.includes('_TOD'),
      );

      if (value === undefined) {
        return number;
      }

      if (name.endsWith('_SECONDS')) {
        if (value === 25536) {
          // This seems to be a special case as 40000 doesn't fit in a signed 16-bit int
          return 40;
        }
        return value / 1000;
      } else if (name.endsWith('_TOD_ACTIONPOINTS')) {
        return (
          value *
          (Math.floor(component.Duration / component.Interval) +
            (component.ComponentFlags & ComponentComponentFlags.NO_FINAL_TICK
              ? 0
              : 1))
        ); // Values[1] seems to be -1 when there is n
      }
      return value;
    }

    if (name.endsWith('_DURA_SECONDS')) {
      return component.Duration / 1000;
    } else if (name.endsWith('_DURA_MINUTES')) {
      return component.Duration / 1000 / 60;
    } else if (name.endsWith('_DURA_HOURS')) {
      return component.Duration / 1000 / 60 / 60;
    } else if (name.endsWith('_FREQ_SECONDS')) {
      return component.Interval / 1000;
    } else if (name.endsWith('_RADI_FEET')) {
      // The 10 extra feet seems consistent
      return Math.round(component.Radius / 12 + 10);
    }

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
    return number;
  })();

  if (num !== number) {
    console.log(
      `${colors.cyan(gameAbility.Name)} (${colors.red(
        gameAbility.AbilityID.toString(),
      )}): Component value for ${colors.red(name)}: was ${colors.yellow(
        number.toString(),
      )} now ${colors.yellow(num.toString())} ${component.Duration} ${
        component.Interval
      }`,
    );
    // console.log(component);
  }
  return num;
};

export const validateComponentValues = (
  ability: Ability,
  gameAbility: AbilityData,
  stats: Stats,
  abilityData: {
    [key: number]: AbilityData;
  },
): Partial<Ability> => {
  const componentValueNames = extractComponentValueNames(
    gameAbility.Description,
  );

  const componentValues = ability.componentValues || {};

  return {
    componentValues: Object.fromEntries(
      componentValueNames.map((name) => {
        const previousNumber = componentValues[name] || 0;
        return [
          name,
          validateComponentValue(
            name,
            previousNumber,
            gameAbility,
            stats,
            abilityData,
          ),
        ];
      }),
    ),
  };
};

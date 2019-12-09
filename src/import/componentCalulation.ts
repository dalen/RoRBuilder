import { Ability } from './abilityDecoder';
import { Component } from './abilityComponents';
import { ComponentOP } from './types';

type ComponentParts = {
  AbilityID?: number;
  ComponentID: number;
  ValueID?: number;
  Type?: 'duration' | 'radius' | 'damage' | 'health' | 'spiritdamage';
};

export const getAbilityID = (componentString: string): void | number => {
  const match = Array.from(componentString.matchAll(/^ABIL_(\d+)_.*/)).flat(1);
  if (match.length > 0) {
    return Number(match[1]);
  }
};

export const getComponentNumber = (componentString: string): number => {
  const match = Array.from(
    componentString.matchAll(/^(ABIL_\d+_)?COM_(\d+)_.*/),
  ).flat(1);
  if (match.length > 0) {
    return Number(match[2]);
  }
  throw new Error(`Could not find component ID of ${componentString}`);
};

export const getValIndex = (componentString: string): number => {
  const match = Array.from(
    componentString.matchAll(/^(ABIL_\d+_)?COM_\d+_VAL(\d+)_.*/),
  ).flat(1);
  if (match.length > 0) {
    return Number(match[2]);
  }
  throw new Error(`Could not find value index of ${componentString}`);
};

export const getComponentType = (componentString: string): number => {
  const match = Array.from(
    componentString.matchAll(/^(ABIL_\d+_)?COM_(\d+)_.*/),
  ).flat(1);
  if (match.length > 0) {
    return Number(match[2]);
  }
  throw new Error(`Could not find component ID of ${componentString}`);
};

/*
export const calculateComponentString = (
  componentString: string,
  ability: Ability,
  components: { [key: number]: AbilityComponent },
  abilities: Ability[],
  stats: {
    level: number;
    effectiveLevel: number;
    staticLevel: number;
    mastery: number;
    strenght: number;
  },
): number => {
  const abilityID = getAbilityID(componentString) || ability.AbilityID;
  const component =
    components[ability.ComponentIDs[getComponentNumber(componentString)]];

  // test code
  const multIndex = 0; // ??
  const valIndex = getValIndex(componentString); // ??
  const compIndex = 0; // ??

  let num1 = 1;
  if (component.Interval > 0) {
    num1 = component.Duration / component.Interval;
  }
  let num2 = stats.level;
  if (stats.level != stats.effectiveLevel) {
    let num3 = stats.effectiveLevel <= 25 ? stats.effectiveLevel : 25;
    if (stats.effectiveLevel > 40) num3 += stats.effectiveLevel - 40;
    else if (stats.level < 25) num3 = stats.effectiveLevel;
    num2 = num3 + stats.mastery;
  }
  let level = num2;
  if (stats.staticLevel > 0) {
    num2 = stats.staticLevel;
    level = stats.staticLevel;
  }
  let num4 = component.Values[valIndex];
  let multiplier = component.Multipliers[multIndex];
  let num5 = 0.166667;
  let num6 = 1;
  let num7 = 3;
  if (component.Operation == ComponentOP.STAT_CHANGE) num5 = 1;
  if (component.Duration > 0 && component.Interval > 0)
    num6 = component.Duration / component.Interval;
  num7 = component.A07;
  // if (ability.Components[compIndex].A07 == 32) return num4;
  let num8 = (((level - 1) * num5 * num4 + num4) * multiplier) / 100;
  if (num6 > 1 && ability.ChannelInterval <= 0) num8 *= num6;
  return num8;

  // end test

  console.log(abilities[0].AbilityID);
  return 0;
};
*/

/*
int num1 = 1;
      if (component.A10_Interval > 0U)
        num1 = (int) (component.A06_Duration / component.A10_Interval);
      int num2 = level;
      if (level != effectiveLevel)
      {
        int num3 = effectiveLevel <= 25 ? effectiveLevel : 25;
        if (effectiveLevel > 40)
          num3 += effectiveLevel - 40;
        else if (level < 25)
          num3 = effectiveLevel;
        num2 = num3 + mastery;
      }
      level = num2;
      if ((uint) staticLevel > 0U)
      {
        num2 = staticLevel;
        level = staticLevel;
      }
      float num4 = (float) component.Values[valIndex];
      float multiplier = (float) component.Multipliers[multIndex];
      float num5 = 0.166667f;
      int num6 = 1;
      int num7 = 3;
      if (component.A09_Operation == ComponentOP.STAT_CHANGE)
        num5 = 1f;
      if (component.A06_Duration > 0U && component.A10_Interval > 0U)
        num6 = (int) (component.A06_Duration / component.A10_Interval);
      num7 = (int) component.A07;
      if ((int) ability.Components[compIndex].A07 == 32)
        return (int) num4;
      int num8 = ((int) ((float) (num2 - 1) * num5 * num4) + (int) num4) * (int) multiplier / 100;
      if (num6 > 1 && (int) ability.A52_ChannelInterval <= 0)
        num8 *= num6;
      return num8;
      */

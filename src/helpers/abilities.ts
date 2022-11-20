import legacyAbilitiesData from '../data/abilities/legacy/data.json';

export type Mastery = {
  name: string;
  popover: {
    primary: string;
    secondary?: string;
  };
  optionalAbilities: {
    lvl1: number;
    lvl2: number;
    lvl3: number;
    lvl4: number;
    lvl5: number;
    lvl6: number;
    lvl7: number;
  };
  coreAbilities: number[];
};

export type Career = {
  mastery: {
    a: Mastery;
    b: Mastery;
    c: Mastery;
  };
  data: Ability[];
};

export type AbilityCategory =
  | 'Ability'
  | 'Morale'
  | 'CareerTactic'
  | 'TomeTactic';

export type AbilityType =
  | 'standard'
  | 'morale'
  | 'tactic'
  | 'tomeTactic'
  | undefined;

export type Ability = {
  image: string;
  id: number;
  name: string;
  type: string;
  spec: string;
  minrank: string;
  cost: string;
  range: string;
  incant: string;
  cooldown: string;
  note: string;
  description: string;
  category: string;
  abilityType?: AbilityType;
};

export type LegacyData = {
  abilities: LegacyAbility[];
};

export type LegacyAbility = {
  name: string;
  legacyId: number;
  id: number;
};

const legacyData: LegacyData = { abilities: legacyAbilitiesData.abilities };

const legacyAbilitiesToNewAbilities = new Map(
  legacyData.abilities.map((object) => {
    return [object.legacyId, object.id];
  }),
);

export function getAbilityIdFromLegacy(id: number): number {
  return legacyAbilitiesToNewAbilities.get(id) ?? id;
}

export function getAbilityIdsFromLegacy(ids: number[]): number[] {
  const translatedIds: number[] = [];
  for (let i = 0; i < ids.length; i += 1) {
    translatedIds.push(getAbilityIdFromLegacy(ids[i]));
  }
  return translatedIds;
}

export const arrayContains = <T>(
  array: T[],
  needle: (value: T, index: number, obj: T[]) => boolean,
): boolean => {
  return array.findIndex(needle) !== -1;
};

export function getAbilityType(category: string): AbilityType {
  switch (category) {
    case 'Ability':
      return 'standard';
    case 'Morale':
      return 'morale';
    case 'CareerTactic':
      return 'tactic';
    case 'TomeTactic':
      return 'tomeTactic';
    default:
      return undefined;
  }
}

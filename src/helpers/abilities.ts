export type Mastery = {
  name: string;
  popover: {
    primary?: string;
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
  category: AbilityCategory;
  abilityType: AbilityType;
};

export const arrayContains = <T>(
  array: T[],
  needle: (value: T, index: number, obj: T[]) => boolean,
): boolean => {
  return array.findIndex(needle) !== -1;
};

export function getAbilityType(category: AbilityCategory): AbilityType {
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

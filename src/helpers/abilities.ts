export type AbilityCategory =
  | 'Ability'
  | 'Morale'
  | 'CareerTactic'
  | 'TomeTactic';

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
};

export const arrayContains = <T>(
  array: T[],
  needle: (value: T, index: number, obj: T[]) => boolean,
): boolean => {
  return array.findIndex(needle) !== -1;
};

export function getAbilityType(category: AbilityCategory): string | undefined {
  let abilityType = '';
  switch (category) {
    case 'Ability':
      abilityType = 'standard';
      break;
    case 'Morale':
      abilityType = 'morale';
      break;
    case 'CareerTactic':
      abilityType = 'tactic';
      break;
    case 'TomeTactic':
      abilityType = 'tomeTactic';
      break;
    default:
      break;
  }
  return abilityType;
}

import { Ability as AbilityDataRaw } from './abilityDecoder';
import { Component } from './abilityComponents';

export type AbilityData = AbilityDataRaw & {
  Components: Component[];
  Name: string;
  Description: string;
};

export const structureAbilities = (
  abilities: AbilityDataRaw[],
  names: { [key: number]: string },
  descriptions: { [key: number]: string },
  components: { [key: number]: Component },
): { [key: number]: AbilityData } => {
  return Object.fromEntries(
    abilities.map((ability): [number, AbilityData] => [
      ability.AbilityID,
      {
        ...ability,
        Name: names[ability.AbilityID],
        Description: descriptions[ability.AbilityID],
        Components: ability.ComponentIDs.filter(
          componentID => componentID > 0,
        ).map(componentID => components[componentID]),
      },
    ]),
  );
};

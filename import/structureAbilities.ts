import { Ability as AbilityDataRaw } from './abilityDecoder';
import { Component } from './abilityComponents';

export type AbilityData = AbilityDataRaw & {
  Components: Component[];
  Name: string;
  Description: string;
  LabelTexts: string[];
};

export const structureAbilities = (
  abilities: AbilityDataRaw[],
  names: Map<number, string>,
  descriptions: Map<number, string>,
  components: { [key: number]: Component },
  labelTexts: Map<number, string>,
): { [key: number]: AbilityData } => {
  return Object.fromEntries(
    abilities.map((ability): [number, AbilityData] => {
      const name = names.get(ability.AbilityID) || '';
      const description = descriptions.get(ability.AbilityID) || '';

      return [
        ability.AbilityID,
        {
          ...ability,
          Name: name,
          Description: description,
          Components: ability.ComponentIDs.filter(
            componentID => componentID > 0,
          ).map(componentID => components[componentID]),
          LabelTexts: ability.Labels.filter(l => l !== undefined && l >= 32768)
            .map(l => labelTexts.get(l - 32768))
            .filter(l => l !== undefined) as string[],
        },
      ];
    }),
  );
};

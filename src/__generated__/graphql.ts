/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
import { Career } from './schema-types';
import { EquipSlot } from './schema-types';
import { ItemRarity } from './schema-types';
import { ItemType } from './schema-types';
import { Stat } from './schema-types';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export * from './schema-types';
export type BooleanOperationFilterInput = {
  eq?: boolean | null | undefined;
  neq?: boolean | null | undefined;
};

export { Career };

export { EquipSlot };

export type EquipSlotOperationFilterInput = {
  eq?: EquipSlot | null | undefined;
  in?: Array<EquipSlot> | null | undefined;
  neq?: EquipSlot | null | undefined;
  nin?: Array<EquipSlot> | null | undefined;
};

export type IdOperationFilterInput = {
  eq?: string | number | null | undefined;
  in?: Array<string | number | null | undefined> | null | undefined;
  neq?: string | number | null | undefined;
  nin?: Array<string | number | null | undefined> | null | undefined;
};

/** Item filtering options */
export type ItemFilterInput = {
  and?: Array<ItemFilterInput> | null | undefined;
  /** Armor value, block rating on shields */
  armor?: UnsignedShortOperationFilterInput | null | undefined;
  /** Description */
  description?: StringOperationFilterInput | null | undefined;
  /** Weapon DPS */
  dps?: UnsignedShortOperationFilterInput | null | undefined;
  /** Item Id */
  id?: IdOperationFilterInput | null | undefined;
  /** Item level */
  itemLevel?: UnsignedByteOperationFilterInput | null | undefined;
  /** Level requirement */
  levelRequirement?: UnsignedByteOperationFilterInput | null | undefined;
  /** Name */
  name?: StringOperationFilterInput | null | undefined;
  or?: Array<ItemFilterInput> | null | undefined;
  /** Rarity level */
  rarity?: ItemRarityOperationFilterInput | null | undefined;
  /** Renown rank requirement */
  renownRankRequirement?: UnsignedByteOperationFilterInput | null | undefined;
  /** Character equipment slot */
  slot?: EquipSlotOperationFilterInput | null | undefined;
  /** Weapon speed */
  speed?: UnsignedShortOperationFilterInput | null | undefined;
  /** Number of talisman slots */
  talismanSlots?: UnsignedByteOperationFilterInput | null | undefined;
  /** Type */
  type?: ItemTypeOperationFilterInput | null | undefined;
  /** Unique equipped */
  uniqueEquipped?: BooleanOperationFilterInput | null | undefined;
};

export { ItemRarity };

export type ItemRarityOperationFilterInput = {
  eq?: ItemRarity | null | undefined;
  in?: Array<ItemRarity> | null | undefined;
  neq?: ItemRarity | null | undefined;
  nin?: Array<ItemRarity> | null | undefined;
};

export { ItemType };

export type ItemTypeOperationFilterInput = {
  eq?: ItemType | null | undefined;
  in?: Array<ItemType> | null | undefined;
  neq?: ItemType | null | undefined;
  nin?: Array<ItemType> | null | undefined;
};

export { Stat };

export type StringOperationFilterInput = {
  and?: Array<StringOperationFilterInput> | null | undefined;
  contains?: string | null | undefined;
  endsWith?: string | null | undefined;
  eq?: string | null | undefined;
  in?: Array<string | null | undefined> | null | undefined;
  ncontains?: string | null | undefined;
  nendsWith?: string | null | undefined;
  neq?: string | null | undefined;
  nin?: Array<string | null | undefined> | null | undefined;
  nstartsWith?: string | null | undefined;
  or?: Array<StringOperationFilterInput> | null | undefined;
  startsWith?: string | null | undefined;
};

export type UnsignedByteOperationFilterInput = {
  eq?: any;
  gt?: any;
  gte?: any;
  in?: Array<any> | null | undefined;
  lt?: any;
  lte?: any;
  neq?: any;
  ngt?: any;
  ngte?: any;
  nin?: Array<any> | null | undefined;
  nlt?: any;
  nlte?: any;
};

export type UnsignedShortOperationFilterInput = {
  eq?: any;
  gt?: any;
  gte?: any;
  in?: Array<any> | null | undefined;
  lt?: any;
  lte?: any;
  neq?: any;
  ngt?: any;
  ngte?: any;
  nin?: Array<any> | null | undefined;
  nlt?: any;
  nlte?: any;
};

export type FindCharactersQueryVariables = Exact<{
  name: string;
}>;

export type FindCharactersQuery = {
  characters: {
    nodes: Array<{
      id: string;
      name: string;
      career: Career;
      level: any;
      renownRank: any;
    }> | null;
  } | null;
};

export type CharacterArmoryForImportQueryVariables = Exact<{
  id: string | number;
}>;

export type CharacterArmoryForImportQuery = {
  character: {
    items: Array<{
      equipSlot: EquipSlot;
      item: {
        id: string;
        name: string;
        iconUrl: any;
        rarity: ItemRarity;
        type: ItemType;
        slot: EquipSlot;
        speed: any;
        talismanSlots: any;
        uniqueEquipped: boolean;
        stats: Array<{ stat: Stat; value: any; percentage: boolean }>;
        itemSet: {
          id: string;
          name: string;
          bonuses: Array<{
            itemsRequired: any;
            bonus:
              | { __typename: 'Ability' }
              | {
                  __typename: 'ItemStat';
                  stat: Stat;
                  value: any;
                  percentage: boolean;
                };
          }>;
        } | null;
      };
      talismans: Array<{
        id: string;
        name: string;
        iconUrl: any;
        rarity: ItemRarity;
        uniqueEquipped: boolean;
        stats: Array<{ stat: Stat; value: any; percentage: boolean }>;
      }>;
    }>;
  } | null;
};

export type SlotItemsQueryVariables = Exact<{
  where?: ItemFilterInput | null | undefined;
  usableByCareer?: Career | null | undefined;
  first?: number | null | undefined;
}>;

export type SlotItemsQuery = {
  items: {
    totalCount: number;
    nodes: Array<{
      id: string;
      name: string;
      iconUrl: any;
      rarity: ItemRarity;
      itemLevel: any;
      levelRequirement: any;
      renownRankRequirement: any;
      armor: any;
      dps: any;
      speed: any;
      talismanSlots: any;
      uniqueEquipped: boolean;
      type: ItemType;
      slot: EquipSlot;
      stats: Array<{ stat: Stat; value: any; percentage: boolean }>;
      itemSet: {
        id: string;
        name: string;
        bonuses: Array<{
          itemsRequired: any;
          bonus:
            | { __typename: 'Ability' }
            | {
                __typename: 'ItemStat';
                stat: Stat;
                value: any;
                percentage: boolean;
              };
        }>;
      } | null;
    }> | null;
  } | null;
};

export type ItemsByIdQueryVariables = Exact<{
  ids?:
    | Array<string | number | null | undefined>
    | string
    | number
    | null
    | undefined;
}>;

export type ItemsByIdQuery = {
  items: {
    nodes: Array<{
      id: string;
      name: string;
      iconUrl: any;
      rarity: ItemRarity;
      talismanSlots: any;
      uniqueEquipped: boolean;
      type: ItemType;
      slot: EquipSlot;
      stats: Array<{ stat: Stat; value: any; percentage: boolean }>;
      itemSet: {
        id: string;
        name: string;
        bonuses: Array<{
          itemsRequired: any;
          bonus:
            | { __typename: 'Ability' }
            | {
                __typename: 'ItemStat';
                stat: Stat;
                value: any;
                percentage: boolean;
              };
        }>;
      } | null;
    }> | null;
  } | null;
};

export type TalismansQueryVariables = Exact<{
  where?: ItemFilterInput | null | undefined;
  first?: number | null | undefined;
}>;

export type TalismansQuery = {
  items: {
    totalCount: number;
    nodes: Array<{
      id: string;
      name: string;
      iconUrl: any;
      rarity: ItemRarity;
      itemLevel: any;
      levelRequirement: any;
      renownRankRequirement: any;
      uniqueEquipped: boolean;
      stats: Array<{ stat: Stat; value: any; percentage: boolean }>;
    }> | null;
  } | null;
};

export const FindCharactersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'FindCharacters' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'characters' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'name' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'name' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: { kind: 'IntValue', value: '5' },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'career' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'level' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'renownRank' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FindCharactersQuery, FindCharactersQueryVariables>;
export const CharacterArmoryForImportDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'CharacterArmoryForImport' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'character' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'equipSlot' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'item' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'iconUrl' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'rarity' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'type' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'slot' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'speed' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'talismanSlots' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'uniqueEquipped' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'stats' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'stat' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'value' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'percentage' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'itemSet' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'bonuses' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'itemsRequired',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'bonus',
                                          },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: '__typename',
                                                },
                                              },
                                              {
                                                kind: 'InlineFragment',
                                                typeCondition: {
                                                  kind: 'NamedType',
                                                  name: {
                                                    kind: 'Name',
                                                    value: 'ItemStat',
                                                  },
                                                },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: {
                                                        kind: 'Name',
                                                        value: 'stat',
                                                      },
                                                    },
                                                    {
                                                      kind: 'Field',
                                                      name: {
                                                        kind: 'Name',
                                                        value: 'value',
                                                      },
                                                    },
                                                    {
                                                      kind: 'Field',
                                                      name: {
                                                        kind: 'Name',
                                                        value: 'percentage',
                                                      },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'talismans' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'iconUrl' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'rarity' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'uniqueEquipped' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'stats' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'stat' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'value' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'percentage' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CharacterArmoryForImportQuery,
  CharacterArmoryForImportQueryVariables
>;
export const SlotItemsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SlotItems' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'where' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'ItemFilterInput' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'usableByCareer' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Career' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'first' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'items' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'usableByCareer' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'usableByCareer' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'first' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order' },
                value: {
                  kind: 'ListValue',
                  values: [
                    {
                      kind: 'ObjectValue',
                      fields: [
                        {
                          kind: 'ObjectField',
                          name: { kind: 'Name', value: 'name' },
                          value: { kind: 'EnumValue', value: 'ASC' },
                        },
                      ],
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'iconUrl' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'rarity' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'itemLevel' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'levelRequirement' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'renownRankRequirement' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'armor' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'dps' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'speed' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'talismanSlots' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'uniqueEquipped' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slot' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'stats' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'stat' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'value' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'percentage' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'itemSet' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'bonuses' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'itemsRequired',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'bonus' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: '__typename',
                                          },
                                        },
                                        {
                                          kind: 'InlineFragment',
                                          typeCondition: {
                                            kind: 'NamedType',
                                            name: {
                                              kind: 'Name',
                                              value: 'ItemStat',
                                            },
                                          },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'stat',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'value',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'percentage',
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SlotItemsQuery, SlotItemsQueryVariables>;
export const ItemsByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'ItemsById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'ids' } },
          type: {
            kind: 'ListType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'items' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'in' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'ids' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: { kind: 'IntValue', value: '40' },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'iconUrl' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'rarity' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'talismanSlots' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'uniqueEquipped' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slot' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'stats' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'stat' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'value' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'percentage' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'itemSet' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'bonuses' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'itemsRequired',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'bonus' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: '__typename',
                                          },
                                        },
                                        {
                                          kind: 'InlineFragment',
                                          typeCondition: {
                                            kind: 'NamedType',
                                            name: {
                                              kind: 'Name',
                                              value: 'ItemStat',
                                            },
                                          },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'stat',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'value',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'percentage',
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ItemsByIdQuery, ItemsByIdQueryVariables>;
export const TalismansDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Talismans' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'where' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'ItemFilterInput' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'first' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'items' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'first' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order' },
                value: {
                  kind: 'ListValue',
                  values: [
                    {
                      kind: 'ObjectValue',
                      fields: [
                        {
                          kind: 'ObjectField',
                          name: { kind: 'Name', value: 'name' },
                          value: { kind: 'EnumValue', value: 'ASC' },
                        },
                      ],
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'iconUrl' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'rarity' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'itemLevel' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'levelRequirement' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'renownRankRequirement' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'uniqueEquipped' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'stats' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'stat' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'value' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'percentage' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TalismansQuery, TalismansQueryVariables>;

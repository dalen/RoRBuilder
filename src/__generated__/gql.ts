/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  '\n  query FindCharacters($name: String!) {\n    characters(where: { name: { eq: $name } }, first: 5) {\n      nodes {\n        id\n        name\n        career\n        level\n        renownRank\n      }\n    }\n  }\n': typeof types.FindCharactersDocument;
  '\n  query CharacterArmoryForImport($id: ID!) {\n    character(id: $id) {\n      items {\n        equipSlot\n        item {\n          id\n          name\n          iconUrl\n          rarity\n          type\n          slot\n          speed\n          talismanSlots\n          uniqueEquipped\n          stats {\n            stat\n            value\n            percentage\n          }\n          itemSet {\n            id\n            name\n            bonuses {\n              itemsRequired\n              bonus {\n                __typename\n                ... on ItemStat {\n                  stat\n                  value\n                  percentage\n                }\n              }\n            }\n          }\n        }\n        talismans {\n          id\n          name\n          iconUrl\n          rarity\n          uniqueEquipped\n          stats {\n            stat\n            value\n            percentage\n          }\n        }\n      }\n    }\n  }\n': typeof types.CharacterArmoryForImportDocument;
  '\n  query SlotItems(\n    $where: ItemFilterInput\n    $usableByCareer: Career\n    $first: Int\n  ) {\n    items(where: $where, usableByCareer: $usableByCareer, first: $first, order: [{ name: ASC }]) {\n      totalCount\n      nodes {\n        id\n        name\n        iconUrl\n        rarity\n        itemLevel\n        levelRequirement\n        renownRankRequirement\n        armor\n        dps\n        speed\n        talismanSlots\n        uniqueEquipped\n        type\n        slot\n        stats {\n          stat\n          value\n          percentage\n        }\n        itemSet {\n          id\n          name\n          bonuses {\n            itemsRequired\n            bonus {\n              __typename\n              ... on ItemStat {\n                stat\n                value\n                percentage\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n': typeof types.SlotItemsDocument;
  '\n  query ItemsById($ids: [ID]) {\n    items(where: { id: { in: $ids } }, first: 40) {\n      nodes {\n        id\n        name\n        iconUrl\n        rarity\n        talismanSlots\n        uniqueEquipped\n        type\n        slot\n        stats {\n          stat\n          value\n          percentage\n        }\n        itemSet {\n          id\n          name\n          bonuses {\n            itemsRequired\n            bonus {\n              __typename\n              ... on ItemStat {\n                stat\n                value\n                percentage\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n': typeof types.ItemsByIdDocument;
  '\n  query Talismans($where: ItemFilterInput, $first: Int) {\n    items(where: $where, first: $first, order: [{ name: ASC }]) {\n      totalCount\n      nodes {\n        id\n        name\n        iconUrl\n        rarity\n        itemLevel\n        levelRequirement\n        renownRankRequirement\n        uniqueEquipped\n        stats {\n          stat\n          value\n          percentage\n        }\n      }\n    }\n  }\n': typeof types.TalismansDocument;
};
const documents: Documents = {
  '\n  query FindCharacters($name: String!) {\n    characters(where: { name: { eq: $name } }, first: 5) {\n      nodes {\n        id\n        name\n        career\n        level\n        renownRank\n      }\n    }\n  }\n':
    types.FindCharactersDocument,
  '\n  query CharacterArmoryForImport($id: ID!) {\n    character(id: $id) {\n      items {\n        equipSlot\n        item {\n          id\n          name\n          iconUrl\n          rarity\n          type\n          slot\n          speed\n          talismanSlots\n          uniqueEquipped\n          stats {\n            stat\n            value\n            percentage\n          }\n          itemSet {\n            id\n            name\n            bonuses {\n              itemsRequired\n              bonus {\n                __typename\n                ... on ItemStat {\n                  stat\n                  value\n                  percentage\n                }\n              }\n            }\n          }\n        }\n        talismans {\n          id\n          name\n          iconUrl\n          rarity\n          uniqueEquipped\n          stats {\n            stat\n            value\n            percentage\n          }\n        }\n      }\n    }\n  }\n':
    types.CharacterArmoryForImportDocument,
  '\n  query SlotItems(\n    $where: ItemFilterInput\n    $usableByCareer: Career\n    $first: Int\n  ) {\n    items(where: $where, usableByCareer: $usableByCareer, first: $first, order: [{ name: ASC }]) {\n      totalCount\n      nodes {\n        id\n        name\n        iconUrl\n        rarity\n        itemLevel\n        levelRequirement\n        renownRankRequirement\n        armor\n        dps\n        speed\n        talismanSlots\n        uniqueEquipped\n        type\n        slot\n        stats {\n          stat\n          value\n          percentage\n        }\n        itemSet {\n          id\n          name\n          bonuses {\n            itemsRequired\n            bonus {\n              __typename\n              ... on ItemStat {\n                stat\n                value\n                percentage\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n':
    types.SlotItemsDocument,
  '\n  query ItemsById($ids: [ID]) {\n    items(where: { id: { in: $ids } }, first: 40) {\n      nodes {\n        id\n        name\n        iconUrl\n        rarity\n        talismanSlots\n        uniqueEquipped\n        type\n        slot\n        stats {\n          stat\n          value\n          percentage\n        }\n        itemSet {\n          id\n          name\n          bonuses {\n            itemsRequired\n            bonus {\n              __typename\n              ... on ItemStat {\n                stat\n                value\n                percentage\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n':
    types.ItemsByIdDocument,
  '\n  query Talismans($where: ItemFilterInput, $first: Int) {\n    items(where: $where, first: $first, order: [{ name: ASC }]) {\n      totalCount\n      nodes {\n        id\n        name\n        iconUrl\n        rarity\n        itemLevel\n        levelRequirement\n        renownRankRequirement\n        uniqueEquipped\n        stats {\n          stat\n          value\n          percentage\n        }\n      }\n    }\n  }\n':
    types.TalismansDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query FindCharacters($name: String!) {\n    characters(where: { name: { eq: $name } }, first: 5) {\n      nodes {\n        id\n        name\n        career\n        level\n        renownRank\n      }\n    }\n  }\n',
): (typeof documents)['\n  query FindCharacters($name: String!) {\n    characters(where: { name: { eq: $name } }, first: 5) {\n      nodes {\n        id\n        name\n        career\n        level\n        renownRank\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query CharacterArmoryForImport($id: ID!) {\n    character(id: $id) {\n      items {\n        equipSlot\n        item {\n          id\n          name\n          iconUrl\n          rarity\n          type\n          slot\n          speed\n          talismanSlots\n          uniqueEquipped\n          stats {\n            stat\n            value\n            percentage\n          }\n          itemSet {\n            id\n            name\n            bonuses {\n              itemsRequired\n              bonus {\n                __typename\n                ... on ItemStat {\n                  stat\n                  value\n                  percentage\n                }\n              }\n            }\n          }\n        }\n        talismans {\n          id\n          name\n          iconUrl\n          rarity\n          uniqueEquipped\n          stats {\n            stat\n            value\n            percentage\n          }\n        }\n      }\n    }\n  }\n',
): (typeof documents)['\n  query CharacterArmoryForImport($id: ID!) {\n    character(id: $id) {\n      items {\n        equipSlot\n        item {\n          id\n          name\n          iconUrl\n          rarity\n          type\n          slot\n          speed\n          talismanSlots\n          uniqueEquipped\n          stats {\n            stat\n            value\n            percentage\n          }\n          itemSet {\n            id\n            name\n            bonuses {\n              itemsRequired\n              bonus {\n                __typename\n                ... on ItemStat {\n                  stat\n                  value\n                  percentage\n                }\n              }\n            }\n          }\n        }\n        talismans {\n          id\n          name\n          iconUrl\n          rarity\n          uniqueEquipped\n          stats {\n            stat\n            value\n            percentage\n          }\n        }\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query SlotItems(\n    $where: ItemFilterInput\n    $usableByCareer: Career\n    $first: Int\n  ) {\n    items(where: $where, usableByCareer: $usableByCareer, first: $first, order: [{ name: ASC }]) {\n      totalCount\n      nodes {\n        id\n        name\n        iconUrl\n        rarity\n        itemLevel\n        levelRequirement\n        renownRankRequirement\n        armor\n        dps\n        speed\n        talismanSlots\n        uniqueEquipped\n        type\n        slot\n        stats {\n          stat\n          value\n          percentage\n        }\n        itemSet {\n          id\n          name\n          bonuses {\n            itemsRequired\n            bonus {\n              __typename\n              ... on ItemStat {\n                stat\n                value\n                percentage\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n',
): (typeof documents)['\n  query SlotItems(\n    $where: ItemFilterInput\n    $usableByCareer: Career\n    $first: Int\n  ) {\n    items(where: $where, usableByCareer: $usableByCareer, first: $first, order: [{ name: ASC }]) {\n      totalCount\n      nodes {\n        id\n        name\n        iconUrl\n        rarity\n        itemLevel\n        levelRequirement\n        renownRankRequirement\n        armor\n        dps\n        speed\n        talismanSlots\n        uniqueEquipped\n        type\n        slot\n        stats {\n          stat\n          value\n          percentage\n        }\n        itemSet {\n          id\n          name\n          bonuses {\n            itemsRequired\n            bonus {\n              __typename\n              ... on ItemStat {\n                stat\n                value\n                percentage\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query ItemsById($ids: [ID]) {\n    items(where: { id: { in: $ids } }, first: 40) {\n      nodes {\n        id\n        name\n        iconUrl\n        rarity\n        talismanSlots\n        uniqueEquipped\n        type\n        slot\n        stats {\n          stat\n          value\n          percentage\n        }\n        itemSet {\n          id\n          name\n          bonuses {\n            itemsRequired\n            bonus {\n              __typename\n              ... on ItemStat {\n                stat\n                value\n                percentage\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n',
): (typeof documents)['\n  query ItemsById($ids: [ID]) {\n    items(where: { id: { in: $ids } }, first: 40) {\n      nodes {\n        id\n        name\n        iconUrl\n        rarity\n        talismanSlots\n        uniqueEquipped\n        type\n        slot\n        stats {\n          stat\n          value\n          percentage\n        }\n        itemSet {\n          id\n          name\n          bonuses {\n            itemsRequired\n            bonus {\n              __typename\n              ... on ItemStat {\n                stat\n                value\n                percentage\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query Talismans($where: ItemFilterInput, $first: Int) {\n    items(where: $where, first: $first, order: [{ name: ASC }]) {\n      totalCount\n      nodes {\n        id\n        name\n        iconUrl\n        rarity\n        itemLevel\n        levelRequirement\n        renownRankRequirement\n        uniqueEquipped\n        stats {\n          stat\n          value\n          percentage\n        }\n      }\n    }\n  }\n',
): (typeof documents)['\n  query Talismans($where: ItemFilterInput, $first: Int) {\n    items(where: $where, first: $first, order: [{ name: ASC }]) {\n      totalCount\n      nodes {\n        id\n        name\n        iconUrl\n        rarity\n        itemLevel\n        levelRequirement\n        renownRankRequirement\n        uniqueEquipped\n        stats {\n          stat\n          value\n          percentage\n        }\n      }\n    }\n  }\n'];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;

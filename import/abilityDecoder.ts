import {
  guard,
  string,
  object,
  array,
  integer,
  nullable,
  $DecoderType,
} from 'decoders';

import { promises as fs } from 'fs';

const abilityData = object({
  Type: integer,
  Operation: integer,
  Condition: integer,
  LogicOperator: integer,
  Val5: integer,
  Val6: integer,
  Val7: integer,
  Val8: integer,
  Val9: integer,
});

const abilityDecoder = object({
  AbilityID: integer,
  MoraleLevel: integer,
  A170: integer,
  Castime: integer,
  Cooldown: integer,
  TacticType: integer,
  TargetType: integer,
  AbilityType: integer,
  AttackType: integer,
  A24: integer,
  CareerID: integer,
  CounterAmount: integer,
  Flags: integer,
  EffectID: integer,
  A44: integer,
  Range: integer,
  Angle: integer,
  MoraleCost: integer,
  ChannelInterval: integer,
  A54: integer,
  ScaleStatMult: integer,
  NumTacticSlots: integer,
  AP: integer,
  A61: integer,
  A62: integer,
  Faction: integer,
  AbilityImprovementThreshold: integer,
  AbilityImprovementCap: integer,
  Specialization: integer,
  StanceOrder: integer,
  A68: integer,
  MinLevel: integer,
  ComponentIDs: array(integer),
  Triggers: array(integer),
  UsableWithBuff: array(integer),
  A136: integer,
  A140: integer,
  Groups: array(integer),
  Labels: array(integer),
  ComponentVfx: string,
  Data: array(nullable(abilityData)),
});

const abilitiesFileDecoder = object({
  Abilities: array(abilityDecoder),
});

export type Ability = $DecoderType<typeof abilityDecoder>;

export const readAbilities = async () => {
  const abilityExport = JSON.parse(
    (await fs.readFile('data/bin/abilityexport.json')).toString(),
  );

  return guard(abilitiesFileDecoder)(abilityExport).Abilities;
};

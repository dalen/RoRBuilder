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
  Target: integer,
  Param1: integer,
  Value: integer,
  Param2: integer,
  Param3: integer,
});

const abilityDecoder = object({
  AbilityID: integer,
  MoraleLevel: integer,
  A170: integer,
  CastTime: integer,
  Cooldown: integer,
  TacticType: integer,
  TargetType: integer,
  AbilityType: integer,
  AttackType: integer,
  StatOverride: integer,
  CareerID: integer,
  CounterAmount: integer,
  Flags: integer,
  EffectID: integer,
  MinRange: integer,
  Range: integer,
  Angle: integer,
  MoraleCost: integer,
  ChannelInterval: integer,
  CooldownEntry: integer,
  ScaleStatMult: integer,
  NumTacticSlots: integer,
  AP: integer,
  Origin: integer,
  ScalingFlags: integer,
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
  RequireAbilityResult: array(integer),
  Groups: array(integer),
  Labels: array(integer),
  ComponentVfx: string,
  Requirements: array(nullable(abilityData)),
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

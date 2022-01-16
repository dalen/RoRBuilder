import {
  guard,
  object,
  array,
  integer,
  nullable,
  $DecoderType,
  map,
} from 'decoders';

import { promises as fs } from 'fs';

const componentRequirement = object({
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

const component = object({
  ComponentID: integer,
  A00: integer,
  Requirements: array(nullable(componentRequirement)),
  Values: array(integer),
  Multipliers: array(integer),
  Delay: integer,
  Duration: integer,
  OperationFlags: integer,
  IconVisible: integer,
  Operation: integer,
  Interval: integer,
  Radius: integer,
  ConeAngle: integer,
  FlightSpeed: integer,
  ComponentFlags: integer,
  MaxTargets: integer,
});

const componentFileDecoder = object({
  Components: array(component),
});

export type Component = $DecoderType<typeof component>;

export const readComponents = async () => {
  const abilityComponentExport = JSON.parse(
    (await fs.readFile('data/bin/abilitycomponentexport.json')).toString(),
  );

  return guard(componentFileDecoder)(abilityComponentExport).Components;
};

// Turn the array into a map of ID -> Component
export const structureComponents = (
  components: Component[],
): { [key: number]: Component } => {
  return Object.fromEntries(
    components.map((component) => {
      return [component.ComponentID, component];
    }),
  );
};

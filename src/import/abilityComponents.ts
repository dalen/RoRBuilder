import {
  guard,
  object,
  array,
  integer,
  nullable,
  $DecoderType,
} from 'decoders';

import { promises as fs } from 'fs';

const componentData = object({
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

const component = object({
  ComponentID: integer,
  A00: integer,
  Data: array(nullable(componentData)),
  Values: array(integer),
  Multipliers: array(integer),
  A05: integer,
  Duration: integer,
  A07: integer,
  A08: integer,
  Operation: integer,
  Interval: integer,
  Radius: integer,
  ConeAngle: integer,
  FlightSpeed: integer,
  A15: integer,
  MaxTargets: integer,
});

const componentFileDecoder = object({
  Components: array(component),
});

export type Component = $DecoderType<typeof component>;

export const readComponents = async () => {
  const abilityComponentExport = JSON.parse(
    (await fs.readFile('data/abilitycomponentexport.json')).toString(),
  );

  return guard(componentFileDecoder)(abilityComponentExport).Components;
};

// Turn the array into a map of ID -> Component
export const structureComponents = (
  components: Component[],
): { [key: number]: Component } => {
  return Object.fromEntries(
    components.map(component => {
      return [component.ComponentID, component];
    }),
  );
};

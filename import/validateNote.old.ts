import colors from 'colors';

import { Ability } from '../helpers/abilities';
import { AbilityData } from './structureAbilities';
import { AbilityFlags, CareerLine } from './types';

const labelMap: { [key: number]: string } = {
  32870: 'Requires Shield',
  32876: 'Requires Great Weapon',
  32898: 'Target must be facing away from you',
  32903: 'Requires Block',
  32904: 'Requires Parry',
  32918: 'Only usable after an enemy Disrupts one of your spells',
  32932: 'Frenzy - Requires Blood Lust',
  32937: 'Builds 1 Blood Lust',
  32962: 'Target must be below 50% health',
  32973: 'Requires Prowling',
  33025: 'Requires 60 Soul Essence',
  33031: 'Requires 40 Soul Essence',
  33032: 'Requires 55 Soul Essence',
  33034: 'Builds 20 Soul Essence',
  33035: 'Builds 25 Soul Essence',
  33036: 'Builds 30 Soul Essence',
  33037: 'Builds 40 Soul Essence',
  33041: 'Builds 35 Soul Essence',
  33053: 'Builds 10 Dark Magic',
  33054: 'Builds 20 Dark Magic',
  33055: 'Builds 25 Dark Magic',
  33056: 'Builds 5 Dark Magic',
  33068: 'Builds 45 Soul Essence',
  33072: 'Requires 20 Soul Essence per second',
  33073: 'Requires 30 Soul Essence',
  33074: 'Builds 20 Soul Essence',
  33079: 'Requires 25 Soul Essence per second',
  33083: 'Only usable on other players',
  33087: 'Builds Tranquility',
  33088: 'Builds Force',
  33089: 'Force reduces cast time',
  33090: 'Tranquility reduces cast time',
  33091: 'Force increases effectiveness',
  33092: 'Tranquility increases effectiveness',
  33094: 'Requires 20 Soul Essence',
  33106: 'Builds 15 Soul Essence',
  33112: 'Costs 20% fewer action points per Blood Lust spent',
  33119: 'Builds 15 Dark Magic',
  33120: 'Builds 40 Dark Magic',
  33121: 'Has a chance to cause a Backlash!',
  33122: 'Consumes all Dark Magic',
  33126: 'Requires 25 Soul Essence',
  33130: 'Only one Covenant may be active at a time',
  33132: 'Target must have a Blessing',
  33133: 'Target must have an Enchantment',
  33136: 'Target must be Hexed or Ailing',
  33141: 'You cannot perform this action while rooted',
  33143: 'Costs 15 Hatred',
  33144: 'Costs 20 Hatred',
  33146: 'Costs 30 Hatred',
  33148: 'Costs 40 Hatred',
  33149: 'Costs 10 Hatred every 3 seconds',
  33155: 'Requires Dual Wield',
  33176: 'Only usable on Dead Players',
  33187: 'Improves with Hatred',
  33192: 'Costs 20 Dark Magic',
  33194: 'Costs 40 Dark Magic',
};

// Test if obj1 has keys in obj2 with same values
const partialIsEqual = (obj1: object | null, obj2: object): boolean => {
  if (obj1 === null || obj2 === null) {
    return false;
  }
  return (
    JSON.stringify(
      Object.entries(obj1)
        .filter(e => obj2.hasOwnProperty(e[0]))
        .sort(),
    ) === JSON.stringify(Object.entries(obj2).sort())
  );
};

export const validateNote = (
  ability: Ability,
  gameAbility: AbilityData,
): Partial<Ability> => {
  const dataStrs = (gameAbility.Data.filter(d => d !== null) as {
    Type: number;
    Operation: number;
    Condition: number;
    LogicOperator: number;
    Val5: number;
    Val6: number;
    Val7: number;
    Val8: number;
    Val9: number;
  }[])
    .map(d => {
      if (
        partialIsEqual(d, {
          Type: 1,
          Operation: 10,
          Condition: 6,
          LogicOperator: 8,
          Val5: 0,
          Val6: 9009,
          Val7: 0,
          Val8: 0,
          Val9: 0,
        }) ||
        partialIsEqual(d, {
          Type: 1,
          Operation: 10,
          Condition: 1,
          LogicOperator: 8,
          Val5: 0,
          Val6: 9009,
          Val7: 1,
          Val8: 0,
          Val9: 0,
        })
      ) {
        return 'Requires Shield';
      }

      if (
        partialIsEqual(d, {
          Type: 1,
          Operation: 10,
          Condition: 6,
          LogicOperator: 8,
          Val5: 3,
          Val6: 9038,
          Val7: 0,
          Val8: 0,
          Val9: 0,
        })
      ) {
        return 'Requires Dual Wield';
      }

      if (
        partialIsEqual(d, {
          Type: 1,
          Operation: 44,
          Condition: 1,
          LogicOperator: 8,
          Val5: 0,
          Val6: 11,
          Val7: 15,
          Val8: 0,
          Val9: 0,
        })
      ) {
        return 'Requires Pistol';
      }

      if (
        partialIsEqual(d, {
          // Sword
          Type: 1,
          Operation: 38,
          Condition: 1,
          LogicOperator: 8,
          Val5: 0,
          Val6: 0,
          Val7: 1,
          Val8: 0,
          Val9: 0,
        }) ||
        partialIsEqual(d, {
          // Spear
          Type: 1,
          Operation: 38,
          Condition: 6,
          LogicOperator: 8,
          Val5: 0,
          Val6: 0,
          Val7: 0,
          Val8: 0,
          Val9: 0,
        })
      ) {
        return 'Requires Great Weapon';
      }

      if (
        partialIsEqual(d, {
          Type: 1,
          Operation: 18,
          Condition: 4,
          LogicOperator: 8,
          Val5: 0,
          Val6: 0,
          Val7: 50,
          Val8: 0,
          Val9: 1,
        })
      ) {
        return 'Target must be below 50% health'; // Probably use Val7 here
      }

      if (
        partialIsEqual(d, {
          Type: 1,
          Operation: 10,
          Condition: 1,
          LogicOperator: 8,
          Val5: 0,
          Val6: 9302,
          Val7: 1,
          Val8: 0,
          Val9: 0,
        })
      ) {
        return 'Target must be Hexed or Ailing';
      }

      if (
        partialIsEqual(d, {
          Type: 1,
          Operation: 10,
          Condition: 6,
          LogicOperator: 8,
          Val5: 0,
          Val6: 9066,
          Val7: 0,
          Val8: 0,
          Val9: 0,
        })
      ) {
        return 'Requires Parry';
      }

      if (
        partialIsEqual(d, {
          Type: 1,
          Operation: 10,
          Condition: 6,
          LogicOperator: 8,
          Val5: 0,
          Val6: 9076,
          Val7: 0,
          Val8: 0,
          Val9: 0,
        }) ||
        partialIsEqual(d, {
          Type: 1,
          Operation: 10,
          Condition: 5,
          LogicOperator: 8,
          Val5: 0,
          Val6: 9076,
          Val7: 1,
          Val8: 0,
          Val9: 0,
        })
      ) {
        return 'Requires Block';
      }

      if (
        partialIsEqual(d, {
          Type: 1,
          Operation: 10,
          Condition: 6,
          LogicOperator: 8,
          Val5: 0,
          Val6: 9085,
          Val7: 0,
          Val8: 0,
          Val9: 0,
        })
      ) {
        return 'Requires Disrupt';
      }

      if (
        partialIsEqual(d, {
          Type: 1,
          Operation: 10,
          Condition: 6,
          LogicOperator: 8,
          Val5: 0,
          Val6: 9212,
          Val7: 0,
          Val8: 0,
          Val9: 0,
        }) ||
        partialIsEqual(d, {
          Type: 1,
          Operation: 10,
          Condition: 5,
          LogicOperator: 8,
          Val5: 0,
          Val6: 9212,
          Val7: 1,
          Val8: 0,
          Val9: 0,
        })
      ) {
        return 'Requires Block or Parry';
      }

      if (
        partialIsEqual(d, {
          Type: 1,
          Operation: 10,
          Condition: 6,
          LogicOperator: 8,
          Val5: 0,
          Val6: 9166,
          Val7: 0,
          Val8: 0,
          Val9: 0,
        })
      ) {
        return 'Requires Target to have Parried or Blocked';
      }

      /* if (
        partialIsEqual(d, {
          Type: 1,
          Operation: 82,
          Condition: 6,
          LogicOperator: 8,
          Val5: 0,
          Val6: 7,
          Val7: 0,
          Val8: 0,
          Val9: 0,
        })
      ) {
        return 'Only usable after an enemy Disrupts one of your spells';
      } */

      // White Lion pet
      if (
        partialIsEqual(d, {
          Type: 1,
          Operation: 6,
          Condition: 6,
          LogicOperator: 8,
          Val5: 0,
          Val6: 725,
          Val7: 0,
          Val8: 0,
          Val9: 0,
        })
      ) {
        return 'Requires an active pet';
      }

      if (
        partialIsEqual(d, {
          Type: 1,
          Operation: 6,
          Condition: 6,
          LogicOperator: 8,
          Val5: 0,
          Val6: 723,
          Val7: 0,
          Val8: 0,
          Val9: 0,
        })
      ) {
        return 'Requires a summoned minion';
      }

      if (
        partialIsEqual(d, {
          Type: 1,
          Operation: 6,
          Condition: 6,
          LogicOperator: 8,
          Val5: 0,
          Val6: 79,
          Val7: 0,
          Val8: 0,
          Val9: 0,
        })
      ) {
        return 'Requires a Turret';
      }

      // Squig Herder pet
      if (
        partialIsEqual(d, {
          Type: 1,
          Operation: 80,
          Condition: 2,
          LogicOperator: 8,
          Val5: 0,
          Val6: 0,
          Val7: 0,
          Val8: 0,
          Val9: 0,
        })
      ) {
        return 'Requires an active pet';
      }

      if (
        partialIsEqual(d, {
          Type: 1,
          Operation: 6,
          Condition: 1,
          LogicOperator: 8,
          Val5: 0,
          Val6: 114,
          Val7: 1,
          Val8: 0,
          Val9: 0,
        })
      ) {
        return 'Requires Squig Armor';
      }

      if (
        partialIsEqual(d, {
          Type: 1,
          Operation: 3,
          Condition: 5,
          LogicOperator: 8,
          Val5: 0,
          Val6: 318,
          Val7: 1,
          Val8: 0,
          Val9: 0,
        })
      ) {
        return 'Frenzy - Requires Blood Lust<br>Costs 20% fewer action points per Blood Lust spent';
      }

      if (
        partialIsEqual(d, {
          Type: 1,
          Operation: 3,
          Condition: 5,
          LogicOperator: 8,
          Val5: 0,
          Val6: 318,
          Val7: 1,
          Val8: 0,
          Val9: 0,
        }) ||
        partialIsEqual(d, {
          Type: 1,
          Operation: 3,
          Condition: 5,
          LogicOperator: 8,
          Val5: 0,
          Val6: 305,
          Val7: 1,
          Val8: 0,
          Val9: 0,
        })
      ) {
        return 'Execution - Requires Accusations<br>Requires Pistol<br>Costs 20% fewer action points per Accusation spent';
      }

      if (
        partialIsEqual(d, {
          Type: 1,
          Operation: 3,
          Condition: 1,
          LogicOperator: 8,
          Val5: 0,
          Val6: 352,
          Val7: 1,
          Val8: 0,
          Val9: 0,
        })
      ) {
        return 'Requires Improved Balance<br>Leads to Perfect Balance';
      }

      if (
        partialIsEqual(d, {
          Type: 1,
          Operation: 3,
          Condition: 1,
          LogicOperator: 8,
          Val5: 0,
          Val6: 352,
          Val7: 2,
          Val8: 0,
          Val9: 0,
        })
      ) {
        return 'Requires Perfect Balance<br>Leads to Normal Balance';
      }

      if (
        partialIsEqual(d, {
          Type: 1,
          Operation: 3,
          Condition: 1,
          LogicOperator: 8,
          Val5: 0,
          Val6: 576,
          Val7: 1,
          Val8: 0,
          Val9: 0,
        })
      ) {
        return 'Needs da\' Gud Plan!<br>Leads to da\' Best Plan!!';
      }

      if (
        partialIsEqual(d, {
          Type: 1,
          Operation: 3,
          Condition: 1,
          LogicOperator: 8,
          Val5: 0,
          Val6: 576,
          Val7: 2,
          Val8: 0,
          Val9: 0,
        })
      ) {
        return 'Needs da\' Best Plan!!<br>No Plan after dis!';
      }

      if (
        partialIsEqual(d, {
          Type: 1,
          Operation: 6,
          Condition: 6,
          LogicOperator: 8,
          Val5: 0,
          Val6: 456,
          Val7: 0,
          Val8: 0,
          Val9: 0,
        })
      ) {
        switch (gameAbility.CareerID) {
          case CareerLine.WITCH_ELF:
            return 'Requires Prowling';
          case CareerLine.WITCH_HUNTER:
            return 'Requires Incognito';
        }
      }

      // Costs mechanic
      if (
        partialIsEqual(d, {
          Type: 1,
          Operation: 3,
          Condition: 5,
          LogicOperator: 8,
          Val5: 0,
          Val8: 0,
          Val9: 0,
        })
      ) {
        const costStr = (() => {
          switch (d.Val6) {
            case 52:
              return `Requires ${d.Val7} Grudge`;
            case 379:
              return `Requires ${d.Val7} Soul Essence`;
            case 420:
              return `Costs ${d.Val7} Dark Magic`;
            case 520:
              return `Requires ${d.Val7} Righteous Fury`;
            default:
              return `Costs ${d.Val7} mechanic ${d.Val6}`;
          }
        })();

        if (gameAbility.Flags & AbilityFlags.CHANNEL) {
          return `${costStr} per second`;
        } else {
          return costStr;
        }
      }

      if (
        partialIsEqual(d, {
          Type: 1,
          Operation: 10,
          Condition: 1,
          LogicOperator: 8,
          Val5: 0,
          Val7: 1,
          Val8: 0,
          Val9: 0,
        })
      ) {
        switch (d.Val6) {
          case 9119:
            return 'Requires Gift of Savagery';
          case 9120:
            return 'Requires Gift of Brutality';
          case 9121:
            return 'Requires Gift of Monstrosity';
          case 9122:
            return 'Requires a Mutation';
          case 9162:
            return 'Requires Gift of Monstrosity or Savagery';
          case 9163:
            return 'Requires Gift of Brutality or Monstrosity';
          case 9164:
            return 'Requires Gift of Savagery or Brutality';
        }
      }

      if (
        partialIsEqual(d, {
          Type: 1,
          Operation: 10,
          Condition: 1,
          LogicOperator: 8,
          Val5: 0,
          Val6: 9229,
          Val7: 1,
          Val8: 0,
          Val9: 0,
        })
      ) {
        return 'Target must be facing away from you';
      }

      if (
        partialIsEqual(d, {
          Type: 1,
          Operation: 3,
          Condition: 5,
          LogicOperator: 8,
          Val5: 0,
          Val6: 1125,
          Val7: 25,
          Val8: 0,
          Val9: 0,
        }) ||
        partialIsEqual(d, {
          Type: 1,
          Operation: 3,
          Condition: 5,
          LogicOperator: 8,
          Val5: 0,
          Val6: 1151,
          Val7: 25,
          Val8: 0,
          Val9: 0,
        })
      ) {
        return 'Must be Furious or Berserk<br>Exhausts your Rage';
      }

      return null;
    })
    .filter(n => n !== null);

  console.log(dataStrs);

  const labelStr = gameAbility.Labels.map(label => labelMap[label]).filter(
    n => n !== undefined,
  );

  const note = [...labelStr].join('<br>');

  if (ability.note !== note) {
    console.log(
      ability.name,
      colors.blue(ability.note),
      '!=',
      colors.red(note),
    );
    // console.log(gameAbility.Data);
    console.log(gameAbility.Labels);

    /* gameAbility.Components.forEach(c => console.log(c?.Data)); */
  }

  return {};
};

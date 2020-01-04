import colors from 'colors';
import inquirer from 'inquirer';
import { promises as fs } from 'fs';

import { readTextFile } from './readTextFile';
import { readAbilities } from './abilityDecoder';
import { readComponents, structureComponents } from './abilityComponents';
import { structureAbilities, AbilityData } from './structureAbilities';
import { stringMatch } from './utilities';

import { CareerLine, AbilityType, AbilityFlags, Stats } from './types';

import archmage from '../data/abilities/archmage.json';
import blackOrc from '../data/abilities/black-orc.json';
import blackGuard from '../data/abilities/black-guard.json';
import brightWizard from '../data/abilities/bright-wizard.json';
import choppa from '../data/abilities/choppa.json';
import chosen from '../data/abilities/chosen.json';
import discipleOfKhaine from '../data/abilities/disciple-of-khaine.json';
import engineer from '../data/abilities/engineer.json';
import ironbreaker from '../data/abilities/ironbreaker.json';
import knightOfTheBlazingSun from '../data/abilities/knight-of-the-blazing-sun.json';
import magus from '../data/abilities/magus.json';
import marauder from '../data/abilities/marauder.json';
import runePriest from '../data/abilities/rune-priest.json';
import shadowWarrior from '../data/abilities/shadow-warrior.json';
import shaman from '../data/abilities/shaman.json';
import slayer from '../data/abilities/slayer.json';
import sorcerer from '../data/abilities/sorcerer.json';
import squigHerder from '../data/abilities/squig-herder.json';
import swordMaster from '../data/abilities/sword-master.json';
import warriorPriest from '../data/abilities/warrior-priest.json';
import whiteLion from '../data/abilities/white-lion.json';
import witchElf from '../data/abilities/witch-elf.json';
import witchHunter from '../data/abilities/witch-hunter.json';
import zealot from '../data/abilities/zealot.json';

import { Career, Ability } from '../helpers/abilities';
import { validateNote } from './validateNote';
import { validateDescription } from './validateDescription';
import { validateComponentValues } from './validateComponentValues';

const careerData: {
  archmage: Career;
  'black-guard': Career;
  'black-orc': Career;
  'bright-wizard': Career;
  choppa: Career;
  chosen: Career;
  'disciple-of-khaine': Career;
  engineer: Career;
  ironbreaker: Career;
  'knight-of-the-blazing-sun': Career;
  magus: Career;
  marauder: Career;
  'rune-priest': Career;
  'shadow-warrior': Career;
  shaman: Career;
  slayer: Career;
  sorcerer: Career;
  'squig-herder': Career;
  'sword-master': Career;
  'warrior-priest': Career;
  'white-lion': Career;
  'witch-elf': Career;
  'witch-hunter': Career;
  zealot: Career;
} = {
  archmage,
  'black-guard': blackGuard,
  'black-orc': blackOrc,
  'bright-wizard': brightWizard,
  choppa,
  chosen,
  'disciple-of-khaine': discipleOfKhaine,
  engineer,
  ironbreaker,
  'knight-of-the-blazing-sun': knightOfTheBlazingSun,
  magus,
  marauder,
  'rune-priest': runePriest,
  'shadow-warrior': shadowWarrior,
  shaman,
  slayer,
  sorcerer,
  'squig-herder': squigHerder,
  'sword-master': swordMaster,
  'warrior-priest': warriorPriest,
  'white-lion': whiteLion,
  'witch-elf': witchElf,
  'witch-hunter': witchHunter,
  zealot,
} as const;

const logAbilityError = (ability: Ability, error: string) => {
  console.warn(
    `Ability: "${ability.name}" (${ability.gameId})`,
    colors.red(error),
  );
};

// Validate cooldown
const validateCooldown = (
  ability: Ability,
  gameAbility: AbilityData,
): Partial<Ability> => {
  const cooldown = ((): string => {
    if (gameAbility.Cooldown === 0) {
      return 'No cooldown';
    }

    if (gameAbility.Cooldown > 60 * 1000) {
      return `${gameAbility.Cooldown / (60 * 1000)}m cooldown`;
    }

    return `${gameAbility.Cooldown / 1000}s cooldown`;
  })();

  if (ability.cooldown !== cooldown) {
    logAbilityError(ability, `Cooldown ${ability.cooldown} != ${cooldown}`);
    return { cooldown };
  }
  return {};
};

// Validate minRank
const validateMinRank = (
  ability: Ability,
  gameAbility: AbilityData,
): Partial<Ability> => {
  const minRank = (gameAbility.MinLevel || 1).toString();

  if (ability.minrank !== minRank) {
    logAbilityError(ability, `minrank ${ability.minrank} != ${minRank}`);
    return { minrank: minRank };
  }
  return {};
};

// Validate AP cost
const validateAPCost = (
  ability: Ability,
  gameAbility: AbilityData,
): Partial<Ability> => {
  const cost = ((): string => {
    if (gameAbility.AP > 0 && gameAbility.ChannelInterval > 0) {
      return `${Math.round(
        gameAbility.AP / (gameAbility.ChannelInterval / 1000),
      )} Action Points / Sec`;
    }

    if (gameAbility.AP > 0) {
      return `${gameAbility.AP} Action Points`;
    }

    if (gameAbility.AbilityType === AbilityType.TACTIC) {
      return 'Tactic';
    }

    if (gameAbility.AbilityType == AbilityType.MORALE) {
      return `Rank ${gameAbility.MoraleLevel} morale`;
    }

    return 'No AP Cost';
  })();

  if (ability.cost !== cost) {
    logAbilityError(ability, `cost ${ability.cost} != ${cost}`);
    return { cost };
  }
  return {};
};

// Validate mastery
const validateMastery = (
  ability: Ability,
  gameAbility: AbilityData,
  career: Career,
) => {
  const spec = ((): string => {
    if (gameAbility.Specialization === 0) {
      return 'Core Ability';
    }
    if (gameAbility.Specialization === 1) {
      return career.mastery.a.name;
    }
    if (gameAbility.Specialization === 2) {
      return career.mastery.b.name;
    }
    if (gameAbility.Specialization === 3) {
      return career.mastery.c.name;
    }
    throw new Error(
      `Unknown Specialization ${gameAbility.Specialization}, ability ${gameAbility.AbilityID}`,
    );
  })();

  if (ability.spec !== spec) {
    logAbilityError(ability, `spec ${ability.spec} != ${spec}`);
    return { spec };
  }
  return {};
};

// Validate Cast Time
const validateCastTime = (
  ability: Ability,
  gameAbility: AbilityData,
): Partial<Ability> => {
  const castTime = ((): string => {
    if (
      gameAbility.Castime === 0 &&
      (gameAbility.AbilityType === AbilityType.PASSIVE ||
        gameAbility.AbilityType === AbilityType.TACTIC)
    ) {
      return 'Passive';
    }

    const msCastTime = ((): number => {
      if (gameAbility.Castime > 0) {
        return gameAbility.Castime;
      }

      // Firball Barrage seems to have a 60m duration component though !?!
      // So filter that out
      if (gameAbility.Flags & AbilityFlags.CHANNEL) {
        return Math.max(
          ...gameAbility.Components.map(c => c.Duration).filter(d => d < 30000),
        );
      }

      return gameAbility.Castime;
    })();

    if (msCastTime === 0) {
      return 'Instant cast';
    }
    if (msCastTime >= 60000) {
      return `${msCastTime / 60000}m cast`;
    }

    if (msCastTime < 10000) {
      return `${(msCastTime / 1000).toFixed(1)}s cast`;
    }

    return `${msCastTime / 1000}s cast`;
  })();

  if (ability.incant !== castTime) {
    logAbilityError(ability, `incant ${ability.incant} != ${castTime}`);

    return { incant: castTime };
  }

  return {};
};

// Validate range
const validateRange = (
  ability: Ability,
  gameAbility: AbilityData,
): Partial<Ability> => {
  const range = ((): string => {
    if (gameAbility.Range > 0) {
      if (gameAbility.A44 > 0) {
        return `${gameAbility.A44 / 12} - ${gameAbility.Range / 12}ft range`;
      }
      return `${gameAbility.Range / 12}ft range`;
    }

    return 'Self';
  })();

  if (ability.range !== range) {
    logAbilityError(ability, `Range ${ability.range} != ${range}`);
    return { range };
  }
  return {};
};

const validateName = (
  ability: Ability,
  gameAbility: AbilityData,
): Partial<Ability> => {
  const name = gameAbility.Name;

  if (ability.name !== name) {
    logAbilityError(ability, `name ${ability.name} != ${name}`);
    return { name };
  }
  return {};
};

// Validate single ability
const validateAbility = async (
  ability: Ability,
  abilityData: { [key: number]: AbilityData },
  career: Career,
  careerId: number, // Used to filter out selection of abilities to only ones from current career
  stats: Stats,
): Promise<Ability> => {
  if (ability.gameId === undefined) {
    const matchingName = Object.values(abilityData).filter(
      gameAbility =>
        gameAbility.Name === ability.name &&
        (gameAbility.CareerID === 0 || gameAbility.CareerID === careerId) &&
        gameAbility.Description !== undefined,
    );

    // How many characters of description match for each skill
    const descriptionMatch = [
      '',
      ...matchingName.map(gameAbility => gameAbility.Description || ''),
    ].map(description => stringMatch(ability.description, description));

    // Only one ability matches, and description seems to match as well
    if (matchingName.length === 1 && descriptionMatch[1] > 0) {
      return { ...ability, gameId: matchingName[0].AbilityID };
    }

    const gameId = await inquirer.prompt({
      type: 'list',
      name: 'gameId',
      message: `Select gameId attribute for ${colors.green(
        ability.name,
      )}\n${colors.yellow(ability.description)}`,
      choices: [
        { name: 'None', value: null },
        ...matchingName.map(gameAbility => ({
          name: `(CID: ${gameAbility.CareerID}) ${gameAbility.AbilityID}: ${gameAbility.Description}`,
          value: gameAbility.AbilityID,
        })),
      ],
      default: descriptionMatch.findIndex(
        n => n === Math.max(...descriptionMatch),
      ),
    });
    if (gameId.gameId) {
      return { ...ability, gameId: gameId.gameId };
    }
    return ability;
  }
  const gameAbility = abilityData[ability.gameId];

  /* if (
    gameAbility.Components.find(
      component => component.Operation === ComponentOP.MECHANIC_CHANGE,
    )
  ) {
    logAbility(gameAbility);
    gameAbility.Components.forEach(logComponent);
  } */

  return {
    ...ability,
    ...validateCooldown(ability, gameAbility),
    ...validateMinRank(ability, gameAbility),
    ...validateMastery(ability, gameAbility, career),
    ...validateCastTime(ability, gameAbility),
    ...validateRange(ability, gameAbility),
    ...validateAPCost(ability, gameAbility),
    ...validateName(ability, gameAbility),
    ...validateNote(ability, gameAbility),
    ...validateComponentValues(ability, gameAbility, stats, abilityData),
    ...validateDescription(ability, gameAbility),
  };
};

// Validate one career
const validateCareer = async (
  careerSlug: keyof typeof careerData,
  careerId: number,
  stats: Stats,
  abilityData: { [key: number]: AbilityData },
): Promise<void> => {
  console.log(colors.green(`\nValidating ${careerSlug}`));
  const career = careerData[careerSlug];

  let fixedAbilities = [];
  for (const ability of career.data.filter(
    ability => ability.category !== 'TomeTactic',
  )) {
    fixedAbilities.push(
      await validateAbility(ability, abilityData, career, careerId, stats),
    );
  }

  await fs.writeFile(
    `../data/abilities/${careerSlug}.json`,
    JSON.stringify(
      {
        ...career,
        data: fixedAbilities,
      },
      undefined,
      2,
    ),
  );
  return;
};

// Read data and validate
const main = async () => {
  const abilityNames = await readTextFile('data/abilitynames.txt', 'utf16be');
  const abilityDescriptions = await readTextFile(
    'data/abilitydesc.txt',
    'utf16be',
  );
  const abilityResults = await readTextFile(
    'data/abilityresults.txt',
    'utf16le',
  );
  const abilityComponents = structureComponents(await readComponents());
  // TODO: Promise.all refactor this
  const abilityData = structureAbilities(
    await readAbilities(),
    abilityNames,
    abilityDescriptions,
    abilityComponents,
    abilityResults,
  );

  // Debug
  const printDebugAbilities: number[] = [9478, 9249, 3437];
  printDebugAbilities.forEach(abilityId => {
    console.log(JSON.stringify(abilityData[abilityId], undefined, 2));
  });

  /* await validateCareer(
    'ironbreaker',
    CareerLine.IRON_BREAKER,
    {
      strength: 147,
      ballisticSkill: 98,
      intelligence: 74,
      willpower: 172,
    },
    abilityData,
  );
  await validateCareer(
    'slayer',
    CareerLine.SLAYER,
    {
      strength: 221,
      ballisticSkill: 96,
      intelligence: 72,
      willpower: 123,
    },
    abilityData,
  );
  await validateCareer(
    'rune-priest',
    CareerLine.RUNE_PRIEST,
    {
      strength: 98,
      ballisticSkill: 74,
      intelligence: 226,
      willpower: 222,
    },
    abilityData,
  );
  await validateCareer(
    'engineer',
    CareerLine.ENGINEER,
    {
      strength: 137,
      ballisticSkill: 221,
      intelligence: 74,
      willpower: 123,
    },
    abilityData,
  );

  // TODO: fix stats
  await validateCareer(
    'black-orc',
    CareerLine.BLACK_ORC,
    {
      strength: 172,
      ballisticSkill: 74,
      intelligence: 99,
      willpower: 221,
    },
    abilityData,
  );
  await validateCareer(
    'choppa',
    CareerLine.CHOPPA,
    {
      strength: 172,
      ballisticSkill: 74,
      intelligence: 99,
      willpower: 221,
    },
    abilityData,
  );
  await validateCareer(
    'shaman',
    CareerLine.SHAMAN,
    {
      strength: 172,
      ballisticSkill: 74,
      intelligence: 99,
      willpower: 221,
    },
    abilityData,
  );
  await validateCareer(
    'squig-herder',
    CareerLine.SQUIG_HERDER,
    {
      strength: 172,
      ballisticSkill: 74,
      intelligence: 99,
      willpower: 221,
    },
    abilityData,
  );
  await validateCareer(
    'witch-hunter',
    CareerLine.WITCH_HUNTER,
    {
      strength: 172,
      ballisticSkill: 74,
      intelligence: 99,
      willpower: 221,
    },
    abilityData,
  );
  await validateCareer(
    'knight-of-the-blazing-sun',
    CareerLine.KNIGHT_OF_THE_BLAZING_SUN,
    {
      strength: 172,
      ballisticSkill: 74,
      intelligence: 99,
      willpower: 221,
    },
    abilityData,
  );
  await validateCareer(
    'bright-wizard',
    CareerLine.BRIGHT_WIZARD,
    {
      strength: 172,
      ballisticSkill: 74,
      intelligence: 99,
      willpower: 221,
    },
    abilityData,
  ); */
  await validateCareer(
    'warrior-priest',
    CareerLine.WARRIOR_PRIEST,
    {
      strength: 172,
      ballisticSkill: 74,
      intelligence: 99,
      willpower: 221,
    },
    abilityData,
  );
  await validateCareer(
    'chosen',
    CareerLine.CHOSEN,
    {
      strength: 197,
      ballisticSkill: 74,
      intelligence: 99,
      willpower: 148,
    },
    abilityData,
  );
  await validateCareer(
    'marauder',
    CareerLine.MARAUDER,
    {
      strength: 221,
      ballisticSkill: 99,
      intelligence: 74,
      willpower: 197,
    },
    abilityData,
  );
  await validateCareer(
    'zealot',
    CareerLine.ZEALOT,
    {
      strength: 99,
      ballisticSkill: 74,
      intelligence: 196,
      willpower: 221,
    },
    abilityData,
  );
  await validateCareer(
    'magus',
    CareerLine.MAGUS,
    {
      strength: 98,
      ballisticSkill: 74,
      intelligence: 221,
      willpower: 172,
    },
    abilityData,
  );
  await validateCareer(
    'sword-master',
    CareerLine.SWORD_MASTER,
    {
      strength: 147,
      ballisticSkill: 74,
      intelligence: 123,
      willpower: 98,
    },
    abilityData,
  );
  await validateCareer(
    'shadow-warrior',
    CareerLine.SHADOW_WARRIOR,
    {
      strength: 172,
      ballisticSkill: 221,
      intelligence: 74,
      willpower: 98,
    },
    abilityData,
  );
  await validateCareer(
    'white-lion',
    CareerLine.WHITE_LION,
    {
      strength: 196,
      ballisticSkill: 74,
      intelligence: 98,
      willpower: 123,
    },
    abilityData,
  );
  await validateCareer(
    'archmage',
    CareerLine.ARCHMAGE,
    {
      strength: 98,
      ballisticSkill: 74,
      intelligence: 196,
      willpower: 221,
    },
    abilityData,
  );
  await validateCareer(
    'black-guard',
    CareerLine.BLACK_GUARD,
    {
      strength: 147,
      ballisticSkill: 98,
      intelligence: 74,
      willpower: 133,
    },
    abilityData,
  );
  await validateCareer(
    'witch-elf',
    CareerLine.WITCH_ELF,
    {
      strength: 172,
      ballisticSkill: 74,
      intelligence: 98,
      willpower: 147,
    },
    abilityData,
  );
  await validateCareer(
    'disciple-of-khaine',
    CareerLine.DISCIPLE_OF_KHAINE,
    {
      strength: 172,
      ballisticSkill: 74,
      intelligence: 98,
      willpower: 221,
    },
    abilityData,
  );
  await validateCareer(
    'sorcerer',
    CareerLine.SORCERESS,
    {
      strength: 98,
      ballisticSkill: 74,
      intelligence: 221,
      willpower: 196,
    },
    abilityData,
  );
};

main()
  .then()
  .catch(err => {
    console.error(err);
  });

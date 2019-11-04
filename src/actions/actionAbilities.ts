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

import { Career } from '../helpers/abilities';

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

type CareerKeys = keyof typeof careerData;

export const FETCH_ABILITIES = 'fetch_abilities';
export const RESET_ABILITIES = 'reset_abilities';

export function fetchAbilities(slug: string) {
  if (Object.keys(careerData).includes(slug)) {
    return {
      type: FETCH_ABILITIES,
      payload: careerData[slug as CareerKeys],
    } as const;
  }
  throw new Error(`Invalid career ${slug}`);
}

export function resetAbilities() {
  return {
    type: RESET_ABILITIES,
    payload: null,
  } as const;
}

export type FetchAbilitiesAction = ReturnType<typeof fetchAbilities>;

export type ResetAbilitiesAction = ReturnType<typeof resetAbilities>;

export type AbilitiesAction = FetchAbilitiesAction | ResetAbilitiesAction;

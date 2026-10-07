import { Career } from '__generated__/graphql';

export type Realm = 'Order' | 'Destruction';

const ORDER_CAREERS: Career[] = [
  Career.Archmage,
  Career.BrightWizard,
  Career.Engineer,
  Career.IronBreaker,
  Career.KnightOfTheBlazingSun,
  Career.RunePriest,
  Career.ShadowWarrior,
  Career.Slayer,
  Career.SwordMaster,
  Career.WarriorPriest,
  Career.WhiteLion,
  Career.WitchHunter,
];

const DESTRUCTION_CAREERS: Career[] = [
  Career.BlackGuard,
  Career.BlackOrc,
  Career.Choppa,
  Career.Chosen,
  Career.DiscipleOfKhaine,
  Career.Magus,
  Career.Marauder,
  Career.Shaman,
  Career.Sorcerer,
  Career.SquigHerder,
  Career.WitchElf,
  Career.Zealot,
];

export const CAREERS_BY_REALM: Record<Realm, Career[]> = {
  Order: ORDER_CAREERS,
  Destruction: DESTRUCTION_CAREERS,
};

export const careerRealm = (career: Career): Realm =>
  ORDER_CAREERS.includes(career) ? 'Order' : 'Destruction';

export const enumLabel = (value: string): string =>
  value
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

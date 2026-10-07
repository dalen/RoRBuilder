import { Career } from '__generated__/graphql';

export interface MasteryAbility {
  id: number;
  name: string;
  iconUrl: string;
  type: string;
  category: string;
  minRank: number;
  cost: string;
  range: string;
  castTime: string;
  cooldown: string;
  note: string;
  description: string;
}

export interface MasteryPathTierAbility {
  tier: number;
  pointsRequired: number;
  ability: MasteryAbility;
}

export interface MasteryPath {
  key: 'a' | 'b' | 'c';
  name: string;
  description: string;
  tierAbilities: MasteryPathTierAbility[];
  coreAbilities: MasteryAbility[];
}

export interface CareerMasteryData {
  career: Career;
  paths: MasteryPath[];
  coreAbilities: MasteryAbility[];
}

const cache = new Map<Career, Promise<CareerMasteryData>>();

const plannerAssetUrl = (path: string): string => {
  const base = globalThis.location.pathname.startsWith('/loadout')
    ? '/loadout'
    : '';
  return `${base}${path}`;
};

/**
 * Lazily fetches a career's mastery/tactics/morale ability data. Cached per
 * career for the lifetime of the page so switching back and forth doesn't
 * re-fetch. Data is our own restructured export (see public/data/abilities);
 * it is sourced from Return of Reckoning's own game data, cross-referenced
 * against the community's builder.returnofreckoning.com project with the
 * author's explicit permission to reuse.
 */
export function getCareerMasteryData(
  career: Career,
): Promise<CareerMasteryData> {
  let promise = cache.get(career);
  if (!promise) {
    promise = fetch(plannerAssetUrl(`/data/abilities/${career}.json`)).then(
      (res) => {
        if (!res.ok)
          throw new Error(`Failed to load mastery data for ${career}`);
        return res.json() as Promise<CareerMasteryData>;
      },
    );
    cache.set(career, promise);
  }
  return promise;
}

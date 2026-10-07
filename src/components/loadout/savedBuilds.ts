import { Career, EquipSlot } from '__generated__/graphql';
import type { LoadoutItem } from 'components/loadout/loadoutStats';
import type { MasteryPathPoints } from 'components/loadout/MasteryBuilder';
import type { RenownSelections } from 'components/loadout/renownAbilities';

const STORAGE_KEY = 'rorbuilder.saved-builds.v1';

export interface BuildSnapshot {
  name: string;
  description: string;
  career: Career;
  level: number;
  renownRank: number;
  characterName: string;
  loadout: Partial<Record<EquipSlot, LoadoutItem>>;
  renownSelections: RenownSelections;
  masteryPathPoints: MasteryPathPoints;
  acquiredTierAbilityIds: number[];
  selectedTactics: number[];
  selectedMorales: number[];
  hasSovereign: boolean;
}

export interface SavedBuild extends BuildSnapshot {
  id: string;
  createdAt: string;
  updatedAt: string;
}

const isSavedBuild = (value: unknown): value is SavedBuild => {
  if (!value || typeof value !== 'object') return false;
  const build = value as Record<string, unknown>;
  return (
    typeof build.id === 'string' &&
    typeof build.name === 'string' &&
    typeof build.description === 'string' &&
    typeof build.career === 'string' &&
    typeof build.level === 'number' &&
    typeof build.renownRank === 'number' &&
    typeof build.characterName === 'string' &&
    Boolean(build.loadout && typeof build.loadout === 'object') &&
    Boolean(
      build.renownSelections && typeof build.renownSelections === 'object',
    ) &&
    Boolean(
      build.masteryPathPoints && typeof build.masteryPathPoints === 'object',
    ) &&
    Array.isArray(build.acquiredTierAbilityIds) &&
    Array.isArray(build.selectedTactics) &&
    Array.isArray(build.selectedMorales) &&
    typeof build.hasSovereign === 'boolean' &&
    typeof build.createdAt === 'string' &&
    typeof build.updatedAt === 'string'
  );
};

export const readSavedBuilds = (): SavedBuild[] => {
  try {
    const parsed: unknown = JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? '[]',
    );
    return Array.isArray(parsed) ? parsed.filter(isSavedBuild) : [];
  } catch {
    return [];
  }
};

export const writeSavedBuilds = (builds: SavedBuild[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(builds));
};

export const parseImportedBuilds = (text: string): SavedBuild[] => {
  const parsed: unknown = JSON.parse(text);
  const candidates = Array.isArray(parsed) ? parsed : [parsed];
  const builds = candidates.filter(isSavedBuild);
  if (!builds.length)
    throw new Error('This file does not contain a valid Emissary build.');
  return builds;
};

export const newBuildId = (): string =>
  globalThis.crypto?.randomUUID?.() ??
  `build-${Date.now()}-${Math.random().toString(36).slice(2)}`;

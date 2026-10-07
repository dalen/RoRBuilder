import type { BuildSnapshot } from 'components/loadout/savedBuilds';

export interface TopBuild {
  id: string;
  name: string;
  description: string;
  career: string;
  level: number;
  renownRank: number;
  viewCount: number;
  trendingViews: number;
  updatedAt: string;
}

export const fetchTopBuilds = async (
  career = '',
  sort: 'trending' | 'views' | 'newest' = 'trending',
): Promise<TopBuild[]> => {
  void career;
  void sort;
  return [];
};

export const fetchPublishedBuild = async (
  id: string,
): Promise<BuildSnapshot> => {
  void id;
  throw new Error('Published builds require the official account API.');
};

export const publishBuild = async (
  build: BuildSnapshot,
  listed: boolean,
): Promise<string> => {
  void build;
  void listed;
  throw new Error('Publishing requires the official account API.');
};

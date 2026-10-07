import { type ReactElement, useState } from 'react';
import { gql } from '@apollo/client';
import { useApolloClient } from '@apollo/client/react';
import { Career, EquipSlot } from '__generated__/graphql';
import type { LoadoutItem } from 'components/loadout/loadoutStats';

const FIND_CHARACTERS_QUERY = gql`
  query FindCharacters($name: String!) {
    characters(where: { name: { eq: $name } }, first: 5) {
      nodes {
        id
        name
        career
        level
        renownRank
      }
    }
  }
`;

const CHARACTER_ARMORY_QUERY = gql`
  query CharacterArmoryForImport($id: ID!) {
    character(id: $id) {
      items {
        equipSlot
        item {
          id
          name
          iconUrl
          rarity
          type
          slot
          speed
          talismanSlots
          uniqueEquipped
          stats {
            stat
            value
            percentage
          }
          itemSet {
            id
            name
            bonuses {
              itemsRequired
              bonus {
                __typename
                ... on ItemStat {
                  stat
                  value
                  percentage
                }
              }
            }
          }
        }
        talismans {
          id
          name
          iconUrl
          rarity
          uniqueEquipped
          stats {
            stat
            value
            percentage
          }
        }
      }
    }
  }
`;

interface ImportedCharacter {
  career: Career;
  level: number;
  renownRank: number;
  characterName: string;
  loadout: Partial<Record<EquipSlot, LoadoutItem>>;
}

export const CharacterImport = ({
  onImport,
}: {
  onImport: (data: ImportedCharacter) => void;
}): ReactElement => {
  const client = useApolloClient();
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<
    {
      id: string;
      name: string;
      career: Career;
      level: number;
      renownRank: number;
    }[]
  >([]);

  const loadArmory = async (character: {
    id: string;
    name: string;
    career: Career;
    level: number;
    renownRank: number;
  }): Promise<void> => {
    setStatus('loading');
    setCandidates([]);
    try {
      const { data } = (await client.query({
        query: CHARACTER_ARMORY_QUERY,
        variables: { id: character.id },
        fetchPolicy: 'network-only',
      } as any)) as any;
      const items: any[] = data?.character?.items ?? [];
      const loadout: Partial<Record<EquipSlot, LoadoutItem>> = {};
      for (const entry of items) {
        const slot = entry.equipSlot as EquipSlot;
        const talismans: LoadoutItem[] = (entry.talismans ?? []).map(
          (t: any) => ({
            id: t.id,
            name: t.name,
            iconUrl: t.iconUrl,
            rarity: t.rarity,
            uniqueEquipped: t.uniqueEquipped,
            stats: t.stats,
          }),
        );
        loadout[slot] = {
          ...entry.item,
          talismans,
        };
      }
      onImport({
        career: character.career,
        level: character.level,
        renownRank: character.renownRank,
        characterName: character.name,
        loadout,
      });
      setStatus('idle');
      setName('');
    } catch {
      setError('Could not load that character’s gear.');
      setStatus('error');
    }
  };

  const handleSearch = async (): Promise<void> => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setStatus('loading');
    setError(null);
    try {
      const { data } = (await client.query({
        query: FIND_CHARACTERS_QUERY,
        variables: { name: trimmed },
        fetchPolicy: 'network-only',
      } as any)) as any;
      const nodes = data?.characters?.nodes ?? [];
      if (nodes.length === 0) {
        setError(`No character named "${trimmed}" found.`);
        setStatus('error');
        return;
      }
      if (nodes.length === 1) {
        await loadArmory(nodes[0]);
        return;
      }
      setCandidates(nodes);
      setStatus('idle');
    } catch {
      setError('Character lookup failed.');
      setStatus('error');
    }
  };

  return (
    <div className="control loadout-character-import">
      <div className="field has-addons">
        <div className="control">
          <input
            aria-label="Character name to import"
            className="input is-small"
            type="text"
            placeholder="Load character by name..."
            value={name}
            onChange={(event) => setName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                void handleSearch();
              }
            }}
            style={{ width: '11rem' }}
          />
        </div>
        <div className="control">
          <button
            type="button"
            className={`button is-small ${
              status === 'loading' ? 'is-loading' : ''
            }`}
            onClick={handleSearch}
            disabled={status === 'loading'}
          >
            <span className="icon is-small">
              <i className="fas fa-download" />
            </span>
            <span>Load</span>
          </button>
        </div>
      </div>
      {error && <p className="has-text-danger is-size-7 mt-1">{error}</p>}
      {candidates.length > 0 && (
        <div className="loadout-character-candidates">
          {candidates.map((c) => (
            <button
              type="button"
              key={c.id}
              className="button is-small is-fullwidth mb-1"
              onClick={() => loadArmory(c)}
            >
              {c.name} &middot; Rank {c.level} {c.career}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

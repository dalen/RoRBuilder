import React from 'react';
import { get } from 'lodash';

export enum SortConfigDirection {
  ascending = 'ascending',
  descending = 'descending',
}

export interface SortConfig {
  key: number | string;
  direction: SortConfigDirection;
}

export const useSortableData = <T>(
  items: T[],
  config: SortConfig | null = null,
) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    const sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const valA = get(a, sortConfig.key);
        const valB = get(b, sortConfig.key);

        if (valA === null && valB === null) {
          return 0;
        }
        if (typeof valA === 'string' && typeof valB === 'string') {
          if (valA.localeCompare(valB) === -1) {
            return sortConfig.direction === SortConfigDirection.ascending
              ? -1
              : 1;
          }

          if (valA.localeCompare(valB) === 1) {
            return sortConfig.direction === SortConfigDirection.ascending
              ? 1
              : -1;
          }
          return 0;
        }

        if (valA < valB) {
          return sortConfig.direction === SortConfigDirection.ascending
            ? -1
            : 1;
        }
        if (valA > valB) {
          return sortConfig.direction === SortConfigDirection.ascending
            ? 1
            : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key: string) => {
    let direction = SortConfigDirection.descending;
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === SortConfigDirection.descending
    ) {
      direction = SortConfigDirection.ascending;
    }
    setSortConfig({ direction, key });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

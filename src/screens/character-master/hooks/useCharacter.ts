import { useEffect, useState } from 'react';
import { getAllCharacters, getCharactersPaginated, searchAndFilterCharacters, type PaginatedResponse } from '../services/characterService';
import type { Character } from '../types/character';
import type { SearchFilterParams } from '../types/search-filter';

export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllCharacters()
      .then(data => {
        console.log('Fetched characters:', data);
        setCharacters(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError('Failed to fetch characters');
      })
      .finally(() => setLoading(false));
  }, []);

  return { characters, loading, error };
};


export const useCharactersPaginated = (refresh: number, pageSize = 12) => {
  const [data, setData] = useState<PaginatedResponse<Character> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    getCharactersPaginated(page - 1, pageSize)
      .then(setData)
      .catch(() => setError('Failed to fetch characters'))
      .finally(() => setLoading(false));
  }, [refresh, page, pageSize]);

  return {
    characters: data?.content || [],
    total: data?.totalElements || 0,
    loading,
    error,
    page,
    setPage,
    pageSize,
  };
};

export const useSearchFilterCharacters = (
  pageSize = 12,
  defaultParams: SearchFilterParams = {}
) => {
  const [data, setData] = useState<PaginatedResponse<Character> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [params, setParams] = useState<SearchFilterParams>(defaultParams);
  const [refresh, setRefresh] = useState(0);

  const [debouncedParams, setDebouncedParams] = useState(params);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedParams(params);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [params]);

  useEffect(() => {
    setLoading(true);
    const { searchTerm, filter, sortBy = 'id', sortDirection = 'asc' } = debouncedParams;

    searchAndFilterCharacters(
      searchTerm,
      filter,
      page - 1,
      pageSize,
      sortBy,
      sortDirection
    )
      .then(setData)
      .catch((err) => {
        console.error('Search error:', err);
        setError('Failed to search characters');
      })
      .finally(() => setLoading(false));
  }, [debouncedParams, page, pageSize, refresh]);

  const updateParams = (newParams: Partial<SearchFilterParams>) => {
    setParams(prevParams => ({
      ...prevParams,
      ...newParams,
    }));

    setPage(1);
  };

  const refreshData = () => setRefresh(r => r + 1);

  return {
    characters: data?.content || [],
    total: data?.totalElements || 0,
    loading,
    error,
    page,
    setPage,
    pageSize,
    params,
    updateParams,
    refreshData,
  };
};

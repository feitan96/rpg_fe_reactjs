import { useEffect, useState } from 'react';
import { getAllCharacters, getCharactersPaginated, type PaginatedResponse } from '../services/characterService';
import type { Character } from '../types/character';

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


export const useCharactersPaginated = (refresh: number, pageSize = 10) => {
  const [data, setData] = useState<PaginatedResponse<Character> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1); // AntD Table is 1-based

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
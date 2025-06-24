import axios from 'axios';
import type { Character } from '../types/character';

const API_BASE = '/api/v1/characters';

// Retrieves all characters from the API and returns them as an array.
export const getAllCharacters = async (): Promise<Character[]> => {
  const response = await axios.get<Character[]>(API_BASE);
    return Array.isArray(response.data) ? response.data : [];
};

//Rerieves all characters from the API in a paginated format.
// The response includes the content (array of characters), total elements, total pages, current page
export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

// Fetches characters in a paginated format
export const getCharactersPaginated = async (
  page: number,
  size: number,
  sortBy = 'id',
  sortDirection = 'asc'
): Promise<PaginatedResponse<Character>> => {
  const response = await axios.get(`${API_BASE}/paginated`, {
    params: { page, size, sortBy, sortDirection },
  });
  return response.data;
};

// Fetch a single character by ID
export const createCharacter = async (
  character: Omit<Character, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Character> => {
  const endpoint = character.type === 'HERO' ? `${API_BASE}/hero` : `${API_BASE}/villain`;
  const response = await axios.post<Character>(endpoint, character);
  return response.data;
};


// Fetch a single character by ID
export const updateCharacter = async (
  id: number,
  character: Omit<Character, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Character> => {
  const response = await axios.put<Character>(`/api/v1/characters/${id}`, character);
  return response.data;
};

// Soft deleted a character by ID
export const softDeleteCharacter = async (id: number) => {
  await axios.patch(`${API_BASE}/${id}/soft-delete`);
};

// Permanently delete a character by ID
export const hardDeleteCharacter = async (id: number) => {
  await axios.delete(`${API_BASE}/${id}`);
};

// Search and filter characters with pagination
export const searchAndFilterCharacters = async (
  searchTerm?: string,
  filter?: Partial<Character>,
  page: number = 0,
  size: number = 10,
  sortBy: string = 'id',
  sortDirection: string = 'asc'
): Promise<PaginatedResponse<Character>> => {
  const params = {
    searchTerm,
    page,
    size,
    sortBy,
    sortDirection,
    ...filter
  };

  const response = await axios.get(`${API_BASE}/search`, { params });
  return response.data;
};

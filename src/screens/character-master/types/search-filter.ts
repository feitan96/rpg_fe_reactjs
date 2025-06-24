export interface SearchFilterParams {
  searchTerm?: string;
  filter?: {
    name?: string;
    type?: string;
    classification?: string;
    minBaseHealth?: number;
    maxBaseHealth?: number;
    minBaseAttack?: number;
    maxBaseAttack?: number;
    minBaseMagic?: number;
    maxBaseMagic?: number;
    minBasePhysicalDefense?: number;
    maxBasePhysicalDefense?: number;
    minBaseMagicalDefense?: number;
    maxBaseMagicalDefense?: number;
    minBaseSpeed?: number;
    maxBaseSpeed?: number;
  };
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}


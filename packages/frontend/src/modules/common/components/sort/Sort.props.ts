import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type StatusType = 'All' | 'Public' | 'Completed' | 'Private' | '';

export interface SortProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {

  status: StatusType;
  search: string;
    setSearchParams: (params: { search: string, status: StatusType }) => void;
  handleClearFilters: () => void
  onFilterChange: (filterName: string) => void;
}

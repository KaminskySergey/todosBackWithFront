enum SortName {
  All = 'All',
  Private = 'Private',
  Public = 'Public',
  Completed = 'Completed'

}

export const sortInfo = [
  { id: 1, name: SortName.All },
  { id: 2, name: SortName.Private },
  { id: 3, name: SortName.Public },
  { id: 4, name: SortName.Completed }

];

export const initValue = {
  search: '',
  status: '',
};

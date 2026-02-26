export const SearchInputMode = {
  Countries: 'countries',
  Search: 'search',
} as const;

export type SearchInputModeType = (typeof SearchInputMode)[keyof typeof SearchInputMode];

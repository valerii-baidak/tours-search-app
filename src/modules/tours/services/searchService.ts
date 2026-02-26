import {
  startSearchPrices,
  getSearchPrices,
  stopSearchPrices,
  type StartSearchPricesResponse,
  type SearchPricesResponse,
} from '../../../mock/api';

const searchCache = new Map<string, SearchPricesResponse>();

export const getCachedPrices = (countryId: string): SearchPricesResponse | null => {
  return searchCache.get(countryId) ?? null;
};

const setCachedPrices = (countryId: string, data: SearchPricesResponse) => {
  searchCache.set(countryId, data);
};

export const startPricesSearch = async (countryId: string): Promise<StartSearchPricesResponse> => {
  const resp = await startSearchPrices(countryId);
  const data = (await resp.json()) as StartSearchPricesResponse;

  return data;
};

export const fetchSearchPrices = async (
  token: string,
  countryId?: string,
): Promise<SearchPricesResponse> => {
  if (countryId) {
    const cached = getCachedPrices(countryId);
    if (cached) {
      return cached;
    }
  }

  const resp = await getSearchPrices(token);
  const data = (await resp.json()) as SearchPricesResponse;

  if (countryId) {
    setCachedPrices(countryId, data);
  }

  return data;
};

export const cancelSearchPrices = async (token: string): Promise<void> => {
  await stopSearchPrices(token);
};


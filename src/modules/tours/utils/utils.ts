import type { ApiError, GeoItem } from '../../../mock/api';
import type { SearchPricesResponse } from '../../../mock/api';
import { startPricesSearch, fetchSearchPrices } from '../services/searchService';

export const getTypeIcon = (type: GeoItem['type']) => {
  if (type === 'hotel') return '🏨';
  if (type === 'city') return '📍';
  return '';
};

export const parseApiError = async (error: unknown): Promise<ApiError | null> => {
  if (!(error instanceof Response)) return null;

  try {
    return (await error.json()) as ApiError;
  } catch {
    return null;
  }
};

export const keyBy = <T>(array: T[], key: keyof T | ((item: T) => string | number)): Record<string, T> =>
  array?.reduce<Record<string, T>>((acc, item) => {
    const property = typeof key === 'function' ? key(item) : item?.[key];

    acc[String(property)] = item;

    return acc;
  }, {});

export const formatDateUA = (isoDate: string): string => {
  const date = new Date(isoDate);

  return new Intl.DateTimeFormat('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};

export const formatUAH = (amount: number) => `${amount.toLocaleString('uk-UA')} грн`;

const sleep = (ms: number, signal: AbortSignal) =>
  new Promise<void>((resolve) => {
    const id = window.setTimeout(resolve, ms);
    signal.addEventListener(
      'abort',
      () => {
        clearTimeout(id);
        resolve();
      },
      { once: true },
    );
  });

const msUntil = (iso: string) => Math.max(0, new Date(iso).getTime() - Date.now());

export const pollSearchPrices = async (
  countryId: string,
  signal: AbortSignal,
): Promise<SearchPricesResponse | undefined> => {
  const { token, waitUntil } = await startPricesSearch(countryId);

  let retriesLeft = 2;
  let nextWaitUntil = waitUntil;

  while (true) {
    if (signal.aborted) return;

    await sleep(msUntil(nextWaitUntil), signal);

    if (signal.aborted) return;

    try {
      return await fetchSearchPrices(token, countryId);
    } catch (error) {
      const apiError = await parseApiError(error);

      if (apiError?.code === 425 && apiError?.waitUntil) {
        nextWaitUntil = apiError.waitUntil;
        continue;
      }

      if (retriesLeft > 0) {
        retriesLeft -= 1;
        continue;
      }

      throw new Error(apiError?.message ?? 'Сталася помилка під час пошуку');
    }
  }
};

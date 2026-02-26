import { useEffect, useState } from 'react';
import type { SearchPricesResponse } from '../../../mock/api';
import { getCachedPrices } from '../services/searchService';
import { pollSearchPrices } from '../utils/utils';

type Status = 'idle' | 'loading' | 'success' | 'error';

export const useTourSearch = (countryId: string | null) => {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<SearchPricesResponse | null>(null);

  const pricesList = data ? Object.values(data.prices) : [];
  const isEmpty = status === 'success' && pricesList.length === 0;

  useEffect(() => {
    if (!countryId) {
      setStatus('idle');
      setError(null);
      setData(null);
      return;
    }

    const cached = getCachedPrices(countryId);
    if (cached) {
      setStatus('success');
      setError(null);
      setData(cached);
      return;
    }

    const controller = new AbortController();

    const run = async () => {
      setStatus('loading');
      setError(null);
      setData(null);

      try {
        const response = await pollSearchPrices(countryId, controller.signal);

        if (!response || controller.signal.aborted) return;

        setStatus('success');
        setData(response);
      } catch (error) {
        if (controller.signal.aborted) return;

        setStatus('error');
        setError(error instanceof Error ? error.message : 'Сталася помилка під час пошуку');
      }
    };

    run();

    return () => {
      controller.abort();
    };
  }, [countryId]);

  return { status, error, data, pricesList, isEmpty };
};

export default useTourSearch;

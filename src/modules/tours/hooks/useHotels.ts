import { useEffect, useState } from 'react';
import type { Hotel } from '../../../mock/api';
import { fetchHotelsByCountry, getCachedHotels } from '../services/hotelService';

export const useHotels = (countryId: string | null) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!countryId) {
      setHotels([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    const cached = getCachedHotels(countryId);
    if (cached) {
      setHotels(cached);
      setIsLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();

    const run = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchHotelsByCountry(countryId);
        if (controller.signal.aborted) return;

        setHotels(data);
      } catch (error) {
        if (controller.signal.aborted) return;
        setError(error instanceof Error ? error.message : 'Не вдалося завантажити готелі');
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    run();

    return () => {
      controller.abort();
    }
  }, [countryId]);

  return { hotels, isLoading, error };
};

export default useHotels;

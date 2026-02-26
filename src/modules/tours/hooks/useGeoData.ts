import { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';

import { type GeoItem } from '../../../mock/api';
import { fetchCountries, fetchGeo } from '../services/geoService';

export const useGeoData = (value: string) => {
  const [countries, setCountries] = useState<GeoItem[]>([]);
  const [geoResults, setGeoResults] = useState<GeoItem[]>([]);

  const [isCountriesLoading, setIsCountriesLoading] = useState(true);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchCountries();
        setCountries(data);
      } finally {
        setIsCountriesLoading(false);
      }
    };

    load();
  }, []);

  useDebounce(
    async () => {
      if (!value) {
        setGeoResults([]);
        return;
      }

      setIsSearchLoading(true);

      try {
        const data = await fetchGeo(value.trim());
        setGeoResults(data);
      } finally {
        setIsSearchLoading(false);
      }
    },
    250,
    [value],
  );

  return { countries, geoResults, isCountriesLoading, isSearchLoading };
};

export default useGeoData;

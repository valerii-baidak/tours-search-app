import {
  getCountries,
  type CountriesResponse,
  searchGeo,
  type GeoItem,
  type GeoResponse,
  type Country,
} from '../../../mock/api';


const countriesCache = new Map<string, GeoItem>();

export const fetchCountries = async (): Promise<GeoItem[]> => {
  if (countriesCache.size > 0) {
    return getCachedCountries();
  }

  const resp = await getCountries();
  const data = (await resp.json()) as CountriesResponse;

  const countries = Object.values(data).map((country) => ({
    ...country,
    type: 'country' as const,
  }));

  countries.forEach((country) => {
    countriesCache.set(String(country.id), country);
  });

  return countries;
};

export const getCachedCountries = (): GeoItem[] => {
  return Array.from(countriesCache.values());
};

export const getCountryById = (id: string | number) => {
  return countriesCache.get(String(id)) as Country & { type: 'country' };
};

export const fetchGeo = async (query: string): Promise<GeoItem[]> => {
  const resp = await searchGeo(query);
  const data = (await resp.json()) as GeoResponse;

  return Object.values(data);
};

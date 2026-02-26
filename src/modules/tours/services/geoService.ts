import {
  getCountries,
  type CountriesResponse,
  searchGeo,
  type GeoItem,
  type GeoResponse,
} from '../../../mock/api';


export const fetchCountries = async (): Promise<GeoItem[]> => {
  const resp = await getCountries();
  const data = (await resp.json()) as CountriesResponse;

  return Object.values(data).map((country) => ({ ...country, type: 'country' })) as GeoItem[];
};

export const fetchGeo = async (query: string): Promise<GeoItem[]> => {
  const resp = await searchGeo(query);
  const data = (await resp.json()) as GeoResponse;

  return Object.values(data);
};

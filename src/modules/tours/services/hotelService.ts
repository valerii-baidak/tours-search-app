import { getHotels, type Hotel } from '../../../mock/api';

type HotelsResponse = Record<string, Hotel>;

const hotelsCache = new Map<string, Hotel[]>();

export const getCachedHotels = (countryId: string): Hotel[] | null => {
  return hotelsCache.get(countryId) ?? null;
};

export const fetchHotelsByCountry = async (countryId: string): Promise<Hotel[]> => {
  const cached = hotelsCache.get(countryId);
  if (cached) return cached;

  const resp = await getHotels(countryId);
  const data = (await resp.json()) as HotelsResponse;

  const hotels = Object.values(data);
  hotelsCache.set(countryId, hotels);

  return hotels;
};

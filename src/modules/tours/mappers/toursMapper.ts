import type { Hotel, Price } from '../../../mock/api';
import { formatDateUA, formatUSD, keyBy } from '../utils/utils';
import { getCountryById } from '../services/geoService.ts';

export type TourCard = {
  id: string;
  hotelName: string;
  hotelImage: string;
  countryName: string;
  countryFlag: string;
  cityName: string;
  startDate: string;
  endDate: string;
  priceText: string;
};

export const mapToTourCards = (prices: Price[], hotels: Hotel[]): TourCard[] => {
  const hotelById = keyBy(hotels, 'id');

  return prices
    .map((price) => {
      const hotel = hotelById[price.hotelID];

      if (!hotel) return null;

      const country = getCountryById(hotel.countryId);

      return {
        id: price.id,
        hotelName: hotel.name,
        hotelImage: hotel.img ?? null,
        countryName: hotel.countryName,
        countryFlag: country?.flag ?? null,
        cityName: hotel.cityName,
        startDate: formatDateUA(price.startDate),
        endDate: formatDateUA(price.endDate),
        priceText: formatUSD(price.amount),
      };
    })
    .filter(Boolean) as TourCard[];
};

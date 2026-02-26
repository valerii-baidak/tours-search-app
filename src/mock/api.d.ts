export type Country = {
  id: string;
  name: string;
  flag: string;
};

export type City = {
  id: number;
  name: string;
  countryId: string;
};

export type Hotel = {
  id: number;
  name: string;
  img: string;
  cityId: number;
  cityName: string;
  countryId: string;
  countryName: string;
};

export type GeoItem = (Country & { type: 'country' }) | (City & { type: 'city' }) | (Hotel & { type: 'hotel' });

export type Price = {
  id: string;
  amount: number;
  currency: 'usd';
  startDate: string;
  endDate: string;
  hotelID: string;
};

export type StartSearchPricesResponse = {
  token: string;
  waitUntil: string;
};

export type ApiError = {
  code: number;
  error: true;
  message: string;
  waitUntil?: string;
};

export type SearchPricesResponse = {
  prices: Record<string, Price>;
};

export type CountriesResponse = Record<string, Country>;
export type HotelsResponse = Record<string, Hotel>;
export type GeoResponse = Record<string, GeoItem>;

export function getCountries(): Promise<Response>;
export function searchGeo(query: string): Promise<Response>;

export function startSearchPrices(countryID: string): Promise<Response>;
export function getSearchPrices(token: string): Promise<Response>;
export function stopSearchPrices(token: string): Promise<Response>;

export function getHotels(countryID: string): Promise<Response>;
export function getHotel(hotelId: number): Promise<Response>;

export function getPrice(priceId: string): Promise<Response>;

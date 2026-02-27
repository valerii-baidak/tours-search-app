import { useState } from 'react';

import SearchForm from './modules/tours/components/SearchForm';
import type { GeoItem } from './mock/api';
import useTourSearch from './modules/tours/hooks/useTourSearch.ts';
import ToursGrid from './modules/tours/components/ToursGrid';
import Message from './modules/tours/components/Message';

const App = () => {
  const [countryId, setCountryId] = useState<string | null>(null);

  const handleSubmit = (geo: GeoItem) => {
    setCountryId(String(geo.type === 'country' ? geo.id : geo.countryId));
  };

  const { status, error, pricesList, isEmpty } = useTourSearch(countryId);

  return (
    <div>
      <SearchForm onSubmit={handleSubmit} />
      {status === 'idle' && <Message>Оберіть напрямок і натисніть «Знайти»</Message>}
      {status === 'loading' && <Message>Завантаження…</Message>}
      {status === 'error' && <Message isError>{error ?? 'Сталася помилка під час пошуку'}</Message>}
      {status === 'success' && isEmpty && <Message>За вашим запитом турів не знайдено</Message>}
      {status === 'success' && !isEmpty && <ToursGrid countryId={countryId} prices={pricesList} />}
    </div>
  );
};

export default App;

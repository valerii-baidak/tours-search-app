import { useState } from 'react';

import SearchForm from './modules/tours/components/SearchForm';
import type { GeoItem } from './mock/api';
import useTourSearch from './modules/tours/hooks/useTourSearch.ts';

const App = () => {
  const [countryId, setCountryId] = useState<string | null>(null);

  const handleSubmit = (geo: GeoItem) => {
    setCountryId(geo.type === 'country' ? geo.id : geo.countryId);
  };

  const { status, error, data, pricesList, isEmpty } = useTourSearch(countryId);

  console.log({ status, error, data, pricesList, isEmpty });

  return (
    <div>
      <SearchForm onSubmit={handleSubmit} />
    </div>
  );
};

export default App;

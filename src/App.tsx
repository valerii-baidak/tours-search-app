import SearchForm from './modules/tours/components/SearchForm';
import type { GeoItem } from './mock/api';

const App = () => {
  const handleSubmit = (geo: GeoItem) => {
    console.log('submit search for:', geo);
  };

  return (
    <div>
      <SearchForm onSubmit={handleSubmit} />
    </div>
  );
};

export default App;

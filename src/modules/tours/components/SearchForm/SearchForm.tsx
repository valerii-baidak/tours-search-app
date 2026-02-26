import { type ChangeEvent, type SubmitEvent, useRef, useState } from 'react';

import { type GeoItem } from '../../../../mock/api';
import DestinationInput from '../DestinationInput';
import { SearchInputMode, type SearchInputModeType } from '../../types/types';
import useSubmitOnEnter from '../../hooks/useSubmitOnEnter';
import useGeoData from '../../hooks/useGeoData.ts';
import styles from './SearchForm.module.css';

type Props = {
  onSubmit: (selected: GeoItem) => void;
};

export const SearchForm = ({ onSubmit }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [selected, setSelected] = useState<GeoItem | null>(null);
  const [value, setValue] = useState<string>('');
  const [mode, setMode] = useState<SearchInputModeType>(SearchInputMode.Countries);
  const { countries, geoResults, isCountriesLoading, isSearchLoading } = useGeoData(value);

  useSubmitOnEnter(formRef);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValue(event.target.value);
    setSelected(null);

    if (value) {
      setMode(SearchInputMode.Search);
    } else {
      setMode(SearchInputMode.Countries);
    }
  };

  const handelSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selected) return;

    onSubmit(selected);
  };

  const handleClear = () => {
    setValue('');
    setSelected(null);
    setMode(SearchInputMode.Countries);
  };

  const handleSelect = (item: GeoItem) => {
    setSelected(item);
    setValue(item.name);
  };

  const isLoading = mode === SearchInputMode.Countries ? isCountriesLoading : isSearchLoading;

  return (
    <form className={styles.card} onSubmit={handelSubmit} ref={formRef}>
      <h2 className={styles.title}>Форма пошуку турів</h2>

      <DestinationInput
        value={value}
        isLoading={isLoading}
        items={mode === SearchInputMode.Countries ? countries : geoResults}
        onChange={handleChange}
        onClear={handleClear}
        onSelect={handleSelect}
      />

      <div className={styles.actions}>
        <button className={styles.submit} type="submit" disabled={!selected}>
          Знайти
        </button>
      </div>
    </form>
  );
};

export default SearchForm;

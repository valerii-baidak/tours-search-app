import { type ChangeEvent, useRef, useState } from 'react';
import { useClickAway } from 'react-use';

import { type GeoItem } from '../../../../mock/api';
import { getTypeIcon } from '../../utils/utils.ts';
import styles from './DestinationInput.module.css';

type Props = {
  value: string;
  isLoading: boolean;
  items: GeoItem[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  onSelect: (item: GeoItem) => void;
};

export const DestinationInput = ({ value, isLoading, items, onChange, onClear, onSelect }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClear = () => {
    onClear();
    handleClose();
  };

  const handleSelect = (item: GeoItem) => {
    onSelect(item);
    handleClose();
  };

  useClickAway(containerRef, handleClose);

  return (
    <div className={styles.inputContainer} ref={containerRef}>
      <input
        value={value}
        onClick={handleOpen}
        onChange={onChange}
        placeholder="Оберіть напрямок"
        className={styles.input}
      />

      {value && (
        <button type="button" className={styles.clearBtn} onClick={handleClear} aria-label="Clean">
          ×
        </button>
      )}

      {isOpen && (
        <div className={styles.dropdown}>
          {isLoading ? (
            <div className={styles.hint}>Завантаження…</div>
          ) : (
            <ul className={styles.list}>
              {items.length ? (
                items.map((item) => (
                  <li key={`${item.type}-${item.id}`}>
                    <button type="button" className={styles.option} onClick={() => handleSelect(item)}>
                      {item.type === 'country' ? (
                        <img src={item.flag} alt="" className={styles.flag} />
                      ) : (
                        <span className={styles.typeIcon}>{getTypeIcon(item.type)}</span>
                      )}
                      <span>{item.name}</span>
                    </button>
                  </li>
                ))
              ) : (
                <span>Нічого не знайдено. Спробуйте змінити запит</span>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default DestinationInput;

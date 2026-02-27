import type { Price } from '../../../../mock/api';
import { useHotels } from '../../hooks/useHotels';
import { mapToTourCards } from '../../mappers/toursMapper';
import styles from './ToursGrid.module.css';

type Props = {
  countryId: string | null;
  prices: Price[];
};

export const ToursGrid = ({ countryId, prices }: Props) => {
  const { hotels, isLoading, error } = useHotels(countryId);

  const cards = mapToTourCards(prices, hotels);

  if (!countryId) return null;

  if (isLoading) {
    return <div className={styles.state}>Завантаження готелів…</div>;
  }

  if (error) {
    return <div className={styles.stateError}>{error}</div>;
  }

  if (!cards.length) {
    return <div className={styles.state}>За вашим запитом турів не знайдено</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {cards.map(({ id, hotelImage, hotelName, countryName, cityName, startDate, priceText, countryFlag }) => (
          <article key={id} className={styles.card}>
            {hotelImage ? (
              <img className={styles.image} src={hotelImage} alt={hotelName} />
            ) : (
              <div className={styles.imagePlaceholder} />
            )}

            <h3 className={styles.title}>{hotelName}</h3>

            <div className={styles.locationRow}>
              {countryFlag && <img src={countryFlag} alt={countryName} className={styles.flag} />}
              <span className={styles.locationText}>
                {countryName}, {cityName}
              </span>
            </div>

            <div className={styles.meta}>
              <div className={styles.metaLabel}>Старт туру</div>
              <div className={styles.metaValue}>{startDate}</div>
            </div>

            <div className={styles.price}>{priceText}</div>

            <button className={styles.linkBtn} type="button">
              Відкрити ціну
            </button>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ToursGrid;

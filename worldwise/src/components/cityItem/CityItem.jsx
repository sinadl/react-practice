import { Link } from 'react-router-dom';
import { useCities } from '../../contexts/citiesContext';
import styles from './CityItem.module.css'

const formDate = (date) =>
new Intl.DateTimeFormat('en',{
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}).format(new Date(date));

export default function CityItem({city}) {
  const {currentCity} = useCities()
  const {cityName, emoji, date,id,position} = city
  return (
   <li key={id}  >
    <Link className={`${styles.cityItem} ${currentCity.id === id?styles['cityItem--active']:''}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>({formDate(date)})</time>
      <button className={styles.deleteBtn}>&times;</button>
    </Link>
   </li> 
  )
}

import styles from './CityItem.module.css'

const formDate = (date) =>
new Intl.DateTimeFormat('en',{
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}).format(new Date(date));

export default function CityItem({city}) {
  const {cityName, emoji, date,id} = city
  return (
   <li key={id}  className={styles.cityItem}>
    <span className={styles.emoji}>{emoji}</span>
    <h3 className={styles.name}>{cityName}</h3>
    <time className={styles.date}>({formDate(date)})</time>
    <button className={styles.deleteBtn}>&times;</button>
   </li> 
  )
}

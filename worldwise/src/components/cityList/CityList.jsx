import styles from './CityList.module.css'
import Spinner from './../spinner/Spinner'
import CityItem from '../cityItem/CityItem';
import { useCities } from '../../contexts/citiesContext';

export default function CityList() {
    const {cities,isLoading} = useCities();
    if(isLoading) return <Spinner/>;
    return (
    <ul className={styles.cityList}>
        {cities.map(city=><CityItem key={city.id} city={city}/>)}
    </ul>
    )
}

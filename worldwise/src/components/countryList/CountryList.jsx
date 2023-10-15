import styles from './CountryList.module.css'
import Spinner from './../spinner/Spinner'
import CountryItem from '../countryItem/CountryItem';

export default function CityList({cities,isLoading}) {
    const countries = cities.reduce((country,curr)=>{
        if(!country.map(el=>el.country).includes(curr.country)){
            return [...country,{country: curr.country, emoji:curr.emoji}]
        }else{
            return country
        }
    },[])
    if(isLoading) return <Spinner/>;
    return (
    <ul className={styles.countryList}>
        {countries.map(country=><CountryItem key={country.country} country={country}/>)}
    </ul>
    )
}

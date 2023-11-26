import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useURL } from "../../hooks/useURL";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';


import Button from "../button/Button";
import ButtonBack from "../ButtonBack";
import Message from '../message/Message'

import styles from "./Form.module.css";
import { useCities } from "../../contexts/citiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const BASE_URL= 'https://api.bigdatacloud.net/data/reverse-geocode'
const API_KEY= 'bdc_a6efc4e41a7d4f57a9c0ea9a05166570'
function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [isLoadingData,setIsLoadingData] = useState(false)
  const [notes, setNotes] = useState("");
  const [emoji,setEmoji] = useState('')
  const [formError,setFormError] = useState('')

  const {createCity,isLoading} = useCities();
  const [lat,lng] = useURL();

  const navigate = useNavigate();

  useEffect(()=>{

    if(!lat && !lng) return;

    async function fetchCityData(){
      setIsLoadingData(true);
      try {
        setFormError('')
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}&key=${API_KEY}`);
        const data = await res.json();

        if(!data.countryCode) throw new Error('This is not even a place, select somewhere else 🥹')
        setCityName(data.city||data.locality|| '');
        setCountry(data.countryName)
        setNotes(data.localityInfo.administrative.reduce((main,curr)=>{
          const item =`${curr.name}:${curr.description}`
          return item + main
        },[]))
        setEmoji(convertToEmoji(data.countryCode))
      } catch (error) {
        setFormError(error.message)
      }
      finally{
        setIsLoadingData(false)
      }
    }

    fetchCityData()
  },[lat,lng])
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position:{
        lat,
        lng
      }
    };
    await createCity(newCity);
    navigate("/app/cities")
  }



  if(!lat&&!lng) return <Message message='pls click somewhere in the map at right hand side!!!'/>
  if(formError) return <Message message={formError}/>

  return (
    <form className={`${styles.form} ${isLoading?styles.loading:''}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker 
        id='date'
        selected={date}
        dateFormat='dd/MM/yyyy'
        onChange={date=>setDate(date)}/>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary' onClick={()=>{}}>Add</Button>
        <ButtonBack type='back' >&larr; Back</ButtonBack>
      </div>
    </form>
  );
}

export default Form;

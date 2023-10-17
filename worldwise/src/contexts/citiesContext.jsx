import { useContext, useEffect } from "react";
import { createContext, useState } from "react";

const citiesContext = createContext();
const URL_CITIES = 'http://localhost:8000'

function CitiesProvider({children}){
    const [cities,setCities] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [currentCity, setCurrentCity] = useState({})
  
    useEffect(()=>{
      async function fetchCities(){
        try {
          setIsLoading(true)
          const res =  await fetch(`${URL_CITIES}/cities`)
          const data = await res.json();
          setCities(data)
        } catch (error) {
          alert('There was an error loading cities...')
        } finally{
          setIsLoading(false)
        }
      }
      fetchCities();
    },[])

    async function getCity(id){
      try {
        setIsLoading(true)
        const res =  await fetch(`${URL_CITIES}/cities/${id}`)
        const data = await res.json();
        setCurrentCity(data)
      } catch (error) {
        alert('There was an error loading current cities...')
      } finally{
        setIsLoading(false)
      }
    }

    return(
        <citiesContext.Provider 
        value={{
            cities,
            isLoading,
            getCity,
            currentCity
        }}
        >
            {children}
        </citiesContext.Provider>
    )
}
function useCities(){
  const context = useContext(citiesContext)
  if (context === undefined){
    throw new Error("Cities context was used outside of the CitiesProvider")
  }
  return context
}

export {CitiesProvider,useCities};
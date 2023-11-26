import { useReducer } from "react";
import { useContext, useEffect } from "react";
import { createContext, useState } from "react";

const citiesContext = createContext();
const URL_CITIES = 'http://localhost:8000'

const initialState ={
  isLoading: 'false',
  cities: [],
  currentCity:{},
  error: ''
}
function reducer(state,action){
  switch (action.type) {
    case 'loading':
      return{
        ...state,
        isLoading:true
      }
    case 'rejected':
      return{
        ...state,
        isLoading:false,
        error: action.payload
      }
    case 'cities/loaded':
      return{
        ...state,
        isLoading: false,
        cities: action.payload
      }
    case 'city/loaded':
      return{
        ...state,
        isLoading: false,
        currentCity: action.payload
      }
    case 'city/created':
      return{
        ...state,
        isLoading: false,
        cities: [...state.cities,action.payload],
        currentCity: action.payload
      }

    case 'city/deleted':
      return{
        ...state,
        isLoading: false,
        cities: state.cities.filter((el)=>(el.id !== action.payload)),
        currentCity: {}
      }
    default:
      break;
  }
}
function CitiesProvider({children}){
  const [{cities,isLoading,currentCity},dispatch] = useReducer(reducer,initialState);

  
    useEffect(()=>{
      async function fetchCities(){
        try {
          dispatch({type:'loading'})
          const res =  await fetch(`${URL_CITIES}/cities`)
          const data = await res.json();
          dispatch({type:'city/loaded',payload: data})
        } catch (error) {
          dispatch({type:'rejected',payload:'There was an error loading cities...'})
        } 
      }
      fetchCities();
    },[])

    async function getCity(id){
      if(Number(id) === currentCity.id) return;
      try {
        dispatch({type:'loading'})
        const res =  await fetch(`${URL_CITIES}/cities/${id}`)
        const data = await res.json();
        dispatch({type:'city/loaded',payload:data})
      } catch (error) {
        dispatch({type:'rejected',payload:'There was an error loading city...'})
      }
    }

    async function createCity(newCity){
      try {
        const res = await fetch(`${URL_CITIES}/cities`,{
          method: 'POST',
          body: JSON.stringify(newCity),
          headers: {
            "Content-Type": "application/json"
          }
        })
        const data = await res.json();
        dispatch({type:'city/created',payload:data})
      } catch (error) {
        dispatch({type:'rejected',payload:'There was an error creating city...'})
      }
    }

    async function deleteCity(city){
      try {
        const res = await fetch(`${URL_CITIES}/cities/${city.id}`,{
          method: 'DELETE'
        })
        dispatch({type:'city/deleted',payload:city.id})
      } catch (error) {
        dispatch({type:'rejected',payload:'There was an error deleting city...'})
      }
    }
    return(
        <citiesContext.Provider 
        value={{
            cities,
            isLoading,
            getCity,
            currentCity,
            createCity,
            deleteCity
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
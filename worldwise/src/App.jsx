import { BrowserRouter, Routes, Route} from "react-router-dom"
import Homepage from './pages/Homepage'
import Pricing from './pages/Pricing'
import Product from './pages/Product'
import AppLayout from './pages/AppLayout'
import PageNotFound from './pages/PageNotFound'
import Login from './pages/Login'
import CityList from "./components/cityList/CityList"
import { useEffect, useState } from "react"

const URL_CITIES = 'http://localhost:8000'
export default function App() {
  const [cities,setCities] = useState([])
  const [isLoading,setIsLoading] = useState(false)

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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="pricing" element={<Pricing />}/>
        <Route path="product" element={<Product />}/>
        <Route path="app" element={<AppLayout />}>
          <Route index element={<CityList cities={cities} isLoading={isLoading}/>}/>
          <Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>}/>
          <Route path="countries" element={<p>Countires</p>}/>
          <Route path="form" element={<p>Form</p>}/>
        </Route>
        <Route path="login" element={<Login />}/>
        <Route path="*" element={<PageNotFound />}/>
      </Routes>
    </BrowserRouter>
  )
}

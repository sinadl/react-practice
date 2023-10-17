
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom"


import Homepage from './pages/Homepage'
import Pricing from './pages/Pricing'
import Product from './pages/Product'
import AppLayout from './pages/AppLayout'
import PageNotFound from './pages/PageNotFound'
import Login from './pages/Login'
import CityList from "./components/cityList/CityList"
import CountryList from './components/countryList/CountryList'
import City from "./components/city/City"
import Form from "./components/form/Form"
import { CitiesProvider } from "./contexts/citiesContext"


export default function App() {

  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}/>
          <Route path="pricing" element={<Pricing />}/>
          <Route path="product" element={<Product />}/>
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to={'cities'}/>}/>
            <Route path="cities" element={<CityList/>}/>
            <Route path="cities/:id" element={<City/>}/>
            <Route path="countries" element={<CountryList/>}/>
            <Route path="form" element={<Form/>}/>
          </Route>
          <Route path="login" element={<Login />}/>
          <Route path="*" element={<PageNotFound />}/>
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  )
}

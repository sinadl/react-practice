import { useNavigate, useSearchParams } from "react-router-dom"
import { useState } from "react";
import { useEffect } from "react";

import styles from './Map.module.css'
import {MapContainer , Marker, Popup,TileLayer, useMap, useMapEvent} from 'react-leaflet'
import {useCities} from "../../contexts/citiesContext"
import { useGeoLocation } from "../../hooks/useGeolocation";
import Button from "../button/Button";

export default function Map() {
  const [searchParams] = useSearchParams();
  const {cities} = useCities();
  const [mapPosition, setMapPosition] = useState([40,0]);
  const {getPosition, positon: geoPos, isloading: loadingPos } = useGeoLocation();

  const navigate = useNavigate()
  const mapLat = searchParams.get('lat')
  const mapLng = searchParams.get('lng')
  console.log(searchParams.has('form'))
  useEffect(()=>{
    if(mapLat && mapLng){
      setMapPosition([mapLat,mapLng]);
    } 
  },[mapLat,mapLng])

  useEffect(
    function(){
    if(Object.keys(geoPos).length !== 0){
      setMapPosition([geoPos.lat,geoPos.lng])
      navigate(`form?lat=${geoPos.lat}&lng=${geoPos.lng}&form`) 
    } 
  },[geoPos]);
  return (
    <div className={styles.mapContainer}>
      {(Object.keys(geoPos).length == 0) &&  <Button type='position' onClick={getPosition}>
        {loadingPos? 'Loading...':'Get your location'}
      </Button>}
        <MapContainer 
        center={mapPosition}
        className={styles.map} 
        zoom={5} 
        scrollWheelZoom={true}
        >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
      {cities.map((city)=>(
            <Marker 
            position={[city.position.lat,city.position.lng]}
            key={city.id}
            >
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
      ))}
      {searchParams.has('form') && 
            <Marker 
            position={[mapLat,mapLng]}
            >
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>}
        <ChangeCenter position={mapPosition}/>
        <DetectClick/>
        </MapContainer>
    </div>
  )
}

function ChangeCenter({position}){
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick(){
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}&form`) 
  })
}
import { useNavigate, useSearchParams } from "react-router-dom"
import styles from './Map.module.css'
import {MapContainer , Marker, Popup,TileLayer, useMap, useMapEvent} from 'react-leaflet'
import { useState } from "react";
import {useCities} from "../../contexts/citiesContext"
import { useEffect } from "react";

export default function Map() {
  const [searchParams] = useSearchParams();
  const {cities} = useCities();
  const [mapPosition, setMapPosition] = useState([40,0]);

  const navigate = useNavigate()
  const mapLat = searchParams.get('lat')
  const mapLng = searchParams.get('lng')
  
  useEffect(()=>{
    if(mapLat && mapLng){
      setMapPosition([mapLat,mapLng]);
    } 
  },[mapLat,mapLng])

  return (
    <div className={styles.mapContainer}>
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
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`) 
  })
}
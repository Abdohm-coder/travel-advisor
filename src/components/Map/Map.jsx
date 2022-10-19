import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import useStyles from "./styles";
import {  MapContainer , Marker, Popup, TileLayer, useMapEvents  } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { iconPerson } from "./icon";
import "./Map.css";
import { useContext, useEffect, useRef } from "react";
import { DataContext } from "../../App";

function LocationMarker({ setBounds, coordinates }) {

  const map = useMapEvents({
    dragend: () => {
        setBounds({sw: map.getBounds()._southWest, ne: map.getBounds()._northEast});
    },
    moveend: () => {
      setBounds({sw: map.getBounds()._southWest, ne: map.getBounds()._northEast});
    }
  });

  useEffect(() => {
    map.flyTo([coordinates.lat, coordinates.lng], coordinates.isCountry ? 7.5 : 15, {
      duration: 2
    });
  }, [coordinates, map]);

  return null;
}


function Map({ places }) {
  const dataContext = useContext(DataContext);
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:600px)");

  const mapRef = useRef();

  return (
    <div className="map">
      <MapContainer
        style={{ width: '100%', height: '100%' }}
        ref={mapRef} 
        center={[dataContext.coordinates.lat, dataContext.coordinates.lng]}  
        zoom={15} 
      >
        <TileLayer 
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
          <LocationMarker setBounds={dataContext.setBounds} coordinates={dataContext.coordinates} />
          {places?.map((place, i) => {
            return (place.latitude !== undefined && place.longitude !== undefined) ?
              <Marker 
                key={i}
                position={[Number(place.latitude), Number(place.longitude)]}
                icon={iconPerson}
                eventHandlers={{ click: () => dataContext.setChildClick(i)}}
              >
                {
                  isDesktop && (
                    <Popup closeButton={false}>
                      <Paper elevation={3} className={classes.paper}>
                        <Typography className={classes.typography} variant="subtitle1" gutterBottom>
                          {place.name}
                        </Typography>
                        <img
                          className={classes.pointer}
                          src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg' }
                          alt={place.name}
                        />
                        <Rating size="small" value={Number(place.rating)} readOnly />
                      </Paper>
                    </Popup>
                  )
                }
              </Marker>    
            : null
          })}
      </MapContainer>
    </div>
  )
}

export default Map
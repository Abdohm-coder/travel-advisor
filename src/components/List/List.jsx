import { createRef, useContext, useState, useEffect } from "react";
import Typewriter from 'typewriter-effect';
import ErrorIcon from "@material-ui/icons/ErrorOutline";

import "./List.css";

import PlaceDetails from "../PlaceDetails/PlaceDetails";
import { DataContext } from "../../App";
import LoadingCircle from "../Loading";

function List({ places }) {

  const [elRefs, setElRefs ] = useState([]);
  const dataContext = useContext(DataContext);

  useEffect(() => {
    const refs = Array(dataContext.places?.length).fill().map((_, i) => elRefs[i] || createRef());
    
    setElRefs(refs);
  }, [places]);

  return (
    <div className="list">
      <div className="list__container">
        <div className="rectangle" />
        <h2 className="list__title">
          <Typewriter
            options={{
              strings:["Restaurants, Hotels and Attractions around you", "Explore new spaces..."],
              autoStart:true,
              delay:75,
              loop:true,
              deleteSpeed: 20,
            }}
          />
        </h2>
  

        <div className="list__inner">
          <div className="list__item">
            <label htmlFor="type">Type</label>
            <select value={dataContext.type} id="type" onChange={(e) => dataContext.setType(e.target.value)}>
              <option value="restaurants">restaurants</option>
              <option value="hotels">hotels</option>
              <option value="attractions">attractions</option>
            </select>
          </div>
          <div className="list__item">
            <label htmlFor="rating">Rating</label>
            <select id="rating" value={dataContext.rating} onChange={(e) => dataContext.setRating(e.target.value)}>
              <option value={0}>All</option>
              <option value={3}>Above 3.0</option>
              <option value={4}>Above 4.0</option>
              <option value={5}>Above 4.5</option>
            </select>
          </div>
        </div>
      </div>

      {
        dataContext.error 
        ? (
          <div className="error" onClick={() => window.location.reload()} >
            <ErrorIcon />
            <p>Oops.. Something went wrong!!</p>
            <span>Refresh the page or try later</span>
          </div>
        ) 
        : (dataContext.loading)
        ? <div style={{  marginTop: "40px" }}><LoadingCircle type="spin" color="#6f6ffc80" /></div>
        :
          <div className="list__list">
            {places?.map((place, i) => (
              <PlaceDetails
              id={i}
              key={`place: ${i}`}
              place={place} 
              selected={dataContext.childClick === i}
              refProp={elRefs[i]}  
              />
              ))}
          </div>
      }
    </div>
  )
}

export default List
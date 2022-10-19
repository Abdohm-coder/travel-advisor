import { Header, List, Map, Footer, Modal, LoadingCircle } from "./components/index";
import { CssBaseline } from "@material-ui/core"
import { AnimatePresence } from "framer-motion";
import { useEffect, useState, createContext } from 'react';
import { getPlacesData } from "./api";
import './App.css';

export const DataContext = createContext();

function App() {

  const [places, setPlaces] = useState();
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClick, setChildClick] = useState(null);
  const [ type, setType ] = useState("restaurants");
  const [ rating, setRating ] = useState("");
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude} }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    });
  },[]); 

  useEffect(() => {
    const filteredPlaces = places?.filter((place) => place.rating > rating);

    setFilteredPlaces(filteredPlaces);
  },[rating, places]);

  useEffect(() => {
    setLoading(true);
    getPlacesData(type, bounds?.sw, bounds?.ne, setError)
      .then(data => {
        setPlaces(data);
        setLoading(false);
      });
  }, [bounds, type]);

  useEffect(() => {
    const fetchData = async(e) => {
         fetch(`https://web.mapquestapi.com/search/v3/prediction?collection=address,adminArea,airport,category,franchise&feedback=false&key=${process.env.REACT_APP_LIST_MAP_API_KEY}&limit=15&q=${country.replace(" ","+")}`)
        .then(response => response.json())
        .then(data => {
            setCountries(data.results.sort((a,b) => (a.recordType > b.recordType) ? 1 : ((b.recordType > a.recordType) ? -1 : 0)));
        }).catch(err => console.log(err));
    };
    country.length > 2 && fetchData();
}, [country]);

  return (
    <DataContext.Provider 
      value={{
        places, coordinates, setCoordinates, bounds, setBounds, childClick, setChildClick, country, setCountry, openModal, setOpenModal, rating, setRating, setType, countries, loading, error
      }}
    >
        <CssBaseline />
        <AnimatePresence
          initial={false}
          exitBeforeEnter
          onExitComplete={() => null}
        >
          {
          openModal && 
            <Modal /> 
          }
        </AnimatePresence>
        <Header />
        <div className="container">
              <List places={ filteredPlaces?.length ? filteredPlaces : places} />
              {coordinates?.lat 
              ? <Map places={ filteredPlaces?.length ? filteredPlaces : places} /> 
              : <LoadingCircle type="spin" color="#3CBC28" />
            }
            
        </div>
        <Footer /> 
    </DataContext.Provider>
  );
}

export default App;

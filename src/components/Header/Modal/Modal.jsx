import {motion} from "framer-motion";
import SearchIcon from "@material-ui/icons/Search";
import { useContext } from "react";
import { DataContext } from "../../../App";

const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 30,
            stiffness: 600,
        }
    },
    exit: {

    },
};

function Modal() {
    const dataContext = useContext(DataContext);

    const handleCoordinates = ( coordinates, isCountry ) => {
            dataContext.setCoordinates({lat: coordinates[1], lng: coordinates[0], isCountry: isCountry });
            dataContext.setOpenModal(false);
            dataContext.setCountry("");
    };

    const handleCountry = (e) => {
        const str = e.target.value.toLowerCase().replace(/\b[a-z]/g, function(letter) {
          return letter.toUpperCase();
        });
    
        dataContext.setCountry(str);
    }

  return (
    <motion.div
        className="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
        <motion.div
            onClick={(e) => e.stopPropagation()}
            className="modal"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <button onClick={() => dataContext.setOpenModal(false)}>Close</button>
            <div className="modal__container">
            <div className="search">
                <div className="search__box">
                    <div className="search__icon">
                        <SearchIcon />
                    </div>
                    <input value={dataContext.country} onChange={(e) => handleCountry(e)} placeholder="Search..." className="search__input" />
                </div>
                <div className="search__list">
                    {dataContext.country.length > 2 && (
                        <ul>
                            {dataContext.countries?.map((country) => {
                                return country.place?.geometry?.coordinates ? (
                                    <li
                                        className="search__item" 
                                        onClick={() => handleCoordinates(country.place?.geometry?.coordinates, country?.place?.properties?.type === "country")} 
                                        key={country.id}
                                    >
                                        <span >{country?.name}</span>
                                        {(country?.place?.properties?.type === "country" || country?.place?.properties?.type === "city" || country?.place?.properties?.type === "county") ?
                                        (
                                            <p>{country?.place?.properties?.type.charAt(0).toUpperCase() + country?.place?.properties?.type.slice(1)}, {country?.place?.properties.countryCode}</p>
                                        ) : (
                                            <p>{country?.place?.properties.street}, {country?.place?.properties?.city}, {country?.place?.properties.countryCode}</p>
                                        )}
                                    </li>
                                ): null
                            })}
                        </ul>
                    )}
                </div>
            </div>
            </div>
        </motion.div>
    </motion.div>
  )
}

export default Modal
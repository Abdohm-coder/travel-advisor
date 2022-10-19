import SearchIcon from "@material-ui/icons/Search";
import { useContext } from "react";
import { DataContext } from "../../App";
import "./Header.css";

function Header() {
    const dataContext = useContext(DataContext);

    const handleCountry = (e) => {
            const str = e.target.value.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                return letter.toUpperCase();
            });
            
            dataContext.setCountry(str);
    }

    const handleCoordinates = (coordinates, isCountry) => {
        
        dataContext.setCoordinates({lat: coordinates[1], lng: coordinates[0], isCountry: isCountry});
        dataContext.setCountry("");

    }

    const handleModal = () => {
        dataContext.setOpenModal(true);
    }

  return (
    <div className="header">
        <div className="header__container">
            <div className="header__brand">
                <img loading="lazy" width={40} height={40} src="logo.jpg" alt="logo" />
                <h1 
                    className="header__title"
                    onMouseOver={(e) => {
                        e.target.classList.value = "header__title--active";
                    }}
                    onMouseLeave={(e) => {
                        e.target.classList.value = "header__title";
                    }}
                >
                    Travel Advisor
                </h1>
            </div>
            <div className="header__explore">
                <h3 className="explore__title">
                    Explore new spaces
                </h3>
                    <div className="search">
                        <div className="search__box">
                            <div className="search__icon">
                                <SearchIcon />
                            </div>
                            <input value={!dataContext.openModal ? dataContext.country : ""} onChange={(e) => handleCountry(e)} placeholder="Search..." className="search__input" />
                        </div>
                        {
                            !dataContext.openModal &&
                        <div className="search__list">
                            {dataContext.country.length > 2 && (
                                <ul>
                                    { dataContext.countries?.map((country, i) => 
                                        { return (i < 7 && country.place?.geometry?.coordinates) ? <li
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
                                        </li> : null
                                        }
                                    )}
                                    {
                                        (dataContext.country.length > 2 && dataContext.countries.length === 0) ? (
                                            <li className="search__item">{`'${dataContext.country}'`} not founded!</li>
                                        ) : (
                                            <li
                                                className="search__item" 
                                                onClick={ handleModal}
                                            >
                                                <span >Show all results..</span>
                                            </li>
                                        )
                                    }
                                </ul>
                            )}
                            </div>
                        }
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Header
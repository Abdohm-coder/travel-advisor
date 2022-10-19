import "./styles.js";
import { Typography, Button, CardMedia, CardContent, CardActions, Chip } from "@material-ui/core"
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";
import "./PlaceDetails.css";

import useStyles from "./styles.js";

function PlaceDetails({ id, place, selected, refProp }) {

  const classes = useStyles();

  if(selected) refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <div className="place" ref={refProp} >
      <CardMedia
          style={{ height: 350 }}
          image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg' }
          title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">{place.name}</Typography>
        <div className="place__item ">
          <Rating value={Number(place.rating)} readOnly />
          <h6 className="place__info">out of {place.num_reviews} reviews</h6>
        </div>
        <div className="place__item ">
          <h6 className="place__info">Price</h6>
          <h6 className="place__info">{place.price_level}</h6>
        </div>
        <div className="place__item ">
          <h6 className="place__info">Ranking</h6>
          <h6 className="place__info">{place.ranking}</h6>
        </div>
        {place?.awards?.map((award, i) =>(
          <div className="place__item " key={`award: ${id} ${i}`}>
            <img src={award.images.small} alt={award.display_name} />
            <h6 className="place__info" color="textSecondary">{award.display_name}</h6>
          </div>
        ))}
        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className={classes.chip} />
        ))}
        {place?.address && (
          <div className="place__item">
            <LocationOnIcon />
            <h6 className="place__info" >  {place.address}</h6>
          </div>
        )}
        {place?.phone && (
          <div className="place__item">
            <PhoneIcon />
            <h6 className="place__info" > {place.phone}</h6>
          </div>
        )}
        <CardActions>
          <Button size="small" color="primary" onClick={() => window.open(place?.web_url, "_blank")}>Trip Advisor</Button>
          <Button size="small" color="primary" onClick={() => window.open(place?.website, "_blank")}>Website</Button>
        </CardActions>
      </CardContent>
    </div>
  )
}

export default PlaceDetails;
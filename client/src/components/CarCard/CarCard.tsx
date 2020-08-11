import React from "react";
import './CarsCard.css'

//Models
import { ICar } from '../../models/ICar'

//M-UI
import { makeStyles } from "@material-ui/core/styles";
import {
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Card,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    marginTop: 5,
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexDirection: "row"
  },
  media: {
    height: 150,
    width:300,
  },

});

interface ICarCard  {
  car:ICar ;
}

const CarCard : React.FC<ICarCard> = ({ car }) => {
  const classes = useStyles();
  
  return (
    <Grid item xs={12} className="CarsCard">
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={car.img}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {car.car} Model {car.car_model}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Model Year {car.car_model_year}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Price {car.price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default CarCard;

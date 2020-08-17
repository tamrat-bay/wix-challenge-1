import React from "react";
import "./CarsCard.css";
import { Method } from "axios";

//Models
import { ICar } from "../../models/ICar";

//M-UI
import { useStyles } from './useStyles'
import {
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Card,
  Grid,
} from "@material-ui/core";



interface ICarCard {
  car: ICar;
  setFormRequestMethod: React.Dispatch<React.SetStateAction<Method>>;
  setFormModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCar: React.Dispatch<React.SetStateAction<ICar | null>>;
  deleteCar: (id: string) => void;
}

const CarCard: React.FC<ICarCard> = ({
  car,
  setSelectedCar,
  setFormRequestMethod,
  setFormModalIsOpen,
  deleteCar,
}) => {
  const classes = useStyles();

  return (
    <Grid data-testid="car-card" item xs={12} className="CarsCard">
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={car.img}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {car.car} Model {car.car_model}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Model Year {car.car_model_year}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Price ${car.price}
            </Typography>
          </CardContent>
        </CardActionArea>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setSelectedCar(car);
              setFormRequestMethod("put");
              setFormModalIsOpen(true);
            }}
          >
            Edit Car
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => deleteCar(car._id)}
          >
            Delete
          </Button>
        </div>
      </Card>
    </Grid>
  );
};

export default CarCard;

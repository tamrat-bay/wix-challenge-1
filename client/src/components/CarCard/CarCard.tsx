import React from "react";
import "./CarsCard.css";

//Models
import { ICar } from "../../models/ICar";

//M-UI
import { makeStyles } from "@material-ui/core/styles";
import {
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
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
    flexDirection: "column",
    padding: 10,
  },
  media: {
    height: 150,
    width: 300,
  },
});

interface ICarCard {
  car: ICar;
  setEditCarFlag: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCar: React.Dispatch<React.SetStateAction<ICar>>;
  deleteCar: (id: string) => void;
}

const CarCard: React.FC<ICarCard> = ({
  car,
  setSelectedCar,
  setEditCarFlag,
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
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setSelectedCar(car);
              setEditCarFlag(true);
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

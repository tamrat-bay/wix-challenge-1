import React from "react";

//Models
import { ICar } from '../../models/ICar'

//M-UI
import { makeStyles } from "@material-ui/core/styles";
import {
  CardActionArea,
  CardActions,
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
    flexDirection: "row"
  },
  media: {
    height: 140,
  },
});

interface ICarCard  {
  car:ICar ;
}

const CarCard : React.SFC<ICarCard> = ({ car }) => {
  const classes = useStyles();
  
  return (
    <Grid item xs={12} >
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://cdn.pixabay.com/photo/2016/05/18/10/52/buick-1400243_960_720.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {car.car} Model {car.car_model}
              
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Model Year {car.car_model_year}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CarCard;

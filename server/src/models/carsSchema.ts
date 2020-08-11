import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  _id: String,
  id: Number,
  car: {
    type: String,
    required: true,
  },
  car_model: {
    type: String,
    required: true,
  },
  car_color: String,
  car_model_year: {
    type: Number,
    required: true,
  },
  car_vin: {
    type: String,
    required: false,
  },
  price: {
    type: String,
    required: true,
  },
  availability: Boolean,
  img: {
    type: String,
    required: true,
  },
});

const Cars = mongoose.model("cars", carSchema);

export default Cars;

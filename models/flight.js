const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const flightSchema = new Schema(
  {
    airline: { type: String, enum: ["Southwest", "American", "United"] },
    airport: {
      type: String,
      enum: ["AUS", "DFW", "DEN", "LAX", "SAN"],
      default: "DEN",
    },
    flightNo: { type: Number, min: 10, max: 9999 },
    departs: {
      type: Date,
      default: () => {
        return new Date(new Date().setFullYear(new Date().getFullYear() + 1));
      },
    },
  },
  {
    timestamps: true,
  }
);
//note: default value doesn't seem to work??
module.exports = mongoose.model("Flight", flightSchema);

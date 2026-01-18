import mongoose from "mongoose";
const stationSchema = new mongoose.Schema({
  name: String,
  index: Number,
  nextStations: [
    {
      stationIndex: Number,
      weight: Number,
      line: String
    }
  ]
});
export default mongoose.models.Station ||
  mongoose.model("Station", stationSchema);

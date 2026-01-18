import mongoose from "mongoose";
const touristSchema = new mongoose.Schema({
  place: String,
  nearest: String
});
export default mongoose.models.Tourist ||
  mongoose.model("Tourist", touristSchema);

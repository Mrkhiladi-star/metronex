import mongoose from "mongoose";
const cardSchema = new mongoose.Schema({
  cardId: String,
  balance: Number
});
export default mongoose.models.Card ||
  mongoose.model("Card", cardSchema);

const mongoose = require("mongoose");
const Review = require("./reviews");
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});
CampgroundSchema.post('findOneAndDelete', async (data) => {
  if (data) {
    await Review.deleteMany({ _id: { $in: data.reviews } })
  }
})
module.exports = mongoose.model("Campground", CampgroundSchema);

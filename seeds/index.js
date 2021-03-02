const mongoose = require("mongoose");
const Campground = require("../models/campgrounds");
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')


mongoose
    .connect("mongodb://localhost:27017/yelp-camp", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => {
        console.log("we're connected!");
    })
    .catch((err) => {
        console.log("Connection Failed!");
        console.log(err);
    });

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20 + 10)
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            author: '603a06c0edbb4c43843825ef',
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque quidem fuga qui perferendis corporis tempora soluta aspernatur, iste nesciunt saepe!',
            price
        })
        camp.save();
    }
}

seedDb()


const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Cafe = require('../models/cafe');

mongoose.connect('mongodb://127.0.0.1:27017/melb-cafe');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// const seedDB = async () => {
//     await Cafe.deleteMany({});
//     const c = new Cafe({title: 'purple field'})
//     await c.save();
// }

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Cafe.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const coffeeShop = new Cafe({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            image: `https://picsum.photos/400?random=${Math.random()}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.',
            price
        })
        await coffeeShop.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
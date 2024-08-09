const express = require('express');
const Cafe = require('./models/cafe');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/melb-cafe');


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
})

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))



app.get('/', (req, res) =>{
  res.render('Home')
})


app.get('/cafes', async(req, res) =>{
 const cafes = await Cafe.find({});
 res.render('cafes/index', {cafes})
})

app.get('/cafes/:id', async(req, res) => {
  const cafe = await Cafe.findById(req.params.id)
res.render ('cafes/show', {cafe});
})

app.listen(3000, () => {
  console.log('Serving on port 3000')
})
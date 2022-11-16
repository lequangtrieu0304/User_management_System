const express = require('express');
const app = express();
const path = require('path')
const bodyParser = require('body-parser')

const PORT = 3000;

// const connectDB = require('./config/database');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('quang trieu')
})

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use('/player', require('./src/router/playerRouters'));

app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
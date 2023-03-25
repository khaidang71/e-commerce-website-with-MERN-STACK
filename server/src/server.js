require('dotenv').config();

const path = require('path');
const express = require('express');
const morgan = require('morgan');
// const methodOverride = require('method-override')
const cors = require('cors')

// const handlebars = require('express-handlebars');

const route = require('./routes');
const db = require('./config/db');
// import data from './data.js'
// const { data } = require('./data');

//connect to db
db.connect();

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// override with POST having ?_method=DELETE
// app.use(methodOverride('_method'));

const port = 5000;

// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.urlencoded({
//   extended: true
// }));
//HTTP logger 
app.use(morgan('combined'));

//Template engine
// app.engine('hbs', handlebars.engine({
//   extname: '.hbs',
//   helpers: {
//     sum: (a, b) => a + b,
//   }
// }));
// app.set('view engine', 'hbs');
// app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);
// 

// const __dirname = path.resolve()
// app.use(express.static(path.join(__dirname, '/client/build')));
// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, '/client/build/index.html'))
// );

app.listen(port, () => {
  console.log(`server at http://localhost:${port}`)
});
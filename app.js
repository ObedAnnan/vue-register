const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const passport = require('passport');

//intialize the app
const app = express();

//middlewares
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

//cors middleware
app.use(cors());

//setting up static direcctory
app.use(express.static(path.join(__dirname, 'public')));

//use the passport middleware
app.use(passport.initialize());

//Bring in the passport strategy
require('./config/passport')(passport);

//bring in the database condig
const db =require('./config/keys').mongoURI;
mongoose.connect(db, {useNewUrlParser:true
}).then(() => {
    console.log('Database connected successfully ${db}')
}).catch(err => {
    console.log ('Unable to connect with the databse ${err}')
});

//app.get('/', (req, res) => {
  //  return res.send("<h1>Hellow world</h1>");
//});
//Bring in the users route


const users = require('./routes/api/users');
app.use('/api/users', users);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('server started on port ${PORT}');
});


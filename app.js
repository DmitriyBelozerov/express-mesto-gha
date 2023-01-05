const express = require('express');
const app = express(); //приложение сервер
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const usersRouter = require('./routes/users.js');

const { PORT = 3000} = process.env;

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use('/', usersRouter);

app.listen(PORT, ()=>{
  console.log(__filename);
})
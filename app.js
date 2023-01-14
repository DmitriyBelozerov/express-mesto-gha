const express = require('express');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(helmet());
app.use(limiter);
app.use(cors());

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '63becd0a97193ae4bf59b5f5',
  };
  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('/404', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT} / Сервер запущен на "${PORT}" порте`);
});

const express = require('express');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { errors } = require('celebrate');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middlewares/auth');

// const NotFoundError = require('./errors/not-found-err');

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

app.use('/users', usersRouter);
app.use(auth);
app.use('/cards', cardsRouter);
// app.use('*', (req, res, next) => {
//   try {
//     throw new NotFoundError('Страница не найдена')
//   } catch (next)
// });
app.use(errors());
app.use((err, req, res) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? `На сервере произошла ошибка ${err}`
      : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT} / Сервер запущен на "${PORT}" порте`);
});

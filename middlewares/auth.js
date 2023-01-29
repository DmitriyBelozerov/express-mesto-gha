const jwt = require('jsonwebtoken');

const ERROR_LOGGIN = 401;

module.exports = (req, res, next) => {
  // const { authorization } = req.headers;
  // if (!authorization || !authorization.startsWith('Bearer ')) {
  //   return res.status(ERROR_LOGGIN).send({ message: 'Необходима авторизация' });
  // }
  // const token = authorization.replace('Bearer ', '');
  // let payload;
  // try {
  //   payload = jwt.verify(token, 'secret-key');
  // } catch (err) {
  //   return res
  //     .status(ERROR_LOGGIN).send({ message: 'Необходима авторизация' });
  // }
  req.user = {
    _id: '63becd0a97193ae4bf59b5f5',
  };
  return next();
};

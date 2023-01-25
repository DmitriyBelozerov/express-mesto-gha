class LoginError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = LoginError;

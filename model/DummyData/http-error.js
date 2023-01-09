class HttpError extends Error {
  constructor(message, errorCode) {
    super(message);
    this.statusCode = errorCode || 401;
  }
}

export default HttpError;

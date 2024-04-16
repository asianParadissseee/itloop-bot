export const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).send({
    success: false,
    message: "Internal Server Error",
    error: err.message || 'An unknown error occurred'
  });
  next()
};
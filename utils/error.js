// setiap ada error panggil fungsi ini
const errorHandler = (statusCode, errorMessage, res) => {
  res.status(statusCode).json({
    status: "ERROR",
    message: errorMessage,
  });
};

module.exports = errorHandler;

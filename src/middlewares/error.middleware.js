export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Error interno del servidor";

  if (statusCode === 500) {
    console.error(err);
  }

  res.status(statusCode).json({
    status: "error",
    message,
  });
};

export const notFoundHandler = (req, res) => {
  res.status(404).json({
    status: "error",
    message: `La ruta ${req.originalUrl} no existe`,
  });
};

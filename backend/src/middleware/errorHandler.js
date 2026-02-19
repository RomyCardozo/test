export const notFoundHandler = (_req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
};

export const errorHandler = (error, _req, res, _next) => {
  console.error(error);
  res.status(error.status || 500).json({
    message: error.message || 'Ocurrió un error interno en el servidor'
  });
};

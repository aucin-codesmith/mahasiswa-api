function notFoundHandler(req, res, next) {
  res.status(404).json({ pesan: `Endpoint ${req.method} ${req.originalUrl} tidak ditemukan` });
}

function globalErrorHandler(err, req, res, next) {
  console.error(err);

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ pesan: 'Format JSON pada body request tidak valid' });
  }

  const status = err.status || err.statusCode || 500;
  res.status(status).json({ pesan: err.message || 'Terjadi kesalahan pada server' });
}

module.exports = { notFoundHandler, globalErrorHandler };
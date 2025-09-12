exports.errorMiddleware = (err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(err.status || 500).render('error', { title: 'Error', message: 'Something went wrong!' });
};
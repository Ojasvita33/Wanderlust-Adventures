exports.errorMiddleware = (err, req, res, next) => {
  console.error('Error occurred at:', new Date().toISOString());
  console.error('Request URL:', req.url);
  console.error('Request Method:', req.method);
  console.error('Error:', err.stack);
  
  const status = err.status || 500;
  const message = process.env.NODE_ENV === 'production' 
    ? 'Something went wrong!' 
    : err.message || 'Something went wrong!';
    
  res.status(status).render('error', { 
    title: `Error ${status}`, 
    message: message,
    user: req.session.user 
  }); 
};

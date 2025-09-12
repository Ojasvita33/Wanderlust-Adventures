exports.errorMiddleware = (err, req, res, next) => {
  console.error('Error:', err.stack);
<<<<<<< HEAD
  res.status(err.status || 500).render('error', { title: 'Error', message: 'Something went wrong!' });
};
=======
  res.status(err.status || 500).render('error', { title: 'Error', message: 'Something went wrong!' }); 
};
>>>>>>> 8fd1a0cd3fda0a9c3742b3970ecc4ba44cc3589f

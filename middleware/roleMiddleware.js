// middleware/roleMiddleware.js
exports.requireAdmin = (req, res, next) => {
  const user = req.session?.user;
  if (user && user.role === 'admin') {
    return next();
  }
  return res.status(403).render('404', { title: 'Forbidden' });
};

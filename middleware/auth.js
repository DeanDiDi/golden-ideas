const config = require('config');
const jwt = require('jsonwebtoken');

function userAuth(req, res, next) {
  const token = req.header('x-auth-token');

  // Check for token
  if (!token) res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // Add user from payload
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ msg: 'User token is not valid' });
  }
}

function adminAuth(req, res, next) {
  const token = req.header('x-auth-token');

  // Check for token
  if (!token) res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // Add user from payload
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(400).json({ msg: 'Admin token is not valid' });
  }
}

module.exports = {
  userAuth,
  adminAuth,
};

const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {

  const token = req.header('x-auth-token')

  if (!token) {
    return res.status(401).send('No token, authorization denied')
  }

  try {
    const decoded = jwt.verify(token, config.get('JWT_SECRET'))

    req.user = decoded.user

    next()
  } catch (error) {
    return res.status(401).send('Invalid token')
  }
}

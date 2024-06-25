const status = require('http-status')

const notFound = (req, res, next) => {
  return res.status(status.NOT_FOUND).json({
    success: false,
    error: 'api not found.',
    status_code: status.NOT_FOUND
  });
};

module.exports = notFound

const jwt = require('jsonwebtoken');

const authorization = (req, res, next) => {
  let token = req.headers.authorization;
  if(token !== undefined) {
    token = token.replace("Bearer ", "")
  }
  jwt.verify(token, process.env.SECRET_KEY, (error, result) => {
    if(error) {
      const errorResponse = {
        code: 401,
        message: `Unauthorized: ${error.message}`
      };
      return res.status(401).json(errorResponse);
    } else {
      req.body.userId = result._id
      next();
    }
  });
};

module.exports = authorization;

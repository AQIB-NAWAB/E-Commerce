const CustomError = require("../utils/errorhandler");

const errorHandler = (err, req, res, next) => {
  // Wrong mongod ID error
  if (err.name === "CastError") {
    const message = `Resources not found.Invalid: ${err.path}`;
    err = new CustomError(message, 400);
  }
  // Mongoose duplicate key Error
  if (err.name === "MongoError" && err.code === 11000) {
    const field = Object.keys(err.keyValue)[0]; // get the field causing the error
    const value = err.keyValue[field]; // get the value causing the error
    const message = `Duplicate key error: ${field} with value ${value} already exists.`;
    err = new CustomError(message, 400);
  }
  //wrong jsonwebToken Error
  if(err.name==="JsonWebTokenError"){
    const message=`Json Web Token is invalid try again`
    err=new CustomError(message,400)
  }
  // JWT EXPIRE ERROR
  if(err.name==="TokenExpiredError"){
    const message=`Json Web Token is EXPIRED try again`
    err=new CustomError(message,400)
  }
  return next( res.status(err.statusCode || 500).json({
    status: false,
    message: err.message || "Internal Server Error",
  }));
};

module.exports = errorHandler;
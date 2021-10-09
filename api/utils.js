'use strict';

const jwt = require('jsonwebtoken');
const User = require('../mvc/models/user');

exports.createToken = function(user) {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET_TOKEN, {
    algorithm: 'HS256',
    expiresIn: '2h'
  });
};

exports.decodeToken = function(token) {
  let userInfo = {};
  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    userInfo.userId = decoded.id;
    userInfo.email = decoded.email;
  } catch (e) {}

  return userInfo;
};

exports.validate = async function(decoded, request) {
  const user = await User.findOne({ _id: decoded.id });
  if (!user) {
    return { isValid: false };
  } else {
    return { isValid: true };
  }
};

exports.getUserIdFromRequest = function(request) {
  let userId = null;
  try {
    const authorization = request.headers.authorization;
    let token = authorization.split(' ')[1];
    let decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    userId = decodedToken.id;
  } catch (e) {
    userId = null;
  }
  return userId;
};
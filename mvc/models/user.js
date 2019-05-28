'use strict';

const Boom = require('boom');
const Bcrypt = require('bcrypt');
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String
});

userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email : email});
};

userSchema.methods.comparePlainTextPassword = function(candidatePassword) {
  const isMatch = this.password === candidatePassword;
  if (!isMatch) {
    throw new Boom('Password mismatch');
  }
  return this;
};

userSchema.methods.hashPassword = async function(candidatePassword) {
  // Store hash in DB instead of password.
  console.log(process.env.PASSWORD_HASH_SALT_ROUNDS);
  const salt = await Bcrypt.genSalt( 10 );
  let hash = await Bcrypt.hash(candidatePassword, salt );
  if (!hash) {
    throw new Boom('Password hashing - general failure');
  }
  return hash;
};

userSchema.methods.compareHashedPassword = async function(candidatePassword) {
  const isMatch = await Bcrypt.compare(candidatePassword, this.password);
  if (!isMatch) {
    throw new Boom('Password mismatch');
  }
  return this;
};

module.exports = Mongoose.model('User', userSchema);
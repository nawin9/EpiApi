import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';

const User = mongoose.Schema(
  {
    username: { type: String, index: { unique: true, dropDups: true } },
    password: { type: String },
    roles: { type: Array, default: [] },
  },
  { timestamps: true }
);

User.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
User.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('User', User);

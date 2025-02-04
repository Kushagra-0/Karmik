const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  events: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }]
});

// Hash password before saving to the database
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare entered password with stored password
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.addEvent = async function(eventId) {
  if (!this.events.includes(eventId)) {
    this.events.push(eventId);
    await this.save();
  }
};

module.exports = mongoose.model('User', userSchema);
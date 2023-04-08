const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  strength: { type: Number, required: true, index: true },
  magic: { type: Number, required: true },
  health: { type: Number, required: true },
  status: { type: String, required: true },
  image: { type: String, required: true },
  xp: { type: Number, required: true, index: true }
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  owner:{type:String,required:true},
  name: { type: String, required: true },
  level: { type: Number, required: true, default: 1 },
  strength: { type: Number, required: true, index: true, default: 1 },
  magic: { type: Number, required: true, default: 1 },
  health: { type: Number, required: true, default: 10 },
  status: { type: Number, required: true, default: 0 },
  image: { type: String, required: true },
  xp: { type: Number, required: true, index: true, default: 0 },
  wins: { type: Number, required: true, default: 0 },
  losses: { type: Number, required: true, default: 0 },
  Magicwins: { type: Number, required: true, default: 0 },
  Magiclosses: { type: Number, required: true, default: 0 },
  Mainwins: { type: Number, required: true, default: 0 },
  Mainlosses: { type: Number, required: true, default: 0 },
  mana:{type:Number,required:true,default:1},
 
},{ timestamps: true });

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;

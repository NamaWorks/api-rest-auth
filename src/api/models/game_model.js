const mongoose = require("mongoose")

const gameSchema = new mongoose.Schema({
  name: { type: String, required:true, unique:true },
  release_date:{ type: String, default: "TBD" } , 
  genres: { type: Array, required:true},
  description: { type: String, required: true}, 
  console:{type: Array, required: true},
},
{
  timestamps:true,
  collection: "games"
})

const Game = mongoose.model("games", gameSchema, "games")

module.exports = Game
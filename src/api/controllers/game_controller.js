const Game = require("../models/game_model");

const getGames = async (req, res, next) => {
  try {
    const games = await Game.find()
    return res.status(200).json(games)
  } catch (error) {
    return res.status(400).json(`failed getting games: ${error}`)
  }
}

module.exports = { getGames }
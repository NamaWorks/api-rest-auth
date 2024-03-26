const Game = require("../models/game_model");

const getGames = async (req, res, next) => {
  try {
    const games = await Game.find()//.populate("Console")
    return res.status(200).json(games)
  } catch (error) {
    return res.status(400).json(`failed getting games: ${error}`)
  }
}

const deleteGame = async (req, res ,next) => {
  try {
    const { id } = req.params
    const gameDeleted = await Game.findByIdAndDelete(id)

    return res.status(200).json(`game deleted: ${gameDeleted}`)
  } catch (error) {
    return res.status(400).json(`error deleting game: ${error}`)
  }
}

const updateGame = async (req, res, next) => {
  try {
    const { id } = req.params 
    const newGame = new Game(req.body)
    newGame._id = id

    const updatedGame = await Game.findByIdAndUpdate(id, newGame, { new: true})

    return res.status(200).json(`game updated: ${updatedGame}`)
  } catch (error) {
    return res.status(400).json(`error updating game: ${error}`)
  }
}

const createGame = async (req, res, next) => {
  try {
    const newGame = new Game({
      name: req.body.name,
      release_date: req.body.release_date,
      genres: req.body.genres,
      description: req.body.description,
      console: req.body.console,
    })

    const gameDuplicated = await Game.findOne({name: req.body.name})
      if(gameDuplicated){return res.status(400).json(`That game already exists`)}

    const gameSaved = await newGame.save()

    return res.status(200).json(`game saved: ${gameSaved}`)

  } catch (error) {
    return res.status(200).json(`error creating game: ${error}`)
  }
}

const getGameById = async (req, res, next) => {
  try {
    const { id } = req.params
    const game = await Game.findById(id)
    if (game) {
			return res.status(200).json(game);
		} else {
			return res.status(404).json('no game found by this id');
		}
  } catch (error) {
    return res.status(400).json(`error getting game by ID: ${error}`)
  }
}

module.exports = { getGames, updateGame, deleteGame, createGame, getGameById }
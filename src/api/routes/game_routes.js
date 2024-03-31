const { isAdmin, isAuth } = require("../../middlewares/auth")
const { getGames, updateGame, deleteGame, createGame, getGameById } = require("../controllers/game_controller")
const Console = require("../models/console_model")

const gameRoutes = require("express").Router()

gameRoutes.get("/:id", getGameById)
gameRoutes.put("/:id",[isAdmin], updateGame)
gameRoutes.delete("/:id",[isAdmin], deleteGame)
gameRoutes.post("/",[isAuth], createGame)
gameRoutes.get("/", getGames)
gameRoutes.get('/', async (req, res, next) => {
  try {
    const consoles = await Console.find().populate('console')
    return res.status(200).json(consoles)
  } catch (err) {
    return next(err)
  }
});
 
module.exports = gameRoutes
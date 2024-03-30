const { isAdmin, isAuth } = require("../../middlewares/auth")
const { getGames, updateGame, deleteGame, createGame, getGameById } = require("../controllers/game_controller")

const gameRoutes = require("express").Router()

gameRoutes.get("/:id", getGameById)
gameRoutes.put("/:id",[isAdmin], updateGame)
gameRoutes.delete("/:id",[isAdmin], deleteGame)
gameRoutes.post("/",[isAuth], createGame)
gameRoutes.get("/", getGames)
 
module.exports = gameRoutes
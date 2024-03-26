const { getGames, updateGame, deleteGame, createGame } = require("../controllers/game_controller")

const gameRoutes = require("express").Router()

gameRoutes.get("/", getGames)
gameRoutes.put("/:id", updateGame)
gameRoutes.delete("/:id", deleteGame)
gameRoutes.post("/", createGame)
 
module.exports = gameRoutes
const { getGames } = require("../controllers/game_controller")

const gameRoutes = require("express").Router()

gameRoutes.get("/", getGames)
 
module.exports = gameRoutes
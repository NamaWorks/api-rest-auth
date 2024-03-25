require("dotenv").config()
const express = require("express");
const { connectDB } = require("./src/config/db");
const usersRoutes = require("./src/api/routes/user_routes");
const { feedGames } = require("./src/seeds/games.seed");
const gameRoutes = require("./src/api/routes/game_routes");
const { feedConsoles } = require("./src/seeds/consoles.seed");

const app = express()

connectDB()

app.use(express.json())

app.use("/api/v01/users", usersRoutes)
app.use("/api/v01/games", gameRoutes)

app.use("*", (req, res, next) => {
  return res.status(404).json(`ROUTE NOT FOUND`)
})

app.listen(3000, () => {
  console.log(`server is running on http://localhost:3000`)
})
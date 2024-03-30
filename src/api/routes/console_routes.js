const { getConsoles } = require("../controllers/console_controller");

const consoleRoutes = require("express").Router()

consoleRoutes.get("/", getConsoles)


module.exports = consoleRoutes
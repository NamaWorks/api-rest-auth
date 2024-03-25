const { isAuth } = require("../../middlewares/auth")
const { register, login, deleteUser, getUsers } = require("../controllers/user_controller")

const usersRoutes = require("express").Router()

usersRoutes.post("/register", register)
usersRoutes.post("/login", login)
usersRoutes.delete("/:id", [isAuth], deleteUser)
usersRoutes.get("/", getUsers)

module.exports = usersRoutes

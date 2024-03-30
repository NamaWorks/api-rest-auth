const User = require("../api/models/user_model")
const { verifyJwt } = require("../utils/jwt")

const isAuth = async(req, res, next) => {
  try {
    
    const token = req.headers.authorization

    if(!token) {
      return res.status(400).json(`you are not authorised`)
    }
    const parsedToken = token.replace("Bearer ", "")
    // console.log(parsedToken)
    const  { id } = verifyJwt(parsedToken)
    // console.log(id)

    const user = await User.findById(id)
    user.password = null
    req.user = user
    next()

  } catch (error) {
    return res.status(400).json(`you are not authorised`)
  }
}

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization


    if(!token) {
      return res.status(400).json(`you are not authorised`)
    }

    const parsedToken = token.replace("Bearer ", "")
    

    const validToken = verifyJwt(parsedToken, process.env.JWT_SECRET)
    

    const userLogued = await User.findById(validToken.id)
    
    const userRole = userLogued.role
    

    if(userRole === "admin"){
    userLogued.password = null;
    // req.user = user
    next()
    } else {return res.json(`you are not an admin -`)}
  } catch (error) {
    console.log(error)
    return res.status(400).json(`you are not an admin`)
  }
}
module.exports = { isAuth, isAdmin }
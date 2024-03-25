const { generateSign } = require("../../utils/jwt")
const User = require("../models/user_model")
const bcrypt = require("bcrypt")

const register = async (req,res,next) => {
  try {
    
    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      bornYear: req.body.bornYear,
      role: req.body.role,
      profileImage: req.body.profileImage,
    })
    
    const userDuplicated = await User.findOne({username: req.body.username,})
      if(userDuplicated) {return res.status(400).json(`That username already exists`)}

    const userSaved = await newUser.save()

    return res.status(201).json(userSaved)
    
  } catch (error) {
    return res.status(400).json(error)
  }
}

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({username : req.body.username})

    if (user) {
      if(bcrypt.compareSync(req.body.password, user.password)) {
        const token = generateSign(user._id)
      return res.status(200).json({ user, token })
      } else {
        return res.status(400).json("The user or password are not correct")
      }
    } else {
      return res.status(400).json("The user or password are not correct")
    }
  
  } catch (error) {
    return res.status(400).json(`error`)
  }
}

const deleteUser = async (req, res,next) => {
  try {
    
    const { id } = req.params

    const userDeleted = await User.findByIdAndDelete(id)

    return res.status(200).json({
      mensaje: "user deleted",
      userDeleted
    })

  } catch (error) {
    return res.status(400).json(error)
  }
}

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newUser = new User(req.body)
    newUser._id = id

    const updatedUser = await User.findByIdAndUpdate(id, newUser, {new:true})

    return res.status(200).json(updatedUser)

  } catch (error) {
    
  }
}
module.exports = { register, login, deleteUser, getUsers, updateUser }
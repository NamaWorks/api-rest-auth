const Console = require("../models/console_model")

const getConsoles = async (req, res, next) => {
  try {
    const consoles = await Console.find()
    return res.status(200).json(consoles)
  } catch (error) {
    return res.status(400).json(`error getting consoles: ${error}`)
  }
}

module.exports = { getConsoles }
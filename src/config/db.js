const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URL_DB)
    console.log(`Connection to DB achieved 👌`)
  } catch (error) {
    console.log(`Couldn't connect to DB 👎`)
  }
}

module.exports = { connectDB }
const mongoose = require("mongoose")
const Console = require("../api/models/console_model")
const { insertMany } = require("../api/models/user_model")

const consoles = [
  {
    name: "PS5",
    company: "Sony"
  },
  {
    name: "Xbox",
    company: "Microsoft"
  },
  {
    name: "Switch",
    company: "Nintendo"
  },
  {
    name: "PC",
    company: "Valve"
  }
]

const consolesDocuments = consoles.map(console => new Console(console))
const feedConsoles = async () => {
  try {
    await mongoose
      .connect(process.env.URL_DB)
      .then(async () => {
        const allConsoles = await Console.find()

        if(allConsoles.length>=0){
          await Console.collection.drop()
        }
      })
      .catch((error) => { console.log(`error deleting data: ${error}`) })
      .then(async () => {
        await Console.insertMany(consolesDocuments)
      })
      .catch((error) => {console.log(`error creating data: ${error}`)})
  } catch (error) {
    console.log(`error feeding consoles data: ${error}`)
  }
}

feedConsoles()

module.exports = { feedConsoles }
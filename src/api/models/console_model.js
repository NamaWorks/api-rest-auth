const mongoose = require("mongoose")


const consoleSchema = new mongoose.Schema({
    name: {type: String, required: true},
    company: {type: String, required: true}
},
{
  timestamps: true,
  collection:"consoles"
})

const Console = mongoose.model("consoles", consoleSchema, "consoles")
module.exports = Console
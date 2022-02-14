const mongoose = require("mongoose")
const Schema = mongoose.Schema

const noteSchema = new Schema(
  {
    note: String,
    comment : String
  },
  { timestamps: true }
)

module.exports = mongoose.model("Note", noteSchema)

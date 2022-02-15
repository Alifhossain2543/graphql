const jwt = require("jsonwebtoken")
const User = require("../models/user")
const { AuthenticationError } = require("apollo-server-express")
const Note = require("../models/note")
const protectedRoute = require("../graphql/protectedRoute")


const resolvers = {
  Query: {
    getNotes: async (parent, args, { req, res }, info) => {
      const notes = await Note.find()
      return notes
    },
    logout: (_, args, { req, res }) => {
      res.clearCookie("token")
      res.removeHeader("Authorization")

      return { message: "Succesfully logged out" }
    },
  },
  Mutation: {
    signup: async (_, args, { req, res }) => {
      const user = await new User({
        email: args.email,
        password: args.password,
      })

      await user.save()
      return { email: args.email }
    },
    login: async (_, args, { req, res }, info) => {
      const user = await User.findOne({ email: args.email })

      if (!user || !(await user.comparePassword(args.password, user.password)))
        throw new AuthenticationError("Credentials does not exist")

      const token = jwt.sign({ email: args.email }, process.env.PRIVATE_KEY, {
        expiresIn: "4h",
      })
      res.cookie("token", token)
      res.setHeader("Authorization", "Bearer " + token)

      return { email: args.email, token: token }
    },

    addNote: async (_, args, context, info) => {
      protectedRoute(_, args, context, info)
      const note = await new Note({
        note: args.note,
        comment: args.comment,
        createdOn: args.createdOn,
      })
      await note.save()

      return note
    },
    fileUpload: async(_, args, { req, res }) => {
      console.log(args)
    }
  },
}

module.exports = resolvers

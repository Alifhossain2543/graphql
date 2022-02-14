const jwt = require("jsonwebtoken")
const {AuthenticationError} = require('apollo-server-express')

const protectedRoute = (_, args, context, info) => {
  if (
    context.req.headers.authorization &&
    context.req.headers.authorization.startsWith("Bearer ")
  ) {
    const token = context.req.headers.authorization.split(" ")[1]

    const decodeToken = jwt.verify(token, process.env.PRIVATE_KEY)
    context.req.user = decodeToken
  } else {
    throw new AuthenticationError("You're not authenticated.")
  }

}

module.exports = protectedRoute

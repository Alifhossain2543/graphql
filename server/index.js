const express = require("express")
const cors = require('cors')
const cookieParser = require("cookie-parser")
const app = express()
const mongoose = require("mongoose")
require("dotenv").config({path : './configure.env'})
const { ApolloServer } = require("apollo-server-express")
const typeDefs = require('./graphql/typeDefs')
const resolvers = require("./graphql/resolvers")

app.use(express.json())
app.use(cookieParser())
app.use(cors())

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

app.get('/', async (_, res) => {
    res.send("hit the endpoint")
})

mongoose.connect(process.env.DB_PASSWORD, options, () => {
  console.log("db is connected")
})

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context : ({req, res}) => {return {req, res}}

  })

  await server.start()
  server.applyMiddleware({ app, path : '/api/graphql' })
  app.listen(5000, () => {
    console.log("server is running on port 5000")
  })
  
}
    startApolloServer()

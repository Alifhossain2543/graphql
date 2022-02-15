const {gql} = require('apollo-server-express')
const { Kind, GraphQLScalarType } = require("graphql")

const resolverMap = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value) // value from the client
    },
    serialize(value) {
      return value.getTime() // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(+ast.value) // ast value is always in string format
      }
      return null
    },
  }),
}


const typeDefs = gql`
  scalar Date #or we can use the grapql-iso-date
  scalar Upload
  type User {
    email: String
    token: String
  }
  type Note {
    note: String!
    comment: String
    createdOn: Date
  }
  type Query {
    getNotes: [Note]
    logout: Logout
  }

  type Logout {
    message: String
  }
  type File {
    fileName: String
    fileUrl: String
  }

  type Mutation {
    login(email: String!, password: String!): User!
    signup(email: String!, password: String!): User!
    addNote(note: String, comment: String, createdOn: Date): Note
    fileUpload(file: Upload): File
  }
`
module.exports = typeDefs
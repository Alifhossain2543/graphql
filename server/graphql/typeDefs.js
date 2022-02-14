const {gql} = require('apollo-server-express')
const typeDefs = gql`
  type User {
    email: String
    token: String
  }
  type Note {
    note: String!
    comment: String
  }
  type Query {
    getNotes: [Note]
    logout: Logout
  }

  type Logout {
    message: String
  }

  type Mutation {
    login(email: String!, password: String!): User!
    signup(email: String!, password: String!): User!
    addNote(note: String, comment: String): Note
  }
`
module.exports = typeDefs
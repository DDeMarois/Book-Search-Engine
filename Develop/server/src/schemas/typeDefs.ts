import { gql } from 'graphql-tag';

const typeDefs = gql`

type User {
    _id: ID!
    username: String!
    email: String!
    savedBooks: [Book]
    bookCount: Int
}

type Book {
    bookId: String!
    title: String!
    authors: [String!]
    description: String
    image: String
    link: String
}

input BookInput {
    bookId: String!
    title: String!
    authors: [String!]
    description: String
    image: String
    link: String
}

type Query {
    me: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: String!): User
}

type Auth {
    token: String!
    user: User
}
`;

export default typeDefs;
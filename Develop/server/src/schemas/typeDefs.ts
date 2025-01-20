const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        password: String
        bookCount: Int
        savedBooks: [Book]!
    }

    type Book {
        bookId: String
        authors: String
        description: String
        title: String
        image: String
        link: String
    }

    input UserInput {
        username: String!
        email: String!
        password: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]!
        user(userId: ID!): User
        savedBooks: [Book]
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(input: UserInput!): Auth
        saveBook(userId: ID!, book: String!): User
        removeBook(book: String!): User
    }
`;

export default typeDefs;
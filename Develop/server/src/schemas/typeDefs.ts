const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: ID
        authors: [String]
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

    input SaveBookInput {
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        user(username: String!): User
        me: User
    }

    type Mutation {
        login(input: LoginUserInput!): Auth
        addUser(input: AddUserInput!): Auth
        saveBook(input: SaveBookInput!): User
        deleteBook(bookId: String!): User
    }
`;

export default typeDefs;
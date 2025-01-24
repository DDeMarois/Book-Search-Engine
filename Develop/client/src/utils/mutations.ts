import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation addUser($input: UserInput!) {
        addUser(input: $input) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($userId: ID!, $book: String!) {
        saveBook(userId: $userId, book: $book) {
            _id
            username
            book
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($book: String!) {
        removeBook(book: $book) {
            _id
            username
            book
        }
    }
`;

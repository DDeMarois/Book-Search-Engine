import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import { removeBookId } from '../utils/localStorage';

const SavedBooks: React.FC = () => {
    const { loading, data } = useQuery(GET_ME);
    const [removeBook] = useMutation(REMOVE_BOOK);

    const userData = data?.me || {};

    const handleDeleteBook = async (bookId: string) => {
        try {
            await removeBook({
                variables: { bookId },
                update: (cache) => {
                    const { me } = cache.readQuery({ query: GET_ME }) as any;
                    cache.writeQuery({
                        query: GET_ME,
                        data: { me: { ...me, savedBooks: me.savedBooks.filter((book: any) => book.bookId !== bookId) } },
                    });
                },
            });

            removeBookId(bookId);
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Saved Books</h2>
            {userData.savedBooks?.length ? (
                <ul>
                    {userData.savedBooks.map((book: any) => (
                        <li key={book.bookId}>
                            <p>{book.title}</p>
                            <button onClick={() => handleDeleteBook(book.bookId)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No saved books</p>
            )}
        </div>
    );
};

export default SavedBooks;
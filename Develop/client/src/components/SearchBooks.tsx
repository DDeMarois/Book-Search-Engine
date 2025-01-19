import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations';

const SearchBooks: React.FC = () => {
    const [savedBookIds, setSavedBookIds] = useState<string[]>([]);
    const [saveBook] = useMutation(SAVE_BOOK);

    const handleSaveBook = async (bookId: string) => {
        try {
            const { data } = await saveBook({
                variables: { bookId },
            });

            if (!data) {
                throw new Error('Something went wrong!');
            }

            setSavedBookIds([...savedBookIds, bookId]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            {/* Your component JSX goes here */}
            <button onClick={() => handleSaveBook('exampleBookId')}>Save Book</button>
        </div>
    );
};

export default SearchBooks;
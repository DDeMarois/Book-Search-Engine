import { User, Book } from '../models/index.js';
import { signToken, AuthenticationError } from '../services/auth.js';

interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    bookCount: number;
    savedBooks: Book[];
}
interface Book {
    authors: string[];
    description: string;
    bookId: string;
    image: string;
    link: string;
    title: string;
}

interface AddUserArgs {
    input: {
        username: string;
        email: string;  
        password: string;
    };
}
interface UserArgs {
    userId: string;
}
interface SaveBookArgs {
    userId: string;
    book: Book;
}

interface DeleteBookArgs {
    book: Book;
}

interface Context {
    user?: {
        _id: string;
        username: string;
        email: string;
    };
}

const resolvers = {
    Query: {
        users: async (): Promise<User[]> => {
            return await User.find()
        },
        user: async (_parent: unknown, { userId }: UserArgs): Promise<User | null> => {
            return await User.findOne({ _id: userId })
        },

        me: async (_parent: unknown, _args: unknown, context: Context): Promise<User | null> => {
            if (context.user) {
                return await User.findOne({ _id: context.user._id })
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
    Mutation: {
        addUser: async (_parent: unknown, { input }: AddUserArgs): Promise<{ token: string; user: User }>=> {
            const user = await User.create({ ...input });
            const token = signToken(user.username, user.email, user._id);
            return { token, user: user.toObject() as User };
        },
        login: async (_parent: unknown, { email, password }: { email: string; password: string;}): Promise<{ token: string; user: User }> => {
            const user = await User.findOne({ email });
            if (!user) {
                throw AuthenticationError;
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user.username, user.email, user._id);
            return { token, user: user.toObject() as User };
        },


        saveBook: async (_parent: unknown, { userId, book }: SaveBookArgs, context: Context): Promise<User | null> => {
            if (context.user) {
                return await User.findOneAndUpdate(
                    { _id: userId },
                    { $addToSet: { savedBooks: book } },
                    { new: true, runValidators: true }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        removeBook: async (_parent: unknown, { book }: DeleteBookArgs, context: Context): Promise<User | null> => {
            if (context.user) {
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: book } },
                    { new: true }
                );;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
};

export default resolvers;

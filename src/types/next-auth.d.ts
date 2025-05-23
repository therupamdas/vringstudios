import 'next-auth';
import { DefaultSession } from 'next-auth';
declare module 'next-auth' {
    interface User {
        _id?: string;
        isverified?: boolean;
        isAcceptingMessages?: boolean;
        username?: string;
        image?: string;
    }
    interface Session {
        user: {
            _id?: string;
            isverified?: boolean;
            isAcceptingMessages?: boolean;
            username?: string;
            image?: string;
        } & DefaultSession['user']
    }
}
declare module 'next-auth/jwt' {
    interface JWT {
        _id?: string;
        isverified?: boolean;
        isAcceptingMessages?: boolean;
        username?: string;
        image?: string;
    }
}
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import type { AuthOptions } from 'next-auth';
import type { User } from 'next-auth';
import type { Session } from 'next-auth';
import { sign } from 'jsonwebtoken';

export const authConfig: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: User }) {
      const allowedEmails = [
        'gavinhensley@protonmail.com',
        'hensley.brenda@protonmail.com',
        'renaeehensley@gmail.com',
        'gavinhensley32@gmail.com',
      ];

      return user.email ? allowedEmails.includes(user.email) : false;
    },
    async session({ session }: { session: Session }) {
      if (session.user) {
        const token = sign(
          {
            email: session.user.email,
            name: session.user.name,
            role: 'admin',
          },
          process.env.NEXTAUTH_SECRET || 'your-secret-key',
          { expiresIn: '1h' }
        );
        session.user.token = token;
      }
      return session;
    },
  },
};

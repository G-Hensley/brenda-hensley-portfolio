import GithubProvider from 'next-auth/providers/github';
import type { AuthOptions } from 'next-auth';
import type { User } from 'next-auth';
import type { Session } from 'next-auth';

export const authConfig: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: User }) {
      const allowedEmails = [
        'gavinhensley@protonmail.com',
        'hensley.brenda@protonmail.com',
        'renaeehensley@gmail.com',
      ];
      console.log(user);
      console.log('Github client id', process.env.GITHUB_ID);
      console.log('Github client secret', process.env.GITHUB_SECRET);
      return user.email ? allowedEmails.includes(user.email) : false;
    },
    async session({ session }: { session: Session }) {
      return session;
    },
  },
};

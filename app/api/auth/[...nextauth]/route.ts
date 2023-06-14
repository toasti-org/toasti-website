import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions: AuthOptions = {
  callbacks: {
    jwt: async ({ token, account }) => {
      // Initialize access token and id when sign in
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    session: ({ session }) => {
      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: "" + process.env.GOOGLE_CLIENT_ID,
      clientSecret: "" + process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope:
            "https://www.googleapis.com/auth/calendar.events.owned https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
        },
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: "" + process.env.GOOGLE_CLIENT_ID,
      clientSecret: "" + process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "select_account",
          scope:
            "https://www.googleapis.com/auth/calendar.events.owned https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
    // Session expiration is time since **IDLE**
    maxAge: 3599,
    // Note that declaring jwt options maxAge is useless (after some experiments)
    // Regardless, in the docs it's said defaults to session.maxAge
  },
  callbacks: {
    jwt: async ({ token, account }) => {
      // account.access_token => access_token from Google API
      // account.expires_at => access_token expiration time in UTC (Google API)
      // Initialize access token and id when sign in
      if (account) {
        token.accessToken = account.access_token as string;
        token.accessTokenExpiresAt = (account.expires_at as number) * 1000;
      }
      return token;
    },
    session: ({ session, token }) => {
      // Target: set session expiration time as same value as access token expiration time
      // But we can't use session.expires because it's time recorded since **IDLE**, not login (access token generated)
      // So we save access token expiration time in other session variable and force sign out when Date.now() is larger than it
      session.accessTokenExpiresAt = token.accessTokenExpiresAt;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// Add new types
declare module "next-auth/core/types" {
  interface Session {
    accessTokenExpiresAt: number;
  }
}

declare module "next-auth/jwt/types" {
  interface JWT {
    accessToken: string;
    accessTokenExpiresAt: number;
  }
}

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { AuthOptions, TokenSet } from "next-auth";

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: "" + process.env.GOOGLE_CLIENT_ID,
      clientSecret: "" + process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "select_account",
          scope:
            "https://www.googleapis.com/auth/calendar.events.owned https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, account }) {
      // Google API access token Expiration Time
      const expires_in = 3599;

      if (account) {
        // Save the access token and refresh token in the JWT on the initial login
        token.access_token = account.access_token as string;
        token.expires_at = Math.floor(Date.now() / 1000 + expires_in);
        token.refresh_token = account.refresh_token as string;
        return token;
      } else if (Date.now() < token.expires_at * 1000) {
        // If the access token has not expired yet, return it
        return token;
      } else {
        // If the access token has expired, try to refresh it
        try {
          // https://accounts.google.com/.well-known/openid-configuration
          // We need the `token_endpoint`.
          const response = await fetch("https://oauth2.googleapis.com/token", {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: "" + process.env.GOOGLE_ID,
              client_secret: "" + process.env.GOOGLE_SECRET,
              grant_type: "refresh_token",
              refresh_token: "" + token.refresh_token,
            }),
            method: "POST",
          });

          // Not all TokenSet keys Available for google (TokenSet type is for general OAuth)
          const tokens: TokenSet = await response.json();

          if (!response.ok) throw tokens;

          // Update token and expiration date
          token.access_token = tokens.access_token as string;
          token.expires_at = Math.floor(Date.now() / 1000 + expires_in);

          return token;
        } catch (error) {
          // The error property will be used client-side to handle the refresh token error
          token.error = "RefreshAccessTokenError";
          return token;
        }
      }
    },
    async session({ session, token }) {
      session.error = token.error;
      return session;
    },
  },
};

declare module "next-auth/core/types" {
  interface Session {
    error?: "RefreshAccessTokenError";
  }
}

declare module "next-auth/jwt/types" {
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token: string;
    error?: "RefreshAccessTokenError";
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

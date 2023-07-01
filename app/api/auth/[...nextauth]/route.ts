import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { AuthOptions } from "next-auth";

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
    // Session expiration is time since **IDLE**
    maxAge: 24 * 60 * 60,
    // Note that declaring jwt options maxAge is useless (after some experiments)
    // Regardless, in the docs it's said defaults to session.maxAge
  },
  callbacks: {
    async jwt({ token, account }) {
      // Some details:
      // account.access_token => access_token from Google API
      // account.expires_at => access_token expiration time in UTC (in seconds) (Google API)

      if (account) {
        // Save the access token, expired time, and refresh token in the JWT on the initial login
        token.accessToken = account.access_token as string;
        token.accessTokenExpiresAt = (account.expires_at as number) * 1000; // Store in **MILISECONDS**
        token.refreshToken = account.refresh_token as string;
        return token;
      } else if (Date.now() < token.accessTokenExpiresAt) {
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
              client_id: "" + process.env.GOOGLE_CLIENT_ID,
              client_secret: "" + process.env.GOOGLE_CLIENT_SECRET,
              grant_type: "refresh_token",
              refresh_token: "" + token.refreshToken,
            }),
            method: "POST",
          });

          // Get response as JSON
          const newAccessToken: newAccessToken = await response.json();

          // If response error
          if (!response.ok) throw newAccessToken;

          // Update token, expiration date, and refresh token (if provided)
          token.accessToken = newAccessToken.access_token as string;
          token.accessTokenExpiresAt =
            Date.now() + newAccessToken.expires_in * 1000; // Store in **MILISECONDS**
          token.refreshToken =
            newAccessToken.refresh_token ?? token.refreshToken;
          return token;
        } catch {
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

interface newAccessToken {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  id_token: string;
  refresh_token?: string;
}

declare module "next-auth/core/types" {
  interface Session {
    error?: "RefreshAccessTokenError";
  }
}

declare module "next-auth/jwt/types" {
  interface JWT {
    accessToken: string;
    accessTokenExpiresAt: number;
    refreshToken: string;
    error?: "RefreshAccessTokenError";
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

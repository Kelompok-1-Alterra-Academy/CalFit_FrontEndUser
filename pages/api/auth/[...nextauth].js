import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    async jwt(params) {
      if (params?.account?.access_token) {
        params.token.acesssToken = params.account.access_token;
      }
      return params.token;
    },
  },
});

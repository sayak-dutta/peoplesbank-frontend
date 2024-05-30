
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

export const handler = NextAuth({
    providers: [
      Credentials({
        credentials: {
          email: {},
          password: {},
          customData: {}, // Add the custom field for user-defined data
        },
        authorize: async (credentials) => {
            let user = null;
            const { email, password } = await credentials;
            // Validate the custom data if needed (optional)
            console.log(email);
            if (!email) {
              throw new Error("User not found.");
            }
    
            // Return user object with profile data
            return credentials;
        },
      }),
    ],
    secret:process.env.AUTH_SECRET,
    pages: {
      signIn: "/auth", // Keep existing custom sign-in page setting
    },
  })

  export { handler as GET, handler as POST }
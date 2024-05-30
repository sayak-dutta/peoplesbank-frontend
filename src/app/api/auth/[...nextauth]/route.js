
import { loginRequest } from "@/axiso/apiendpoints";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

export const handler = NextAuth({
    providers: [
      Credentials({
        credentials: {
          email: {},
          password: {},
        },
        authorize: async (credentials) => {
            let user = null;
            const { email, password } = await credentials;
            let request = loginRequest(email,password)
            
            if (!email) {
              throw new Error("User not found.");
            }
    
            // Return user object with profile data
            return {email,name:""};
        },
      }),
    ],
    pages: {
      signIn: "/auth", // Keep existing custom sign-in page setting
    },
  })

  export { handler as GET, handler as POST }
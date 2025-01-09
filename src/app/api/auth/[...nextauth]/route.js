import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import User from '../../../../../models/user';
import { connectToDB } from '../../../../../utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
  ],
  callbacks: {
    // Called whenever a session is checked/created
    async session({ session, token, user }) {
      // Connect to the database
      await connectToDB();

      // Find the user in the database using their email
      const sessionUser = await User.findOne({ email: session.user.email });
      if (sessionUser) {
        session.user.id = sessionUser._id.toString(); // Add MongoDB _id to session
      }

      return session; // Return updated session
    },

    // Called when the user signs in
    async signIn({ profile }) {
      try {
        await connectToDB(); // Ensure DB connection

        // Check if the user already exists in the database
        const userExists = await User.findOne({ email: profile.email });

        // If the user doesn't exist, create a new record
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(/\s/g, "").toLowerCase(),
            image: profile.picture,
            twitter: "",
            github: "",
            youtube: "",
            instagram: "",
            linkedin: "",
            stackoverflow: "",
          });
        }

        return true; // Allow sign-in
      } catch (error) {
        console.log("Error during sign-in:", error.message);
        return false; // Prevent sign-in on error
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Store securely in environment variables
});

export { handler as GET, handler as POST };

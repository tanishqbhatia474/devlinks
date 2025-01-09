import { connectToDB } from "../../../../../../utils/database";
import User from "../../../../../../models/user";

export async function GET(req, { params }) {
  const { userId } = params;

  await connectToDB();

  try {
    const user = await User.findById(userId);

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Extract only the links
    const { twitter, github, youtube, instagram, linkedin, stackoverflow } = user;

    return new Response(
      JSON.stringify({
        links: [
          { platform: "Twitter", url: twitter, color: "bg-sky-500" },
          { platform: "GitHub", url: github, color: "bg-gray-800" },
          { platform: "YouTube", url: youtube, color: "bg-red-600" },
          { platform: "Instagram", url: instagram, color: "bg-pink-600" },
          { platform: "LinkedIn", url: linkedin, color: "bg-blue-600" },
          { platform: "Stack Overflow", url: stackoverflow, color: "bg-orange-500" },
        ].filter((link) => link.url), // Filter out platforms with no URLs
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching user links:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

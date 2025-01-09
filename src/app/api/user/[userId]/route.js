import { connectToDB } from '../../../../../utils/database';
import User from '../../../../../models/user';

export async function POST(req, { params }) {
  const { userId } = params;

  try {
    await connectToDB();

    const data = await req.json();
    const { twitter, github, youtube, instagram, linkedin, stackoverflow } = data;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { twitter, github, youtube, instagram, linkedin, stackoverflow },
      { new: true, upsert: true } // Upsert creates a new document if it doesn't exist
    );

    if (!updatedUser) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'User updated successfully', user: updatedUser }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
  }
}

export async function GET(req, { params }) {
  const { userId } = params;

  try {
    await connectToDB();

    const user = await User.findById(userId);

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
  }
}

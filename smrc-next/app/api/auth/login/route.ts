import User from '@/models/user';
import { connectToDatabase } from '@/lib/db';
import { serialize } from 'cookie';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  try {
    await connectToDatabase();

    const user = await User.findOne({ username });
    if (!user) {
      return Response.json({ message: 'Invalid credentials' }, { status: 400 });
    }

    const match = await user.matchPassword(password);
    if (!match) {
      return Response.json({ message: 'Invalid credentials' }, { status: 400 });
    }

    if (!user.verified) {
      return Response.json({ message: 'Account not yet verified' }, { status: 400 });
    }

    const cookieHeader =
      serialize('user', JSON.stringify({ userId: user._id, username: user.username, admin: user.admin }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24,
        path: '/',
        sameSite: 'strict',
      });

    return Response.json({ message: 'Login successful' }, { status: 200, headers: { 'Set-Cookie': cookieHeader } });
  } catch (error) {
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
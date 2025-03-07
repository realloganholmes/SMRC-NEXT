import bcrypt from 'bcryptjs';
import User from '@/models/user';
import { connectToDatabase } from '@/lib/db';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  try {
    await connectToDatabase();

    const userExists = await User.findOne({ username });
    if (userExists) {
      return Response.json({ message: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      verified: false,
    });

    await user.save();

    return Response.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}

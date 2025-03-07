import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends Document {
  username: string;
  password: string;
  verified: boolean;
  admin?: boolean;
  coolerAdmin?: boolean;
  RFGAdmin?: boolean;
  raceAdmin?: boolean;
  dashboardAdmin?: boolean;
  recapAdmin?: boolean;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  verified: { type: Boolean, required: true },
  admin: { type: Boolean, default: false },
  coolerAdmin: { type: Boolean, default: false },
  RFGAdmin: { type: Boolean, default: false },
  raceAdmin: { type: Boolean, default: false },
  dashboardAdmin: { type: Boolean, default: false },
  recapAdmin: { type: Boolean, default: false },
});

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;

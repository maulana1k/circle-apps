import { Schema, Types, model } from 'mongoose';
import { IUser } from '@circle-app/api-interfaces';

const UserSchema = new Schema<IUser>({
  displayName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, select: false },
  password: { type: String, required: true },
  avatar: { type: String, default: 'default' },
  bio: { type: String, default: '' },
  verified: { type: Boolean, default: false, select: false },
  followers: [{ type: String, ref: 'User' }],
  following: [{ type: String, ref: 'User' }],
});

const User = model<IUser>('User', UserSchema);

export default User;

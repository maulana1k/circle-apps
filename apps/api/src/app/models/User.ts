import { Schema, Types, model } from 'mongoose';
import { IUser } from '@circle-app/api-interfaces';

const UserSchema = new Schema<IUser>({
  displayName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, select: true },
  password: { type: String, required: true },
  avatar: { type: String, default: 'default' },
  bio: { type: String, default: '' },
  birth: { type: Date },
  verified: { type: Boolean, default: false, select: true },
  followers: [{ type: String, ref: 'User' }],
  following: [{ type: String, ref: 'User' }],
});

const User = model<IUser>('User', UserSchema);

export default User;

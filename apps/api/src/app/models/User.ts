import { Schema, model } from 'mongoose';
import { IUser } from '@circle-app/api-interfaces';

const UserSchema = new Schema<IUser>({
  displayName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, select: true },
  password: { type: String, required: true },
  avatar: { type: String, default: 'default' },
  birth: { type: Date },
  coverImages: { type: String, default: 'default' },
  bio: { type: String, default: '' },
  verified: { type: Boolean, default: false, select: true },
});

const User = model<IUser>('User', UserSchema);

export default User;

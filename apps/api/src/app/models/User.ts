import { Schema, Types, Document, model } from 'mongoose';

interface IUser extends Document {
  displayName: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  profile: Types.ObjectId;
}

const UserSchema = new Schema<IUser>({
  displayName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: String,
  profile: Types.ObjectId,
});

const User = model<IUser>('User', UserSchema);

export default User;

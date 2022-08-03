import { Document, model, Schema, Types } from 'mongoose';

interface IProfile extends Document {
  followers: Types.Array<Types.ObjectId>;
  followings: Types.Array<Types.ObjectId>;
  bio: string;
  phone: number;
  birth: Date;
  verified: boolean;
}

const ProfileSchema = new Schema<IProfile>({
  followers: [{ type: Types.ObjectId, ref: 'User' }],
  followings: [{ type: Types.ObjectId, ref: 'User' }],
  bio: String,
  phone: Number,
  birth: Date,
  verified: { type: Boolean, default: false },
});

const Profile = model<IProfile>('profile', ProfileSchema);

export default Profile;

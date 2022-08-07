import { Types, Document, Date } from 'mongoose';
export interface ResponseApi<T> {
  err: string;
  message: string;
  data: T;
}

export interface IUser extends Document {
  displayName: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  bio: string;
  verified: boolean;
  birth: Date;
  followers: Types.Array<Types.ObjectId>;
  following: Types.Array<Types.ObjectId>;
}

export interface UserWithToken {
  user: IUser;
  token: string;
}

export interface ITweet extends Document {
  author: { type: Types.ObjectId };
  content: String;
  attachment?: String;
  likes: Types.Array<Types.ObjectId>;

  replyTo: { type: Types.ObjectId; ref: 'Tweet' };
  timestamp: Date;
  retweet: { type: Types.ObjectId; ref: 'Tweet' };
}

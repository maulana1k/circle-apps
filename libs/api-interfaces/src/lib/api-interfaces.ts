import { Types, Document } from 'mongoose';
export interface ResponseApi<T> {
  err: string;
  message: string;
  data: T;
}

export interface IRelation {
  user: string;
  followers: Types.Array<Types.ObjectId>;
  followings: Types.Array<Types.ObjectId>;
}
export interface IRelationJoin {
  user: string;
  followers: Array<IUser>;
  followings: Array<IUser>;
}
export interface IUser extends Pick<Document, '_id'>, IRelation {
  displayName: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  birth: Date;
  bio: string;
  verified: boolean;
  coverImages: string;
}

export interface UserWithToken extends IUser {
  token: string;
}

export interface ITweet extends Pick<Document, '_id'> {
  author: IUser;
  content: string;
  image?: string;
  likes: Types.Array<Types.ObjectId>;
  replyTo: { type: Types.ObjectId; ref: 'Tweet' };
  timestamp: Date;
  retweet: { type: Types.ObjectId; ref: 'Tweet' };
}

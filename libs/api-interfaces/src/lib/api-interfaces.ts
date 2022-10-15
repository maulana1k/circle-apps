import { Types, Document, Date as MongooseDate } from 'mongoose';
export interface ResponseApi<T> {
  err: string;
  message: string;
  data: T;
}

export interface IRelation {
  user: String;
  followers: Types.Array<Types.ObjectId>;
  followings: Types.Array<Types.ObjectId>;
}
export interface IRelationJoin {
  user: String;
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
  content: String;
  attachment?: String;
  likes: Types.Array<Types.ObjectId>;
  replyTo: { type: Types.ObjectId; ref: 'Tweet' };
  timestamp: Date;
  retweet: { type: Types.ObjectId; ref: 'Tweet' };
}

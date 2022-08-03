import { Date, Document, model, Schema, Types } from 'mongoose';

// const { Array, ObjectId } = Types;
interface ITweet extends Document {
  author: { type: Types.ObjectId };
  content: String;
  attachment?: String;
  likes: Types.Array<Types.ObjectId>;
  replies: Types.Array<Types.ObjectId>;
  timestamp: Date;
}

const TweetSchema = new Schema<ITweet>({
  author: { type: Types.ObjectId, ref: 'User' },
  content: String,
  attachment: String,
  likes: [{ type: Types.ObjectId, ref: 'User' }],
  replies: [{ type: Types.ObjectId, ref: 'Tweet' }],
  timestamp: { type: Date, default: new Date().toLocaleString() },
});
const Tweet = model<ITweet>('Tweet', TweetSchema);

export default Tweet;

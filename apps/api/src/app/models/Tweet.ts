import { ITweet } from '@circle-app/api-interfaces';
import { model, Schema, Types } from 'mongoose';

const TweetSchema = new Schema<ITweet>({
  author: { type: String, ref: 'User' },
  content: { type: String, default: '' },
  attachment: { type: String, default: '' },
  retweet: { type: Types.ObjectId, ref: 'Tweet' },
  likes: [{ type: Types.ObjectId, ref: 'User' }],
  replyTo: { type: Types.ObjectId, ref: 'Tweet' },
  timestamp: { type: Date },
});
const Tweet = model<ITweet>('Tweet', TweetSchema);

export default Tweet;

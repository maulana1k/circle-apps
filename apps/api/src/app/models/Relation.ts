import { IRelation } from '@circle-app/api-interfaces';
import { model, Schema, Types } from 'mongoose';

const RelationSchema = new Schema<IRelation>({
  user: { type: String },
  followers: [{ type: String, ref: 'User' }],
  followings: [{ type: String, ref: 'User' }],
});

const Relation = model<IRelation>('Relations', RelationSchema);

export default Relation;

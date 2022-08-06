import { Request, Response } from 'express';
import {
  body,
  check,
  oneOf,
  param,
  query,
  validationResult,
} from 'express-validator';

import Tweet from '../models/Tweet';
import {
  response_bad_request,
  response_server_error,
  response_success,
} from '../utils/responses';
import BaseController from './BaseController';

export default class TweetController extends BaseController {
  constructor() {
    super();
    this.basePath = '/tweet';
    this.router.use((req, res, next) => {
      next();
    });
    this.router.get(
      '/',
      [query('size').toInt(), query('offset').toInt()],
      this.index
    );
    this.router.post('/new', this.post);
    this.router.get('/:tweetId', this.showReplies);
    this.router.post('/:tweetId/like/:userId', this.like);
    this.router.get('/:tweetId/likes', this.showLikes);
    this.router.post('/:tweetId/reply', this.reply);
    this.router.delete('/:tweetId', this.delete);
  }
  private async index(req: Request, res: Response) {
    try {
      const { size, offset }: any = req.query;
      const tweets = await Tweet.find({ replyTo: null })
        .sort({ timestamp: -1 })
        .skip(offset * size)
        .limit(size);
      return response_success(res, tweets);
    } catch (error) {
      return response_server_error(res, error.message);
    }
  }
  private async post(req: Request, res: Response) {
    try {
      const err = validationResult(req);
      if (!err.isEmpty()) return response_bad_request(res, err);
      const { author, content } = req.body;
      // upload attachment/blob to file storage
      // if (attachment) {
      // }
      // post tweet to db
      const tweet = new Tweet({
        author,
        content,
      });
      const saved = await tweet.save();
      return response_success(res, saved);
    } catch (error) {}
  }
  private async like(req: Request, res: Response) {
    try {
      const { userId, tweetId }: any = req.params;
      // add user id to likes
      const tweet = await Tweet.updateOne(
        { _id: tweetId },
        {
          $push: { likes: userId },
        }
      );
      return response_success(res, tweet);
    } catch (error) {}
  }
  private async reply(req: Request, res: Response) {
    try {
      const { author, content } = req.body;
      const { tweetId }: any = req.params;
      // upload attachment/blob to file storage

      // post replies tweet first
      const newReplies = new Tweet({
        author,
        content,
        replyTo: tweetId,
      });
      const replies = await newReplies.save();
      return response_success(res, replies);
    } catch (error) {}
  }
  private async delete(req: Request, res: Response) {
    try {
      const { tweetId }: any = req.params;
      const deleted = await Tweet.deleteOne({ _id: tweetId });
      return response_success(res, deleted);
    } catch (error) {}
  }
  private async showReplies(req: Request, res: Response) {
    try {
      const { tweetId }: any = req.params;
      // populate all replies tweet
      const tweet = await Tweet.find({ replyTo: tweetId });
      return response_success(res, tweet);
    } catch (error) {}
  }
  private async showLikes(req: Request, res: Response) {
    try {
      const { tweetId }: any = req.params;
      const tweet = await Tweet.findById(tweetId)
        .populate('likes')
        .select({ likes: 1, _id: 0 });
      return response_success(res, tweet);
    } catch (error) {}
  }
}

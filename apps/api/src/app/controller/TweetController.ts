import { Request, Response } from 'express';
import Tweet from '../models/Tweet';
import { response_server_error, response_success } from '../utils/responses';
import BaseController from './BaseController';

class TweetController extends BaseController {
  constructor() {
    super();
    this.basePath = '/tweet';
    this.routes = [
      {
        path: '/',
        method: 'get',
        handler: this.index,
        middleware: [],
      },
      {
        path: '/:tweetId',
        method: 'get',
        handler: this.showReplies,
        middleware: [],
      },
      {
        path: '/post',
        method: 'post',
        handler: this.post,
        middleware: [],
      },
      {
        path: '/:tweetId/like/:userId',
        method: 'post',
        handler: this.like,
        middleware: [],
      },
      {
        path: '/:tweetId/likes',
        method: 'get',
        handler: this.showLikes,
        middleware: [],
      },
      {
        path: '/:tweetId/reply',
        method: 'post',
        handler: this.reply,
        middleware: [],
      },
      {
        path: '/:tweetId',
        method: 'delete',
        handler: this.delete,
        middleware: [],
      },
    ];
    this.setRoutes();
  }
  private async index(req: Request, res: Response) {
    try {
      const { size, offset }: any = req.query;
      const tweets = await Tweet.find()
        .sort({ timestamp: 1 })
        .skip(parseInt(offset) * parseInt(size))
        .limit(parseInt(size));
      return response_success(res, tweets);
    } catch (error) {
      return response_server_error(res, error.message);
    }
  }
  private async post(req: Request, res: Response) {
    try {
      const { author, content, attachment } = req.body;
      // upload attachment/blob to file storage
      if (attachment) {
      }
      // post tweet to db
      const tweet = new Tweet({
        author,
        content,
        attachment,
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
      const { author, content, attachment } = req.body;
      const { tweetId }: any = req.params;
      // upload attachment/blob to file storage
      if (attachment) {
      }
      // post replies tweet first
      const newReplies = new Tweet({
        author,
        content,
        attachment,
      });
      const replies = await newReplies.save();
      // update target tweet
      const updated = await Tweet.updateOne(
        { _id: tweetId },
        {
          $push: {
            replies: replies._id,
          },
        }
      );
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
      const tweet = await Tweet.findById(tweetId).populate('Tweet');
      return response_success(res, tweet);
    } catch (error) {}
  }
  private async showLikes(req: Request, res: Response) {
    try {
      const { tweetId }: any = req.params;
      const tweet = await Tweet.findById(tweetId)
        .populate('User')
        .select({ likes: 1 });
      return response_success(res, tweet);
    } catch (error) {}
  }
}

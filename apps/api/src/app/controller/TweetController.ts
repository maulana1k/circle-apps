import { Request, Response } from 'express';
import { query, validationResult } from 'express-validator';

import authMiddleware from '../middlewares/auth.middleware';
import Relation from '../models/Relation';
import Tweet from '../models/Tweet';
import User from '../models/User';
import { response_bad_request, response_success } from '../utils/responses';
import BaseController from './BaseController';

export default class TweetController extends BaseController {
  constructor() {
    super();
    this.basePath = '/tweet';
    /**
     * Local middleware
     */
    // this.router.use(authMiddleware);
    /**
     * Routes mapping
     */
    this.router.get(
      '/',
      [query('size').toInt(), query('offset').toInt()],
      this.index
    );
    this.router.get('/following/:username', this.tweetFollowing)
    this.router.post('/new', this.post);
    this.router.get('/users/:userId', this.getUserTweets);
    this.router.get('/:tweetId', this.details);
    this.router.get('/:tweetId/replies', this.showReplies);
    this.router.post('/:tweetId/like/:userId', this.like);
    this.router.post('/:tweetId/unlike/:userId', this.unlike);
    this.router.get('/:tweetId/likes', this.showLikes);
    this.router.post('/:tweetId/reply', this.reply);
    this.router.delete('/:tweetId', this.delete);
  }
  private async index(req: Request, res: Response) {
    try {
      const { size, offset }: any = req.query;
      const tweets = await Tweet.find({ replyTo: null })
        .populate('author', { displayName: 1, username: 1, avatar: 1 })
        .sort({ timestamp: -1 })
        .skip(offset * size)
        .limit(size);
      return res.status(200).json(tweets);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  private async tweetFollowing(req: Request, res: Response) {
    try {
      const { username } = req.params;
      const followings = await Relation.findOne({ user: username })
      console.log(followings);
      const tweets = await Tweet.find({ replyTo: null, author: { $in: followings.followings } })
        .populate('author', { displayName: 1, username: 1, avatar: 1 })
        .sort({ timestamp: -1 })
      return res.status(200).json(tweets);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  private async post(req: Request, res: Response) {
    try {
      const err = validationResult(req);
      if (!err.isEmpty()) return response_bad_request(res, err);
      const { author, content, image } = req.body;
      const tweet = new Tweet({
        author,
        content,
        image,
        timestamp: Date.now(),
      });
      const saved = await tweet.save();
      return response_success(res, saved);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  private async details(req: Request, res: Response) {
    try {
      const { tweetId } = req.params;
      const tweet = await Tweet.findById(tweetId).populate('author', {
        displayName: 1,
        username: 1,
        avatar: 1,
      });
      return res.status(200).json(tweet);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  private async like(req: Request, res: Response) {
    try {
      const { userId, tweetId }: any = req.params;
      // add user id to likes
      const liked = await Tweet.findByIdAndUpdate(
        tweetId,
        {
          $push: { likes: userId },
        },
        {
          new: true,
        }
      );
      if (!liked) {
        return res.status(400).json('Like tweet failed');
      }
      res.status(200).json('Like tweet success');
    } catch (error) {
      res.status(500).json(error);
    }
  }
  private async unlike(req: Request, res: Response) {
    try {
      const { tweetId, userId } = req.params;
      const liked = await Tweet.findByIdAndUpdate(
        tweetId,
        {
          $pull: { likes: userId },
        },
        {
          new: true,
        }
      );
      res.status(200).json('Unlike tweet success');
    } catch (error) {
      res.status(500).json(error);
    }
  }
  private async reply(req: Request, res: Response) {
    try {
      const { userId, content } = req.body;
      const { tweetId }: any = req.params;
      // upload attachment/blob to file storage

      // post replies tweet first
      const newReplies = new Tweet({
        author: userId,
        content,
        replyTo: tweetId,
        timestamp: Date.now(),
      });
      const replies = await newReplies.save();
      res.status(200).json(replies);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  private async delete(req: Request, res: Response) {
    try {
      const { tweetId } = req.params;
      const deleted = await Tweet.deleteOne({ _id: tweetId });
      res.status(200).json(deleted);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  private async showReplies(req: Request, res: Response) {
    try {
      const { tweetId }: any = req.params;
      // populate all replies tweet
      const tweet = await Tweet.find({ replyTo: tweetId }).populate('author', {
        displayName: 1,
        avatar: 1,
        username: 1,
      });
      res.status(200).json(tweet);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  private async getUserTweets(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const tweets = await Tweet.find({
        author: userId,
        replyTo: null,
      }).populate('author', {
        displayName: 1,
        username: 1,
        avatar: 1,
      }).sort({ timestamp: -1 });
      res.status(200).json(tweets);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  private async showLikes(req: Request, res: Response) {
    try {
      const { tweetId }: any = req.params;
      const tweet = await Tweet.findById(tweetId)
        .populate('likes')
        .select({ likes: 1, _id: 0 });
      return response_success(res, tweet);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

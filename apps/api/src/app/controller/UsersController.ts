import { Request, Response } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import Relation from '../models/Relation';
import Tweet from '../models/Tweet';
import User from '../models/User';
import BaseController from './BaseController';

export default class UsersController extends BaseController {
  constructor() {
    super();
    this.basePath = '/users';
    /**
     * Local middleware
     */
    this.router.use(authMiddleware);

    /**
     * Route handler mapping
     */
    this.router.get('/:username', this.getProfile);
    this.router.get('/:username/tweets', this.getTweetsByUser);
    this.router.get('/:username/likedTweets', this.getLikedTweetsByUser);
    this.router.get('/:username/relations', this.getUserRelations);
    this.router.get('/search/:query', this.userSearch);
    this.router.post('/:username/follows', this.userFollows);
    this.router.post('/:username/unfollow', this.userUnfollows);
  }
  private async getProfile(req: Request, res: Response) {
    try {
      const { username } = req.params;
      const user = await User.findOne({ username }, { password: 0 }).lean();
      const relation = await Relation.findOne({ user: username }).lean();
      res
        .status(200)
        .json(Object.assign(user, relation.followers, relation.followings));
    } catch (error) {
      res.status(500).json(error);
    }
  }
  private async getTweetsByUser(req: Request, res: Response) {
    try {
      const { username } = req.params;
      const tweets = await Tweet.find({ author: username }).lean();
      res.status(200).json(tweets);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  private async getLikedTweetsByUser(req: Request, res: Response) {
    try {
      const { username } = req.params;
      const user = await User.findOne({ username }, { _id: 1 })
      const likedTweets = await Tweet.find({ likes: { $in: [user._id] } }).populate('author', { displayName: 1, username: 1, avatar: 1 });
      res.status(200).json(likedTweets);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
  private async getUserRelations(req: Request, res: Response) {
    try {
      const { username } = req.params;
      const followers = await Relation.findOne(
        { user: username },
        { followers: 1, followings: 1 }
      ).populate('followers followings');
      res.status(200).json(followers);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  private async userFollows(req: Request, res: Response) {
    try {
      const { username } = req.params;
      const { userId, followerUsername } = req.body;
      const alreadyFollows = await Relation.findOne({
        user: username,
        followers: userId,
      });
      console.log('already follow', alreadyFollows);
      if (alreadyFollows) {
        return res.status(400).json('User already follows this account');
      }
      await Relation.findOneAndUpdate(
        { user: username },
        {
          $push: {
            followers: userId,
          },
        }
      );
      const targetId = await User.findOne({ username }, { _id: 1 });
      await Relation.findOneAndUpdate(
        { user: followerUsername },
        {
          $push: {
            followings: targetId._id,
          },
        }
      );
      return res.status(200).json('Follow success');
    } catch (error) {
      res.status(500).json(error);
    }
  }
  private async userUnfollows(req: Request, res: Response) {
    try {
      const { username } = req.params;
      const { userId, followerUsername } = req.body;
      const alreadyFollows = await Relation.findOne({
        user: username,
        followers: userId,
      });
      console.log('already follow', alreadyFollows);
      if (!alreadyFollows) {
        return res.status(400).json('User not follows this account');
      }
      await Relation.findOneAndUpdate(
        { user: username },
        {
          $pull: {
            followers: userId,
          },
        },
        { new: true }
      );
      const targetId = await User.findOne({ username }, { _id: 1 });
      await Relation.findOneAndUpdate(
        { user: followerUsername },
        {
          $pull: {
            followings: targetId._id,
          },
        },
        { new: true }
      );
      return res.status(200).json('Unfollow success');
    } catch (error) {
      res.status(500).json(error);
    }
  }
  private async userSearch(req: Request, res: Response) {
    try {
      // if (!req.params) {
      //   return res.status(400).json('User query is empty');
      // }
      const { query: userQuery } = req.params;
      const userList = await User.find({
        $or: [
          { displayName: { $regex: new RegExp(userQuery, 'i') } },
          { username: { $regex: new RegExp(userQuery, 'i') } },
        ],
      });
      return res.status(200).json(userList);
    } catch (error) {
      console.log(error);

      res.status(500).json(error);
    }
  }
}

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/api/src/app/Server.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = tslib_1.__importDefault(__webpack_require__("mongoose"));
class Server {
    constructor(port, app) {
        this.apiPrefix = '/api';
        this.port = port;
        this.app = app;
    }
    setDatabaseUri(uri) {
        this.dbUri = uri;
    }
    setClientPath(path) {
        this.clientPath = path;
    }
    run() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default
                    .connect(this.dbUri)
                    .then(() => console.log('__________ DB connected ________'));
                return this.app.listen(this.port, () => console.log('⚡ Server running on port', this.port));
            }
            catch (error) {
                console.error(error);
                process.exit(1);
            }
        });
    }
    loadGlobalMiddleware(middlewares) {
        middlewares.forEach((middleware) => {
            this.app.use(middleware);
        });
    }
    loadController(controllers) {
        controllers.forEach((controller) => {
            controller.connectRouter(this.app, this.apiPrefix);
        });
        /**
         * Serve frontend build app
         */
        if (this.clientPath) {
            this.app.get('*', (req, res) => {
                res.sendFile(this.clientPath);
            });
        }
    }
}
exports["default"] = Server;


/***/ }),

/***/ "./apps/api/src/app/controller/AuthController.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const bcrypt_1 = tslib_1.__importDefault(__webpack_require__("bcrypt"));
const jsonwebtoken_1 = tslib_1.__importDefault(__webpack_require__("jsonwebtoken"));
const BaseController_1 = tslib_1.__importDefault(__webpack_require__("./apps/api/src/app/controller/BaseController.ts"));
const User_1 = tslib_1.__importDefault(__webpack_require__("./apps/api/src/app/models/User.ts"));
const express_validator_1 = __webpack_require__("express-validator");
const Relation_1 = tslib_1.__importDefault(__webpack_require__("./apps/api/src/app/models/Relation.ts"));
class AuthController extends BaseController_1.default {
    constructor() {
        super();
        this.basePath = '/auth';
        /**
         * local middleware
         */
        /**
         * Route handler mapping
         */
        this.router.post('/signin', this.signin);
        this.router.post('/signup', [
            (0, express_validator_1.body)('email').isEmail().normalizeEmail(),
            (0, express_validator_1.body)('password').isLength({ min: 6 }),
        ], this.signup);
        this.router.put('/update-profile', this.updateProfile);
    }
    signin(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password } = req.body;
                console.log(req.body);
                const user = yield User_1.default.findOne({ $or: [{ username }, { email }] });
                //check if user is not exist
                if (!user) {
                    res.status(400).send('Account is not registered');
                    return;
                }
                // compare password
                const match = yield bcrypt_1.default.compare(password, user.password);
                if (!match) {
                    res.status(400).send('Password wrong');
                    return;
                }
                // const userRelation = await Relation.findOne({ user: user.username });
                // generate token
                const secretKey = process.env.NX_JWT_KEY;
                const token = jsonwebtoken_1.default.sign({ email }, secretKey);
                res.status(200).json(Object.assign(user.toJSON(), { token }));
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    signup(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password, birth } = req.body;
                //check if username is unique
                const isUnique = yield User_1.default.findOne({ username });
                if (isUnique) {
                    res.status(400).send('Username is already used');
                    return;
                }
                //check if user is exist
                const isExist = yield User_1.default.findOne({ email });
                if (isExist) {
                    res.status(400).send('Email is already used');
                    return;
                }
                // hash current password
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                // create and store user to db
                const user = new User_1.default({
                    username,
                    displayName: username,
                    birth,
                    email,
                    password: hashedPassword,
                });
                const savedUser = yield user.save();
                /**
                 * Create relation document reference
                 */
                yield new Relation_1.default({
                    user: savedUser.username,
                }).save();
                const secretKey = process.env.NX_JWT_KEY;
                const token = jsonwebtoken_1.default.sign({ username }, secretKey);
                res.status(200).json(Object.assign(savedUser.toJSON(), { token }));
            }
            catch (error) {
                console.log(error);
                res.status(500).json(error);
            }
        });
    }
    updateProfile(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { _id, displayName, bio, avatar } = req.body;
                console.log(req.body);
                const user = yield User_1.default.findByIdAndUpdate(_id, {
                    $set: {
                        bio,
                        displayName,
                        avatar,
                    },
                }, { new: true });
                res.status(200).json(user);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    forgotPassword(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () { });
    }
    sendOTP(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () { });
    }
}
exports["default"] = AuthController;


/***/ }),

/***/ "./apps/api/src/app/controller/BaseController.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __webpack_require__("express");
class BaseController {
    constructor() {
        this.router = (0, express_1.Router)();
    }
    connectRouter(app, prefix) {
        app.use(prefix + this.basePath, this.router);
    }
}
exports["default"] = BaseController;


/***/ }),

/***/ "./apps/api/src/app/controller/TweetController.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const express_validator_1 = __webpack_require__("express-validator");
const Tweet_1 = tslib_1.__importDefault(__webpack_require__("./apps/api/src/app/models/Tweet.ts"));
const responses_1 = __webpack_require__("./apps/api/src/app/utils/responses.ts");
const BaseController_1 = tslib_1.__importDefault(__webpack_require__("./apps/api/src/app/controller/BaseController.ts"));
class TweetController extends BaseController_1.default {
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
        this.router.get('/', [(0, express_validator_1.query)('size').toInt(), (0, express_validator_1.query)('offset').toInt()], this.index);
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
    index(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { size, offset } = req.query;
                const tweets = yield Tweet_1.default.find({ replyTo: null })
                    .populate('author', { displayName: 1, username: 1, avatar: 1 })
                    .sort({ timestamp: -1 })
                    .skip(offset * size)
                    .limit(size);
                return res.status(200).json(tweets);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    post(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const err = (0, express_validator_1.validationResult)(req);
                if (!err.isEmpty())
                    return (0, responses_1.response_bad_request)(res, err);
                const { author, content, image } = req.body;
                const tweet = new Tweet_1.default({
                    author,
                    content,
                    image,
                    timestamp: Date.now(),
                });
                const saved = yield tweet.save();
                return (0, responses_1.response_success)(res, saved);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    details(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { tweetId } = req.params;
                const tweet = yield Tweet_1.default.findById(tweetId).populate('author', {
                    displayName: 1,
                    username: 1,
                    avatar: 1,
                });
                return res.status(200).json(tweet);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    like(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, tweetId } = req.params;
                // add user id to likes
                const liked = yield Tweet_1.default.findByIdAndUpdate(tweetId, {
                    $push: { likes: userId },
                }, {
                    new: true,
                });
                if (!liked) {
                    return res.status(400).json('Like tweet failed');
                }
                res.status(200).json('Like tweet success');
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    unlike(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { tweetId, userId } = req.params;
                const liked = yield Tweet_1.default.findByIdAndUpdate(tweetId, {
                    $pull: { likes: userId },
                }, {
                    new: true,
                });
                res.status(200).json('Unlike tweet success');
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    reply(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, content } = req.body;
                const { tweetId } = req.params;
                // upload attachment/blob to file storage
                // post replies tweet first
                const newReplies = new Tweet_1.default({
                    author: userId,
                    content,
                    replyTo: tweetId,
                    timestamp: Date.now(),
                });
                const replies = yield newReplies.save();
                res.status(200).json(replies);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    delete(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { tweetId } = req.params;
                const deleted = yield Tweet_1.default.deleteOne({ _id: tweetId });
                res.status(200).json(deleted);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    showReplies(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { tweetId } = req.params;
                // populate all replies tweet
                const tweet = yield Tweet_1.default.find({ replyTo: tweetId }).populate('author', {
                    displayName: 1,
                    avatar: 1,
                    username: 1,
                });
                res.status(200).json(tweet);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    getUserTweets(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const tweets = yield Tweet_1.default.find({
                    author: userId,
                    replyTo: null,
                }).populate('author', {
                    displayName: 1,
                    username: 1,
                    avatar: 1,
                }).sort({ timestamp: -1 });
                res.status(200).json(tweets);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    showLikes(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { tweetId } = req.params;
                const tweet = yield Tweet_1.default.findById(tweetId)
                    .populate('likes')
                    .select({ likes: 1, _id: 0 });
                return (0, responses_1.response_success)(res, tweet);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports["default"] = TweetController;


/***/ }),

/***/ "./apps/api/src/app/controller/UsersController.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const auth_middleware_1 = tslib_1.__importDefault(__webpack_require__("./apps/api/src/app/middlewares/auth.middleware.ts"));
const Relation_1 = tslib_1.__importDefault(__webpack_require__("./apps/api/src/app/models/Relation.ts"));
const Tweet_1 = tslib_1.__importDefault(__webpack_require__("./apps/api/src/app/models/Tweet.ts"));
const User_1 = tslib_1.__importDefault(__webpack_require__("./apps/api/src/app/models/User.ts"));
const BaseController_1 = tslib_1.__importDefault(__webpack_require__("./apps/api/src/app/controller/BaseController.ts"));
class UsersController extends BaseController_1.default {
    constructor() {
        super();
        this.basePath = '/users';
        /**
         * Local middleware
         */
        this.router.use(auth_middleware_1.default);
        /**
         * Route handler mapping
         */
        this.router.get('/:username', this.getProfile);
        this.router.get('/:username/tweets', this.getTweetsByUser);
        this.router.get('/:username/relations', this.getUserRelations);
        this.router.get('/search/:query', this.userSearch);
        this.router.post('/:username/follows', this.userFollows);
        this.router.post('/:username/unfollow', this.userUnfollows);
    }
    getProfile(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { username } = req.params;
                const user = yield User_1.default.findOne({ username }, { password: 0 }).lean();
                const relation = yield Relation_1.default.findOne({ user: username }).lean();
                res
                    .status(200)
                    .json(Object.assign(user, relation.followers, relation.followings));
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    getTweetsByUser(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { username } = req.params;
                const tweets = yield Tweet_1.default.find({ author: username }).lean();
                res.status(200).json(tweets);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    getUserRelations(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { username } = req.params;
                const followers = yield Relation_1.default.findOne({ user: username }, { followers: 1, followings: 1 }).populate('followers followings');
                res.status(200).json(followers);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    userFollows(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { username } = req.params;
                const { userId, followerUsername } = req.body;
                const alreadyFollows = yield Relation_1.default.findOne({
                    user: username,
                    followers: userId,
                });
                console.log('already follow', alreadyFollows);
                if (alreadyFollows) {
                    return res.status(400).json('User already follows this account');
                }
                yield Relation_1.default.findOneAndUpdate({ user: username }, {
                    $push: {
                        followers: userId,
                    },
                });
                const targetId = yield User_1.default.findOne({ username }, { _id: 1 });
                yield Relation_1.default.findOneAndUpdate({ user: followerUsername }, {
                    $push: {
                        followings: targetId._id,
                    },
                });
                return res.status(200).json('Follow success');
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    userUnfollows(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { username } = req.params;
                const { userId, followerUsername } = req.body;
                const alreadyFollows = yield Relation_1.default.findOne({
                    user: username,
                    followers: userId,
                });
                console.log('already follow', alreadyFollows);
                if (!alreadyFollows) {
                    return res.status(400).json('User not follows this account');
                }
                yield Relation_1.default.findOneAndUpdate({ user: username }, {
                    $pull: {
                        followers: userId,
                    },
                }, { new: true });
                const targetId = yield User_1.default.findOne({ username }, { _id: 1 });
                yield Relation_1.default.findOneAndUpdate({ user: followerUsername }, {
                    $pull: {
                        followings: targetId._id,
                    },
                }, { new: true });
                return res.status(200).json('Unfollow success');
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    userSearch(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                // if (!req.params) {
                //   return res.status(400).json('User query is empty');
                // }
                const { query: userQuery } = req.params;
                const userList = yield User_1.default.find({
                    $or: [
                        { displayName: { $regex: new RegExp(userQuery, 'i') } },
                        { username: { $regex: new RegExp(userQuery, 'i') } },
                    ],
                });
                return res.status(200).json(userList);
            }
            catch (error) {
                console.log(error);
                res.status(500).json(error);
            }
        });
    }
}
exports["default"] = UsersController;


/***/ }),

/***/ "./apps/api/src/app/middlewares/auth.middleware.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(__webpack_require__("jsonwebtoken"));
function authMiddleware(req, res, next) {
    const { authorization } = req.headers;
    const hasToken = authorization && authorization.split(' ')[0] == 'Bearer';
    if (!hasToken) {
        return res.status(403).json('Authorization token required');
    }
    jsonwebtoken_1.default.verify(authorization.split(' ')[1], process.env['NX_JWT_KEY'], { complete: true }, (err, decoded) => {
        if (err)
            return res.status(401).json('Authorization token invalid');
        req.body['user'] = decoded;
        next();
    });
}
exports["default"] = authMiddleware;


/***/ }),

/***/ "./apps/api/src/app/models/Relation.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const mongoose_1 = __webpack_require__("mongoose");
const RelationSchema = new mongoose_1.Schema({
    user: { type: String },
    followers: [{ type: String, ref: 'User' }],
    followings: [{ type: String, ref: 'User' }],
});
const Relation = (0, mongoose_1.model)('Relations', RelationSchema);
exports["default"] = Relation;


/***/ }),

/***/ "./apps/api/src/app/models/Tweet.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const mongoose_1 = __webpack_require__("mongoose");
const TweetSchema = new mongoose_1.Schema({
    author: { type: String, ref: 'User' },
    content: { type: String, default: '' },
    image: { type: String, default: '' },
    retweet: { type: mongoose_1.Types.ObjectId, ref: 'Tweet' },
    likes: [{ type: mongoose_1.Types.ObjectId, ref: 'User' }],
    replyTo: { type: mongoose_1.Types.ObjectId, ref: 'Tweet' },
    timestamp: { type: Date },
});
const Tweet = (0, mongoose_1.model)('Tweet', TweetSchema);
exports["default"] = Tweet;


/***/ }),

/***/ "./apps/api/src/app/models/User.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const mongoose_1 = __webpack_require__("mongoose");
const UserSchema = new mongoose_1.Schema({
    displayName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, select: true },
    password: { type: String, required: true },
    avatar: { type: String, default: 'default' },
    birth: { type: Date },
    coverImages: { type: String, default: 'default' },
    bio: { type: String, default: '' },
    verified: { type: Boolean, default: false, select: true },
});
const User = (0, mongoose_1.model)('User', UserSchema);
exports["default"] = User;


/***/ }),

/***/ "./apps/api/src/app/utils/responses.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.response_server_error = exports.response_forbidden = exports.response_bad_request = exports.response_not_found = exports.response_success = void 0;
// const response_handler = (
//   res: Response,
//   { statusCode, error, message, data }: ResponseType
// ): void => {
//   res.status(statusCode).json({ message, error, data });
// };
function response_success(res, data, message = 'Success') {
    const payload = { message, err: null, data };
    res.status(200).json(payload);
}
exports.response_success = response_success;
function response_not_found(res, message, err = 'Not found') {
    const payload = { message, err, data: null };
    res.status(404).json(payload);
}
exports.response_not_found = response_not_found;
function response_bad_request(res, message, err = 'Bad request') {
    const payload = { message, err, data: null };
    res.status(400).json(payload);
}
exports.response_bad_request = response_bad_request;
function response_forbidden(res, message, err = 'Access forbidden') {
    const payload = { message, err, data: null };
    res.status(403).json(payload);
}
exports.response_forbidden = response_forbidden;
function response_server_error(res, message, err = 'Internal server error') {
    const payload = { message, err, data: null };
    res.status(500).json(payload);
}
exports.response_server_error = response_server_error;


/***/ }),

/***/ "bcrypt":
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "body-parser":
/***/ ((module) => {

module.exports = require("body-parser");

/***/ }),

/***/ "cors":
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "express-validator":
/***/ ((module) => {

module.exports = require("express-validator");

/***/ }),

/***/ "jsonwebtoken":
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mongoose":
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "morgan":
/***/ ((module) => {

module.exports = require("morgan");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "path":
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const express_1 = tslib_1.__importDefault(__webpack_require__("express"));
const cors_1 = tslib_1.__importDefault(__webpack_require__("cors"));
const morgan_1 = tslib_1.__importDefault(__webpack_require__("morgan"));
// import functions from 'firebase-functions';
const Server_1 = tslib_1.__importDefault(__webpack_require__("./apps/api/src/app/Server.ts"));
const AuthController_1 = tslib_1.__importDefault(__webpack_require__("./apps/api/src/app/controller/AuthController.ts"));
const path_1 = tslib_1.__importDefault(__webpack_require__("path"));
const TweetController_1 = tslib_1.__importDefault(__webpack_require__("./apps/api/src/app/controller/TweetController.ts"));
const body_parser_1 = tslib_1.__importDefault(__webpack_require__("body-parser"));
const UsersController_1 = tslib_1.__importDefault(__webpack_require__("./apps/api/src/app/controller/UsersController.ts"));
const dotenv = tslib_1.__importStar(__webpack_require__("dotenv"));
/**
 * Call dotenv to load environtment variable from .env file
 */
dotenv.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
const dbURI = process.env.NX_DB_URI;
const server = new Server_1.default(port, app);
const CLIENT_PATH = path_1.default.join(__dirname, '/dist/apps/react');
const ASSETS_PATH = path_1.default.join(__dirname, '/assets');
/**
 * CORS configuration
 */
const corsOptions = {
    origin: '*',
    method: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT'],
};
/**
 * set mongodb uri
 */
server.setDatabaseUri(dbURI);
/**
 * Set frontend build path to index.html (if any)
 */
server.setClientPath(path_1.default.join(CLIENT_PATH, 'index.html'));
/**
 * always load global middlewares before load any controllers
 */
server.loadGlobalMiddleware([
    (0, cors_1.default)(corsOptions),
    // helmet(),
    (0, morgan_1.default)('dev'),
    body_parser_1.default.urlencoded({ extended: true }),
    express_1.default.static(ASSETS_PATH),
    express_1.default.static(CLIENT_PATH),
    express_1.default.json(),
]);
/**
 * load all controllers instance
 */
server.loadController([
    new AuthController_1.default(),
    new TweetController_1.default(),
    new UsersController_1.default(),
]);
/**
 *  ⚡⚡⚡ RUN THE SERVER ⚡⚡⚡
 */
server.run();
/**
 * export app for testing usage
 */
// exports.app = functions.https.onRequest(server.app);
// export default server.app;

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map
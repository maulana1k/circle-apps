import { Route, Routes } from 'react-router-dom';
import ForgotPassword from './layouts/auth/ForgotPassword';
import Signup from './layouts/auth/Signup';
import Signin from './layouts/auth/Signin';

import MainLayout from './layouts/MainLayout';
import Feeds from './layouts/components/Feeds';
import Tweets from './layouts/components/Tweets';
import Profile from './layouts/components/profile/Profile';
import FollowLists from './layouts/components/profile/FollowLists';
import ProfileLayout from './layouts/components/profile/ProfileLayout';
import ComingSoon from './layouts/components/ComingSoon';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Feeds />} />
        <Route path="/:username" element={<ProfileLayout />}>
          <Route index element={<Profile />} />
          <Route path="follower" element={<FollowLists />} />
          <Route path="following" element={<FollowLists />} />
        </Route>
        <Route path="/:username/tweet/:tweetId" element={<Tweets />} />
        <Route path="/explore" element={<ComingSoon />} />
        <Route path="/notifications" element={<ComingSoon />} />
        <Route path="/messages" element={<ComingSoon />} />
        <Route path="/saved" element={<ComingSoon />} />
      </Route>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

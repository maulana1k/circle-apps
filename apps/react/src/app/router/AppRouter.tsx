import { Route, Routes } from 'react-router-dom';
import ForgotPassword from '../layouts/auth/ForgotPassword';
import Signup from '../layouts/auth/Signup';
import Signin from '../layouts/auth/Signin';

import MainLayout from '../layouts/MainLayout';
import Home from '../components/Home';
import Tweets from '../components/Tweets';
import Profile from '../components/profile/Profile';
import FollowLists from '../components/profile/FollowLists';
import ProfileLayout from '../components/profile/ProfileLayout';
import ComingSoon from '../components/ComingSoon';
import NewProfile from '../layouts/auth/NewProfile';
import Explore from '../components/Explore';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/:username" element={<ProfileLayout />}>
          <Route index element={<Profile />} />
          <Route path="follower" element={<FollowLists />} />
          <Route path="following" element={<FollowLists />} />
        </Route>
        <Route path="/:username/tweet/:tweetId" element={<Tweets />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/notifications" element={<ComingSoon />} />
        <Route path="/messages" element={<ComingSoon />} />
        <Route path="/saved" element={<ComingSoon />} />
      </Route>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signup/new-profile" element={<NewProfile />} />
      <Route path="/signin" element={<Signin />} />
    </Routes>
  );
}

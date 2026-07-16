import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Home } from './pages/Home';
import { LeagueMenu } from './pages/league/LeagueMenu';
import { WeeklyLeaderboard } from './pages/league/WeeklyLeaderboard';
import { MatchResults } from './pages/league/MatchResults';
import { ReadSchedule } from './pages/league/ReadSchedule';
import { InterestToRead } from './pages/league/InterestToRead';
import { Profile } from './pages/profile/Profile';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/league" element={<LeagueMenu />} />
          <Route path="/league/leaderboard" element={<WeeklyLeaderboard />} />
          <Route path="/league/results" element={<MatchResults />} />
          <Route path="/league/read/schedule" element={<ReadSchedule />} />
          <Route path="/league/read/open" element={<InterestToRead />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
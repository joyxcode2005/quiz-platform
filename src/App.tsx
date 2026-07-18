import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { RootRedirect } from "./components/RootRedirect";

import LoginPage from "./pages/LoginPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import AdminPanel from "./pages/AdminPanel";

import { Home } from "./pages/Home";
import { LeagueMenu } from "./pages/league/LeagueMenu";
import { Draws } from "./pages/league/Draws";
import { WeeklyLeaderboard } from "./pages/league/WeeklyLeaderboard";
import { SeasonalLeaderboard } from "./pages/league/SeasonalLeaderboard";
import { MatchResults } from "./pages/league/MatchResults";
import { ReadSchedule } from "./pages/league/ReadSchedule";
import { InterestToRead } from "./pages/league/InterestToRead";
import { Profile } from "./pages/profile/Profile";
import { AuthCallback } from './pages/AuthCallback';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
           
            <Route path="/login" element={<LoginPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route path="/" element={<RootRedirect />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />

            {/* --- Quiz product UI - new, additive, gated behind login --- */}
            <Route path="/auth/callback" element={<AuthCallback />} />
            
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/league"
              element={
                <ProtectedRoute>
                  <LeagueMenu />
                </ProtectedRoute>
              }
            />
            <Route
              path="/league/draws"
              element={
                <ProtectedRoute>
                  <Draws />
                </ProtectedRoute>
              }
            />
            <Route
              path="/league/season"
              element={
                <ProtectedRoute>
                  <SeasonalLeaderboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/league/leaderboard"
              element={
                <ProtectedRoute>
                  <WeeklyLeaderboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/league/results"
              element={
                <ProtectedRoute>
                  <MatchResults />
                </ProtectedRoute>
              }
            />
            <Route
              path="/league/read/schedule"
              element={
                <ProtectedRoute>
                  <ReadSchedule />
                </ProtectedRoute>
              }
            />
            <Route
              path="/league/read/open"
              element={
                <ProtectedRoute>
                  <InterestToRead />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Catch-all route: Redirects any unknown URLs (like /dashboard) safely back to root */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
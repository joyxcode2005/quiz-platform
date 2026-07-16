import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { session } = useAuth();

  useEffect(() => {
    // Once Supabase parses the URL and sets the session, redirect to home
    if (session) {
      navigate('/', { replace: true });
    }
  }, [session, navigate]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[var(--bone)] bg-gray-100">
      <Loader2 size={48} className="animate-spin text-[#FF6B00]" />
      <p className="mt-4 font-bold text-gray-600 font-data uppercase tracking-widest text-sm">
        Authenticating...
      </p>
    </div>
  );
};
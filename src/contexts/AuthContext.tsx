import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log('Initializing auth context');
        
        // Get the current session
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session in AuthContext:', error);
          setLoading(false);
          return;
        }
        
        if (data.session) {
          console.log('Session found in AuthContext');
          setUser(data.session.user);
          setSession(data.session);
        } else {
          console.log('No session found in AuthContext');
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Unexpected error in AuthContext initialization:', err);
        setLoading(false);
      }
    };

    initializeAuth();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      console.log('Auth state changed:', event);
      
      if (newSession) {
        console.log('New session available');
        setUser(newSession.user);
        setSession(newSession);
      } else {
        console.log('No session in auth state change');
        setUser(null);
        setSession(null);
        
        // If user logged out and not on the landing page, redirect to landing
        if (event === 'SIGNED_OUT' && location.pathname !== '/') {
          navigate('/');
        }
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  return (
    <AuthContext.Provider value={{ user, session, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Building2 } from 'lucide-react';

export default function AuthCallback() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('Auth callback page loaded, processing authentication...');
        
        // Get the current URL
        const url = window.location.href;
        console.log('Current URL:', url);
        
        // Check if we have a session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Error getting session:', sessionError);
          setError('Authentication failed. Please try again.');
          setLoading(false);
          return;
        }
        
        if (sessionData.session) {
          console.log('User is authenticated, redirecting to calculator');
          // Create or update user profile
          try {
            const { error: profileError } = await supabase
              .from('profiles')
              .upsert({
                id: sessionData.session.user.id,
                email: sessionData.session.user.email,
                full_name: sessionData.session.user.user_metadata?.full_name || '',
                avatar_url: sessionData.session.user.user_metadata?.avatar_url || '',
                updated_at: new Date().toISOString(),
              });

            if (profileError) {
              console.error('Error updating profile:', profileError);
            }
          } catch (profileErr) {
            console.error('Error in profile update:', profileErr);
          }
          
          // Redirect to calculator
          navigate('/calculator');
        } else {
          console.log('No session found, checking for hash parameters');
          
          // If we have a hash in the URL, try to exchange it for a session
          if (window.location.hash) {
            console.log('Hash found in URL, attempting to exchange for session');
            
            // The hash will be processed automatically by Supabase
            const { data, error } = await supabase.auth.getSession();
            
            if (error) {
              console.error('Error exchanging hash for session:', error);
              setError('Authentication failed. Please try again.');
              setLoading(false);
              return;
            }
            
            if (data.session) {
              console.log('Successfully authenticated with hash, redirecting to calculator');
              navigate('/calculator');
            } else {
              console.error('No session after hash exchange');
              setError('Authentication failed. Please try again.');
              setLoading(false);
            }
          } else {
            console.error('No hash or session found');
            setError('Authentication failed. Please try again.');
            setLoading(false);
          }
        }
      } catch (err) {
        console.error('Unexpected error in auth callback:', err);
        setError('An unexpected error occurred. Please try again.');
        setLoading(false);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Building2 className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {loading ? 'Completing Authentication' : error ? 'Authentication Error' : 'Authentication Successful'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {loading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600">Please wait while we complete your authentication...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 p-4 rounded-lg text-red-700">
              <h3 className="font-medium">Authentication Failed</h3>
              <p className="mt-2">{error}</p>
              <button
                onClick={() => navigate('/')}
                className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Return to Home
              </button>
            </div>
          ) : (
            <div className="bg-green-50 p-4 rounded-lg text-green-700">
              <h3 className="font-medium">Authentication Successful</h3>
              <p className="mt-2">You have been successfully authenticated. Redirecting you to the dashboard...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
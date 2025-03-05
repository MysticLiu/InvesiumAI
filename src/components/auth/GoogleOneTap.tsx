import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          prompt: (config?: any) => void;
          renderButton: (element: HTMLElement, config: any) => void;
          cancel: () => void;
        };
      };
    };
  }
}

export default function GoogleOneTap() {
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);

  const generateNonce = async (): Promise<[string, string]> => {
    const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))));
    const encoder = new TextEncoder();
    const encodedNonce = encoder.encode(nonce);
    const hashBuffer = await crypto.subtle.digest('SHA-256', encodedNonce);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedNonce = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return [nonce, hashedNonce];
  };

  useEffect(() => {
    let mounted = true;

    const initializeGoogleOneTap = async () => {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      if (!clientId || !mounted) {
        console.log('No Google client ID found or component unmounted');
        return;
      }

      // Check for existing session
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session || !mounted) {
        console.log('User already has a session or component unmounted, skipping Google One Tap');
        return;
      }

      const [nonce, hashedNonce] = await generateNonce();

      if (!isInitialized && window.google?.accounts && mounted) {
        console.log('Initializing Google One Tap with client ID:', clientId);
        
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: async (response: any) => {
            try {
              console.log('Google One Tap callback triggered');
              
              const { data, error } = await supabase.auth.signInWithIdToken({
                provider: 'google',
                token: response.credential,
                nonce,
              });

              if (error) {
                console.error('Error signing in with Google One Tap:', error);
                return;
              }

              console.log('Successfully signed in with Google One Tap');

              // Create or update user profile after successful login
              if (data.user) {
                try {
                  const { error: profileError } = await supabase
                    .from('profiles')
                    .upsert({
                      id: data.user.id,
                      email: data.user.email,
                      full_name: data.user.user_metadata?.full_name || '',
                      avatar_url: data.user.user_metadata?.avatar_url || '',
                      updated_at: new Date().toISOString(),
                    });

                  if (profileError) {
                    console.error('Error updating profile:', profileError);
                  }
                } catch (profileErr) {
                  console.error('Error in profile update:', profileErr);
                }
              }

              if (mounted) {
                navigate('/calculator');
              }
            } catch (error) {
              console.error('Error logging in with Google One Tap:', error);
            }
          },
          nonce: hashedNonce,
          use_fedcm_for_prompt: false,
          prompt_parent_id: 'oneTap',
          context: 'signin',
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        setIsInitialized(true);
        
        setTimeout(() => {
          if (mounted) {
            console.log('Displaying Google One Tap prompt');
            window.google.accounts.id.prompt((notification: any) => {
              if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                console.log('Google One Tap not displayed or skipped:', 
                  notification.getNotDisplayedReason ? notification.getNotDisplayedReason() : 'unknown reason',
                  notification.getSkippedReason ? notification.getSkippedReason() : '');
                return;
              }
            });
          }
        }, 100);
      }
    };

    if (!document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
      console.log('Loading Google Identity Services script');
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log('Google Identity Services script loaded');
        initializeGoogleOneTap();
      };
      document.body.appendChild(script);
    } else {
      console.log('Google Identity Services script already loaded');
      initializeGoogleOneTap();
    }

    return () => {
      mounted = false;
      if (window.google?.accounts) {
        console.log('Canceling Google One Tap on unmount');
        window.google.accounts.id.cancel();
      }
    };
  }, [navigate, isInitialized]);

  return <div id="oneTap" className="fixed top-4 right-4 z-[100]" />;
}
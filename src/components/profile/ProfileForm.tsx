import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { User } from '@supabase/supabase-js';
import BasicInfoForm from './BasicInfoForm';
import SocialLinksForm from './SocialLinksForm';
import StatusMessage from './StatusMessage';

interface Profile {
  username: string;
  full_name: string;
  avatar_url: string;
  bio: string;
  location: string;
  website: string;
  role: string;
  social_links: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export default function ProfileForm() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [profile, setProfile] = useState<Profile>({
    username: '',
    full_name: '',
    avatar_url: '',
    bio: '',
    location: '',
    website: '',
    role: 'user',
    social_links: {},
  });

  useEffect(() => {
    if (user) {
      loadProfile(user);
    }
  }, [user]);

  const loadProfile = async (user: User) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      if (data) {
        setProfile({
          ...profile,
          ...data,
          social_links: data.social_links || {},
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...profile,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ type: 'error', text: 'Error updating profile. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      social_links: {
        ...prev.social_links,
        [platform]: value,
      },
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>

      {message && <StatusMessage type={message.type} text={message.text} />}

      <BasicInfoForm
        username={profile.username}
        fullName={profile.full_name}
        bio={profile.bio}
        location={profile.location}
        website={profile.website}
        onChange={handleChange}
      />

      <SocialLinksForm
        socialLinks={profile.social_links}
        onSocialLinkChange={handleSocialLinkChange}
      />

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    </form>
  );
}
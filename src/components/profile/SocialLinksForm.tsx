import React from 'react';

interface SocialLinksFormProps {
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  onSocialLinkChange: (platform: string, value: string) => void;
}

export default function SocialLinksForm({ socialLinks, onSocialLinkChange }: SocialLinksFormProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Social Links</h3>
      {['twitter', 'linkedin', 'github'].map((platform) => (
        <div key={platform}>
          <label htmlFor={platform} className="block text-sm font-medium text-gray-700 capitalize">
            {platform}
          </label>
          <input
            type="url"
            id={platform}
            value={socialLinks[platform as keyof typeof socialLinks] || ''}
            onChange={(e) => onSocialLinkChange(platform, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      ))}
    </div>
  );
}
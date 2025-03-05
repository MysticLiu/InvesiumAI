import React from 'react';

interface ResetPasswordFormProps {
  email: string;
  setEmail: (email: string) => void;
  loading: boolean;
  error: string | null;
  resetSent: boolean;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ResetPasswordForm({
  email,
  setEmail,
  loading,
  error,
  resetSent,
  onCancel,
  onSubmit
}: ResetPasswordFormProps) {
  if (resetSent) {
    return (
      <div className="bg-green-50 p-4 rounded-lg text-green-700">
        <h3 className="font-medium">Password Reset Email Sent</h3>
        <p className="mt-2">Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder.</p>
        <button 
          onClick={onCancel}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          Return to login
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Reset Your Password</h3>
        <p className="text-sm text-gray-600 mb-4">
          Enter your email address and we'll send you a link to reset your password.
        </p>
        <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="reset-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      {error && (
        <div className="text-sm p-2 rounded bg-red-50 text-red-600">
          {error}
        </div>
      )}

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </div>
    </form>
  );
}
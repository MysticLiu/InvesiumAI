import React from 'react';

interface StatusMessageProps {
  type: 'success' | 'error';
  text: string;
}

export default function StatusMessage({ type, text }: StatusMessageProps) {
  return (
    <div className={`p-4 rounded ${type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
      {text}
    </div>
  );
}
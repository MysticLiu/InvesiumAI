import React from 'react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            ✨ Welcome to Invesium AI! ✨
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-4 text-gray-700">
          <p>
            We're so excited to have you here as one of our first users. Our real estate investment calculator is just the beginning — we have big plans to roll out more features soon, including AI-driven insights, advanced analytics, and even more tools to help you (and your clients) make smarter investment decisions. 🏠🚀
          </p>

          <p>
            Your feedback matters. We'd love to hear your thoughts on what's working well, what could be improved, and what you'd like to see next. Every suggestion helps us shape the future of Invesium AI and bring you an even better experience. 🛠️💡
          </p>

          <p>
            Thank you for joining us on this journey. We can't wait to grow together and show you all the exciting updates we have in store. Stay tuned — and be sure to let us know how we can make this tool truly awesome for you! 🙌🎉
          </p>

          <p>
            Have feedback or ideas? Drop us a note anytime at{' '}
            <a href="mailto:invesiumai@gmail.com" className="text-blue-600 hover:text-blue-800">
              invesiumai@gmail.com
            </a>
            . Your input is our roadmap!
          </p>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}
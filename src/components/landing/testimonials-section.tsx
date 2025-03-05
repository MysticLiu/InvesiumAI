import React from 'react';
import { Star } from 'lucide-react';

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by investors everywhere
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            See what our users are saying about how Invesium AI has transformed their investment strategy.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            <blockquote className="text-gray-600 mb-4">
              "Invesium AI has completely changed how I evaluate potential properties. The detailed cash flow analysis and ROI projections have helped me make much more informed decisions."
            </blockquote>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
                JD
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-sm text-gray-500">Real Estate Investor, Chicago</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            <blockquote className="text-gray-600 mb-4">
              "As a real estate agent, I use Invesium AI to show my clients the potential of different properties. It's become an essential tool in my business and has helped me close more deals."
            </blockquote>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold">
                JS
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Jane Smith</p>
                <p className="text-sm text-gray-500">Real Estate Agent, Miami</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            <blockquote className="text-gray-600 mb-4">
              "The expense breakdown feature is incredibly helpful. I can now see exactly where my money is going and identify areas where I can reduce costs and increase my returns."
            </blockquote>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-semibold">
                RJ
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Robert Johnson</p>
                <p className="text-sm text-gray-500">Property Manager, Austin</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import React from 'react';
import { Button } from '../ui/button';

export function CTASection() {
  const handleGetStarted = () => {
    // Dispatch a custom event that will be caught by the Header component
    const customEvent = new CustomEvent('openAuthModal', { 
      detail: { mode: 'signup' } 
    });
    window.dispatchEvent(customEvent);
  };

  return (
    <section className="py-12 md:py-24 bg-blue-600 text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Make Smarter Investment Decisions?</h2>
            <p className="mx-auto max-w-[700px] text-blue-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join thousands of investors who are using InvesiumAI to analyze properties and build wealth through real estate.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" onClick={handleGetStarted}>
              Try It Free
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-blue-700">
              <a href="#how-it-works">
                Learn More
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
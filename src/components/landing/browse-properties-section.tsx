import React from 'react';
import { Button } from '../ui/button';

export function BrowsePropertiesSection() {
  const handleGetStarted = () => {
    // Dispatch a custom event that will be caught by the Header component
    const customEvent = new CustomEvent('openAuthModal', { 
      detail: { mode: 'signup' } 
    });
    window.dispatchEvent(customEvent);
  };

  return (
    <section id="browse-properties" className="bg-gray-50 py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Analyze Your Properties?</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Use our powerful calculator to get detailed insights on any property you're considering.
            </p>
          </div>
          <div className="mt-6">
            <Button size="lg" onClick={handleGetStarted}>
              Try Our Calculator Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
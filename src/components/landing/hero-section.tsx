import React from 'react';
import { Building2, BarChart3, Calculator, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useState } from 'react';

export function HeroSection() {
  const [propertyAddress, setPropertyAddress] = useState('');

  const handleGetStarted = () => {
    // Dispatch a custom event that will be caught by the Header component
    const customEvent = new CustomEvent('openAuthModal', { 
      detail: { mode: 'signup' } 
    });
    window.dispatchEvent(customEvent);
  };

  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Smart property investment decisions
              </h1>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Calculate ROI, analyze cash flow, and get AI-driven insights to make profitable rental property investments.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <div className="flex-1">
                <Input 
                  placeholder="Enter property address" 
                  value={propertyAddress}
                  onChange={(e) => setPropertyAddress(e.target.value)}
                  className="h-12 w-full"
                />
              </div>
              <Button 
                size="lg" 
                className="h-12"
                onClick={handleGetStarted}
              >
                Get started
              </Button>
            </div>
          </div>
          <div className="relative mx-auto aspect-video overflow-hidden rounded-xl lg:order-last">
            <div className="relative h-full w-full">
              <img
                src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1000&auto=format&fit=crop"
                alt="Modern house with investment metrics"
                className="object-cover w-full h-full rounded-xl"
              />
              <div className="absolute top-4 left-4 bg-black/80 text-white p-3 rounded-lg">
                <div className="text-sm font-medium">Cap Rate</div>
                <div className="text-xl font-bold">7.2%</div>
              </div>
              <div className="absolute bottom-4 left-4 bg-black/80 text-white p-3 rounded-lg">
                <div className="text-sm font-medium">ROI</div>
                <div className="text-xl font-bold">14.6%</div>
              </div>
              <div className="absolute top-4 right-4 bg-blue-600 text-white p-3 rounded-lg">
                <div className="text-sm font-medium">Cash Flow</div>
                <div className="text-xl font-bold">$438/mo</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
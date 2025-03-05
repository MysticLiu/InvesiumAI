import React from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';

export function AIInsightsSection() {
  const handleGetStarted = () => {
    // Dispatch a custom event that will be caught by the Header component
    const customEvent = new CustomEvent('openAuthModal', { 
      detail: { mode: 'signup' } 
    });
    window.dispatchEvent(customEvent);
  };

  const handleLearnMore = () => {
    // Scroll to how it works section
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="rounded-xl border bg-white shadow-sm overflow-hidden order-2 lg:order-1">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-6">AI Investment Analysis</h3>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-sm font-medium text-gray-500">Property Score</div>
                  <div className="text-3xl font-bold text-blue-600">85/100</div>
                </div>
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#e6e6e6" strokeWidth="10" />
                    
                    {/* Progress circle */}
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="none"
                      stroke="#3b82f6" 
                      strokeWidth="10" 
                      strokeDasharray="251.2" 
                      strokeDashoffset="37.68" 
                      transform="rotate(-90 50 50)" 
                    />
                    <text 
                      x="50" 
                      y="55" 
                      textAnchor="middle" 
                      dominantBaseline="middle" 
                      fontSize="18" 
                      fontWeight="bold"
                      fill="#000"
                    >
                      85%
                    </text>
                  </svg>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-gray-500">Projected Annual Return</div>
                  <div className="text-2xl font-bold text-green-600">12.5%</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-gray-500">Market Growth Potential</div>
                  <div className="text-2xl font-bold text-blue-600">High</div>
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-3">Key Factors</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span>Strong rental demand in the area</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span>Upcoming infrastructure developments</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <span>Moderate competition in similar properties</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4 order-1 lg:order-2">
            <div className="space-y-2">
              <div className="text-blue-600 font-medium">AI Insights</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Get AI-powered investment recommendations
              </h2>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our AI analyzes market data, property characteristics, and financial metrics to provide personalized insights. Get recommendations on property potential, risk factors, and market positioning.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleGetStarted}>
                See example
              </Button>
              <Button variant="outline" onClick={handleLearnMore}>
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
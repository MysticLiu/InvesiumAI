import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';

export function InvestmentOptimizationSection() {
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
    <section className="py-12 md:py-24 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="text-blue-600 font-medium">Investment Optimization</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Optimize your investment returns
              </h2>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover opportunities to improve your investment returns. Get suggestions for rent optimization, expense reduction, and property improvements that could increase your ROI.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleGetStarted}>
                Start optimizing
              </Button>
              <Button variant="outline" onClick={handleLearnMore}>
                Learn more
              </Button>
            </div>
          </div>
          <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-6">Investment Optimization</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-3">Monthly Expenses Breakdown</h4>
                  <div className="relative w-full h-48 mb-4">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-32 h-32">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          {/* Background circle */}
                          <circle cx="50" cy="50" r="40" fill="white" />
                          
                          {/* Mortgage: 55% */}
                          <circle 
                            cx="50" 
                            cy="50" 
                            r="40" 
                            fill="transparent"
                            stroke="#3b82f6" 
                            strokeWidth="20" 
                            strokeDasharray="251.2" 
                            strokeDashoffset="113.04" 
                            transform="rotate(-90 50 50)" 
                          />
                          
                          {/* Property Tax: 15% */}
                          <circle 
                            cx="50" 
                            cy="50" 
                            r="40" 
                            fill="transparent"
                            stroke="#10b981" 
                            strokeWidth="20" 
                            strokeDasharray="251.2" 
                            strokeDashoffset="213.52" 
                            transform="rotate(54 50 50)" 
                          />
                          
                          {/* Insurance: 15% */}
                          <circle 
                            cx="50" 
                            cy="50" 
                            r="40" 
                            fill="transparent"
                            stroke="#f59e0b" 
                            strokeWidth="20" 
                            strokeDasharray="251.2" 
                            strokeDashoffset="213.52" 
                            transform="rotate(108 50 50)" 
                          />
                          
                          {/* Maintenance: 15% */}
                          <circle 
                            cx="50" 
                            cy="50" 
                            r="40" 
                            fill="transparent"
                            stroke="#ef4444" 
                            strokeWidth="20" 
                            strokeDasharray="251.2" 
                            strokeDashoffset="213.52" 
                            transform="rotate(162 50 50)" 
                          />
                          
                          {/* Inner white circle to create donut */}
                          <circle cx="50" cy="50" r="30" fill="white" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        <span>Mortgage (55.0%)</span>
                      </div>
                      <span>$750.84</span>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span>Property Tax (15.0%)</span>
                      </div>
                      <span>$200.00</span>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                        <span>Insurance (15.0%)</span>
                      </div>
                      <span>$200.00</span>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <span>Maintenance (15.0%)</span>
                      </div>
                      <span>$200.00</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold mb-3">Optimization Suggestions</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Refinance to lower interest rate</div>
                        <div className="text-sm text-gray-500">Save $150/month</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Install smart thermostats</div>
                        <div className="text-sm text-gray-500">Reduce utility costs by 15%</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Upgrade to energy-efficient appliances</div>
                        <div className="text-sm text-gray-500">Increase property value</div>
                      </div>
                    </li>
                  </ul>
                  <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                    <div className="font-medium">Potential ROI Improvement</div>
                    <div className="text-2xl font-bold text-blue-600">+2.5%</div>
                    <div className="text-xs text-gray-500">By implementing suggested optimizations</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import React from 'react';
import { Button } from '../ui/button';

export function FinancialAnalysisSection() {
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
              <div className="text-blue-600 font-medium">Property Analysis</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Get instant financial metrics for any property
              </h2>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Input property details and instantly see key metrics like cash flow, cap rate, ROI, and more. Our calculator takes into account all expenses including mortgage, taxes, insurance, and maintenance.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleGetStarted}>
                Try it now
              </Button>
              <Button variant="outline" onClick={handleLearnMore}>
                Learn more
              </Button>
            </div>
          </div>
          <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-6">Financial Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-gray-500">Monthly Cash Flow</div>
                  <div className="text-2xl font-bold text-blue-600">$1,049.06</div>
                  <div className="text-xs text-gray-500">Net monthly income after expenses</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-gray-500">Cash on Cash Return</div>
                  <div className="text-2xl font-bold text-green-600">3.60%</div>
                  <div className="text-xs text-gray-500">Annual return relative to cash invested</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-gray-500">Capitalization Rate</div>
                  <div className="text-2xl font-bold text-purple-600">4.32%</div>
                  <div className="text-xs text-gray-500">Net operating income relative to property value</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-gray-500">Debt Service Coverage Ratio</div>
                  <div className="text-2xl font-bold text-orange-600">2.40</div>
                  <div className="text-xs text-gray-500">Measure of how comfortably the property's NOI can cover the mortgage payments</div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-4">Property Value Estimation</h3>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-medium text-gray-500">Estimated Value:</div>
                  <div className="text-2xl font-bold text-green-600">$450,000</div>
                </div>
                <div className="text-xs text-gray-500 mb-4">Based on comparable properties and market trends</div>
                <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-600">
                  Potential for 5% appreciation in the next year
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
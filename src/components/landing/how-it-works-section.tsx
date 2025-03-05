import React from 'react';

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-gray-50 py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform makes real estate investment analysis simple and data-driven.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-12 mt-12">
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="text-xl font-bold">Enter Property Details</h3>
            <p className="text-gray-500">
              Input the property address and basic information to get started with your analysis.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <span className="text-2xl font-bold text-blue-600">2</span>
            </div>
            <h3 className="text-xl font-bold">Get Instant Analysis</h3>
            <p className="text-gray-500">
              Our AI analyzes the property and provides key metrics like ROI, cash flow, and cap rate.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <span className="text-2xl font-bold text-blue-600">3</span>
            </div>
            <h3 className="text-xl font-bold">Make Informed Decisions</h3>
            <p className="text-gray-500">
              Use our detailed reports and AI recommendations to make profitable investment decisions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
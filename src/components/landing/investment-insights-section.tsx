import React from 'react';

export function InvestmentInsightsSection() {
  return (
    <section id="investment-insights" className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Investment Insights</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Get AI-powered insights to maximize your real estate investments.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          <div className="flex flex-col space-y-2 rounded-lg border p-6">
            <h3 className="text-xl font-bold">Cash Flow Analysis</h3>
            <p className="text-gray-500">
              Detailed monthly and annual cash flow projections based on rental income and expenses.
            </p>
          </div>
          <div className="flex flex-col space-y-2 rounded-lg border p-6">
            <h3 className="text-xl font-bold">ROI Calculator</h3>
            <p className="text-gray-500">
              Calculate your return on investment with consideration for appreciation and tax benefits.
            </p>
          </div>
          <div className="flex flex-col space-y-2 rounded-lg border p-6">
            <h3 className="text-xl font-bold">Market Trends</h3>
            <p className="text-gray-500">
              Stay informed about local market trends and property value forecasts.
            </p>
          </div>
          <div className="flex flex-col space-y-2 rounded-lg border p-6">
            <h3 className="text-xl font-bold">Expense Tracking</h3>
            <p className="text-gray-500">
              Track all property-related expenses and identify opportunities to increase profitability.
            </p>
          </div>
          <div className="flex flex-col space-y-2 rounded-lg border p-6">
            <h3 className="text-xl font-bold">Financing Options</h3>
            <p className="text-gray-500">
              Compare different financing scenarios to find the optimal mortgage terms for your investment.
            </p>
          </div>
          <div className="flex flex-col space-y-2 rounded-lg border p-6">
            <h3 className="text-xl font-bold">AI Recommendations</h3>
            <p className="text-gray-500">
              Get personalized recommendations based on your investment goals and risk tolerance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
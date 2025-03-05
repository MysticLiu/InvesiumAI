import React from 'react';
import { Info } from 'lucide-react';
import type { FinancialMetrics as Metrics } from '../types/property';
import ExpensesPieChart from './charts/ExpensesPieChart';
import CashFlowChart from './charts/CashFlowChart';

interface MetricsProps {
  metrics: Metrics;
  expenses: MonthlyExpenses;
}

export default function FinancialMetrics({ metrics, expenses }: MetricsProps) {
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  const formatPercent = (value: number) =>
    new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2 }).format(value / 100);

  const formatRatio = (value: number) =>
    new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Financial Analysis</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Monthly Cash Flow</h3>
          <p className="text-2xl font-bold text-blue-600">{formatCurrency(metrics.monthlyCashFlow)}</p>
          <p className="text-sm text-gray-600 mt-1">Net monthly income after expenses</p>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Cash on Cash Return</h3>
          <p className="text-2xl font-bold text-green-600">{formatPercent(metrics.cashOnCashReturn)}</p>
          <p className="text-sm text-gray-600 mt-1">Annual return relative to cash invested</p>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Capitalization Rate</h3>
          <p className="text-2xl font-bold text-purple-600">{formatPercent(metrics.capRate)}</p>
          <p className="text-sm text-gray-600 mt-1">Net operating income relative to property value</p>
        </div>

        <div className="bg-orange-50 rounded-lg p-4 relative">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Debt Service Coverage Ratio</h3>
          <p className="text-2xl font-bold text-orange-600">{formatRatio(metrics.dscr)}</p>
          <p className="text-sm text-gray-600 mt-1">Measure of how comfortably the property's NOI can cover the mortgage payments</p>
          <div className="absolute bottom-4 right-4 group">
            <Info className="h-4 w-4 text-gray-400 cursor-help" />
            <div className="absolute bottom-full right-0 mb-2 w-64 bg-gray-800 text-white text-sm rounded-lg p-3 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-200">
              A DSCR greater than 1.0 means the property's NOI is enough to cover the mortgage. Many lenders look for a DSCR of at least 1.2–1.3 for safety.
              <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        <CashFlowChart 
          expenses={expenses}
          monthlyMortgage={metrics.monthlyMortgage}
          expectedRent={metrics.expectedRent}
        />
        
        <ExpensesPieChart 
          expenses={expenses}
          monthlyMortgage={metrics.monthlyMortgage}
        />

        <div className="border-t pt-4">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Monthly Breakdown</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Monthly Mortgage Payment:</span>
              <span className="font-medium">{formatCurrency(metrics.monthlyMortgage)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Monthly Expenses:</span>
              <span className="font-medium">{formatCurrency(metrics.totalMonthlyExpenses)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Expected Monthly Rental Income:</span>
              <span className="font-medium">{formatCurrency(metrics.expectedRent)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { MonthlyExpenses } from '../../types/property';

interface CashFlowChartProps {
  expenses: MonthlyExpenses;
  monthlyMortgage: number;
  expectedRent: number;
}

export default function CashFlowChart({ expenses, monthlyMortgage, expectedRent }: CashFlowChartProps) {
  const totalMonthlyExpenses = monthlyMortgage + 
    Object.values(expenses).reduce((sum, expense) => sum + expense, 0);
  
  const monthlyCashFlow = expectedRent - totalMonthlyExpenses;
  
  // Generate 12 months of data
  const data = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(2024, i).toLocaleString('default', { month: 'short' });
    return {
      name: month,
      'Monthly Rent': expectedRent,
      'Total Expenses': totalMonthlyExpenses,
      'Net Cash Flow': monthlyCashFlow,
    };
  });

  return (
    <div className="h-[300px] w-full">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Monthly Cash Flow Analysis</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis 
            tickFormatter={(value) => new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0,
            }).format(value)}
          />
          <Tooltip 
            formatter={(value: number) => new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(value)}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="Monthly Rent" 
            stroke="#8884d8" 
            strokeWidth={2}
          />
          <Line 
            type="monotone" 
            dataKey="Total Expenses" 
            stroke="#82ca9d" 
            strokeWidth={2}
          />
          <Line 
            type="monotone" 
            dataKey="Net Cash Flow" 
            stroke="#ffc658" 
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
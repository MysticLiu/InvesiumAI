import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { MonthlyExpenses } from '../../types/property';

interface ExpensesBarChartProps {
  expenses: MonthlyExpenses;
  monthlyMortgage: number;
}

export default function ExpensesBarChart({ expenses, monthlyMortgage }: ExpensesBarChartProps) {
  const data = [
    {
      name: 'Monthly Expenses',
      Mortgage: monthlyMortgage,
      Insurance: expenses.insurance,
      'Property Tax': expenses.propertyTax,
      Maintenance: expenses.maintenance,
      Utilities: expenses.utilities,
      'HOA Fees': expenses.hoaFees,
      'Property Management': expenses.propertyManagement,
    },
  ];

  return (
    <div className="h-[300px] w-full">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Monthly Expenses Comparison</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
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
          <Bar dataKey="Mortgage" fill="#8884d8" />
          <Bar dataKey="Insurance" fill="#82ca9d" />
          <Bar dataKey="Property Tax" fill="#ffc658" />
          <Bar dataKey="Maintenance" fill="#ff8042" />
          <Bar dataKey="Utilities" fill="#a4de6c" />
          <Bar dataKey="HOA Fees" fill="#d0ed57" />
          <Bar dataKey="Property Management" fill="#83a6ed" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
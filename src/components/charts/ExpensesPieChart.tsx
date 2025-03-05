import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { MonthlyExpenses } from '../../types/property';

interface ExpensesPieChartProps {
  expenses: MonthlyExpenses;
  monthlyMortgage: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ff7300'];

export default function ExpensesPieChart({ expenses, monthlyMortgage }: ExpensesPieChartProps) {
  const total = monthlyMortgage + Object.values(expenses).reduce((sum, value) => sum + value, 0);

  const data = [
    { name: 'Mortgage', value: monthlyMortgage },
    { name: 'Insurance', value: expenses.insurance },
    { name: 'Property Tax', value: expenses.propertyTax },
    { name: 'Maintenance', value: expenses.maintenance },
    { name: 'Utilities', value: expenses.utilities },
    { name: 'HOA Fees', value: expenses.hoaFees },
    { name: 'Property Management', value: expenses.propertyManagement },
  ].filter(item => item.value > 0);

  const renderLegend = (props: any) => {
    if (!props?.payload) return null;
    
    return (
      <div className="text-sm">
        {props.payload.map((entry: any, index: number) => {
          const percentage = ((entry.payload.value / total) * 100).toFixed(1);
          const formattedValue = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(entry.payload.value);
          
          return (
            <div key={`item-${index}`} className="flex items-center mb-2">
              <span
                className="w-3 h-3 rounded-full mr-2 flex-shrink-0"
                style={{ backgroundColor: entry.color }}
              />
              <span className="whitespace-nowrap">
                {entry.value} ({percentage}%) - {formattedValue}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Monthly Expenses Breakdown</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="h-[300px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(value)}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center">
          <div className="w-full">
            {renderLegend({ payload: data.map((item, index) => ({
              value: item.name,
              color: COLORS[index % COLORS.length],
              payload: item
            }))})}
          </div>
        </div>
      </div>
    </div>
  );
}
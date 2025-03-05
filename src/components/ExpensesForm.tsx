import React from 'react';
import type { MonthlyExpenses, PropertyDetails } from '../types/property';
import { calculateMortgage } from '../utils/calculations';

interface ExpensesFormProps {
  expenses: MonthlyExpenses;
  onChange: (expenses: MonthlyExpenses) => void;
  propertyDetails: PropertyDetails;
}

export default function ExpensesForm({ expenses, onChange, propertyDetails }: ExpensesFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...expenses,
      [name]: Number(value) || 0,
    });
  };

  const monthlyMortgage = propertyDetails.purchasePrice && propertyDetails.downPayment != null && 
    propertyDetails.interestRate && propertyDetails.loanTerm
    ? calculateMortgage(
        propertyDetails.purchasePrice,
        propertyDetails.downPayment,
        propertyDetails.interestRate,
        propertyDetails.loanTerm
      )
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Monthly Expenses</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Mortgage Payment ($)</label>
          <input
            type="text"
            value={monthlyMortgage.toFixed(2)}
            disabled
            className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700"
          />
          <p className="mt-1 text-sm text-gray-500">Calculated based on property details</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Insurance ($)</label>
          <input
            type="number"
            name="insurance"
            value={expenses.insurance || ''}
            onChange={handleChange}
            placeholder="Enter monthly insurance cost"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Property Tax ($)</label>
          <input
            type="number"
            name="propertyTax"
            value={expenses.propertyTax || ''}
            onChange={handleChange}
            placeholder="Enter monthly property tax"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Maintenance ($)</label>
          <input
            type="number"
            name="maintenance"
            value={expenses.maintenance || ''}
            onChange={handleChange}
            placeholder="Enter monthly maintenance cost"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Utilities ($)</label>
          <input
            type="number"
            name="utilities"
            value={expenses.utilities || ''}
            onChange={handleChange}
            placeholder="Enter monthly utilities cost"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">HOA Fees ($)</label>
          <input
            type="number"
            name="hoaFees"
            value={expenses.hoaFees || ''}
            onChange={handleChange}
            placeholder="Enter monthly HOA fees"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Property Management ($)</label>
          <input
            type="number"
            name="propertyManagement"
            value={expenses.propertyManagement || ''}
            onChange={handleChange}
            placeholder="Enter monthly property management cost"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}
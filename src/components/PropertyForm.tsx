import React, { useState, useEffect } from 'react';
import type { PropertyDetails } from '../types/property';

interface PropertyFormProps {
  propertyDetails: PropertyDetails;
  onChange: (details: PropertyDetails) => void;
}

export default function PropertyForm({ propertyDetails, onChange }: PropertyFormProps) {
  const [downPaymentPercentage, setDownPaymentPercentage] = useState(
    propertyDetails.purchasePrice ? (propertyDetails.downPayment / propertyDetails.purchasePrice * 100) : 0
  );

  useEffect(() => {
    if (propertyDetails.purchasePrice) {
      setDownPaymentPercentage((propertyDetails.downPayment / propertyDetails.purchasePrice * 100));
    }
  }, [propertyDetails.purchasePrice, propertyDetails.downPayment]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let numericValue = value.replace(/,/g, '');
    
    if (name === 'address') {
      onChange({
        ...propertyDetails,
        [name]: value,
      });
      return;
    }

    const newValue = numericValue === '' ? 0 : Number(numericValue);
    
    if (name === 'purchasePrice') {
      // When purchase price changes, maintain the down payment percentage
      const newDownPayment = Math.round(newValue * (downPaymentPercentage / 100));
      onChange({
        ...propertyDetails,
        [name]: newValue,
        downPayment: newDownPayment,
      });
    } else if (name === 'downPayment') {
      // When down payment changes, update the percentage
      const newPercentage = propertyDetails.purchasePrice ? (newValue / propertyDetails.purchasePrice) * 100 : 0;
      setDownPaymentPercentage(newPercentage);
      onChange({
        ...propertyDetails,
        [name]: newValue,
      });
    } else if (name === 'downPaymentPercentage') {
      // When percentage changes, update the down payment amount
      const percentage = Math.min(100, Math.max(0, Number(value)));
      setDownPaymentPercentage(percentage);
      const newDownPayment = Math.round(propertyDetails.purchasePrice * (percentage / 100));
      onChange({
        ...propertyDetails,
        downPayment: newDownPayment,
      });
    } else {
      onChange({
        ...propertyDetails,
        [name]: newValue,
      });
    }
  };

  const formatValue = (value: number) => {
    return value ? value.toLocaleString('en-US') : '';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Property Details</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Property Address</label>
          <input
            type="text"
            name="address"
            value={propertyDetails.address}
            onChange={handleChange}
            placeholder="Enter property address"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Price</label>
          <div className="relative">
            <span className="absolute left-0 top-0 px-4 py-3 text-gray-500">$</span>
            <input
              type="text"
              name="purchasePrice"
              value={formatValue(propertyDetails.purchasePrice)}
              onChange={handleChange}
              placeholder="Enter purchase price"
              className="w-full px-4 py-3 pl-8 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-0 top-0 px-4 py-3 text-gray-500">$</span>
              <input
                type="text"
                name="downPayment"
                value={formatValue(propertyDetails.downPayment)}
                onChange={handleChange}
                placeholder="Enter down payment"
                className="w-full px-4 py-3 pl-8 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative w-32">
              <input
                type="number"
                name="downPaymentPercentage"
                value={downPaymentPercentage ? Math.round(downPaymentPercentage * 100) / 100 : ''}
                onChange={handleChange}
                min="0"
                max="100"
                step="0.1"
                className="w-full px-4 py-3 pr-8 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="absolute right-0 top-0 px-4 py-3 text-gray-500">%</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
          <input
            type="number"
            name="interestRate"
            value={propertyDetails.interestRate || ''}
            onChange={handleChange}
            placeholder="Enter interest rate"
            step="0.1"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Loan Term (Years)</label>
          <input
            type="number"
            name="loanTerm"
            value={propertyDetails.loanTerm || ''}
            onChange={handleChange}
            placeholder="Enter loan term in years"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}
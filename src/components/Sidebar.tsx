import React from 'react';
import type { SavedCalculation } from '../types/property';

interface SidebarProps {
  savedCalculations: SavedCalculation[];
  onSelect: (calculation: SavedCalculation) => void;
  onDelete: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ savedCalculations, onSelect, onDelete, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity lg:hidden"
          onClick={onClose}
        ></div>
      )}

      <div
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-white transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:w-64`}
      >
        <div className="h-full flex flex-col">
          <div className="px-4 py-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Saved Properties</h2>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            {savedCalculations.length === 0 ? (
              <p className="text-gray-500 text-center">No saved calculations</p>
            ) : (
              <ul className="space-y-4">
                {savedCalculations.map((calc) => (
                  <li
                    key={calc.id}
                    className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <button
                        onClick={() => onSelect(calc)}
                        className="text-left flex-1"
                      >
                        <h3 className="font-medium text-gray-800">{calc.name}</h3>
                        <p className="text-sm text-gray-500">{calc.date}</p>
                        <p className="text-sm text-gray-600 mt-1">{calc.propertyDetails.address}</p>
                      </button>
                      <button
                        onClick={() => onDelete(calc.id)}
                        className="text-red-600 hover:text-red-700 text-sm px-2 py-1"
                      >
                        Delete
                      </button>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>Monthly Cash Flow: ${calc.metrics.monthlyCashFlow.toFixed(2)}</p>
                      <p>ROI: {calc.metrics.roi.toFixed(2)}%</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
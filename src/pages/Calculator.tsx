import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropertyForm from '../components/PropertyForm';
import ExpensesForm from '../components/ExpensesForm';
import FinancialMetrics from '../components/FinancialMetrics';
import Sidebar from '../components/Sidebar';
import SaveCalculationModal from '../components/SaveCalculationModal';
import AuthModal from '../components/auth/AuthModal';
import WelcomeModal from '../components/WelcomeModal';
import { calculateMetrics } from '../utils/calculations';
import { useAuth } from '../contexts/AuthContext';
import { useSavedCalculations } from '../hooks/useSavedCalculations';
import type { PropertyDetails, MonthlyExpenses, FinancialMetrics as Metrics, SavedCalculation } from '../types/property';

const initialPropertyDetails: PropertyDetails = {
  address: '',
  purchasePrice: 0,
  downPayment: 0,
  interestRate: 0,
  loanTerm: 30,
};

const initialExpenses: MonthlyExpenses = {
  insurance: 0,
  propertyTax: 0,
  maintenance: 0,
  utilities: 0,
  hoaFees: 0,
  propertyManagement: 0,
};

export default function Calculator() {
  const { user } = useAuth();
  const { calculations, saveCalculation, deleteCalculation } = useSavedCalculations();
  const [propertyDetails, setPropertyDetails] = useState<PropertyDetails>(initialPropertyDetails);
  const [expenses, setExpenses] = useState<MonthlyExpenses>(initialExpenses);
  const [expectedRent, setExpectedRent] = useState(0);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [isSaveModalOpen, setSaveModalOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isWelcomeModalOpen, setWelcomeModalOpen] = useState(true);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    if (propertyDetails.purchasePrice && expectedRent) {
      const calculatedMetrics = calculateMetrics(propertyDetails, expenses, expectedRent);
      setMetrics(calculatedMetrics);
    }
  }, [propertyDetails, expenses, expectedRent]);

  const resetForm = () => {
    setPropertyDetails(initialPropertyDetails);
    setExpenses(initialExpenses);
    setExpectedRent(0);
    setMetrics(null);
  };

  const handleSave = async (name: string) => {
    if (!user) {
      setAuthMode('login');
      setAuthModalOpen(true);
      return;
    }

    if (metrics) {
      const calculation = {
        name,
        date: new Date().toLocaleDateString(),
        propertyDetails,
        expenses,
        expectedRent,
        metrics,
      };

      const saved = await saveCalculation(calculation);
      if (saved) {
        setSaveModalOpen(false);
        resetForm();
      }
    }
  };

  const handleDelete = async (id: string) => {
    await deleteCalculation(id);
  };

  const loadCalculation = (calculation: SavedCalculation) => {
    setPropertyDetails(calculation.propertyDetails);
    setExpenses(calculation.expenses);
    setExpectedRent(calculation.expectedRent);
    setMetrics(calculation.metrics);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 lg:flex">
      <Sidebar
        savedCalculations={calculations}
        onSelect={loadCalculation}
        onDelete={handleDelete}
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <header className="flex justify-between items-center mb-12">
            <button
              className="lg:hidden text-gray-600 hover:text-gray-800"
              onClick={() => setSidebarOpen(true)}
            >
              Menu
            </button>
            <h1 className="text-4xl font-bold text-gray-900">Invesium AI</h1>
            <div className="flex gap-4">
              {user ? (
                <button
                  onClick={() => setSaveModalOpen(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setAuthMode('login');
                      setAuthModalOpen(true);
                    }}
                    className="px-4 py-2 text-blue-600 hover:text-blue-700"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => {
                      setAuthMode('signup');
                      setAuthModalOpen(true);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Create Account
                  </button>
                </>
              )}
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="space-y-8">
              <PropertyForm
                propertyDetails={propertyDetails}
                onChange={setPropertyDetails}
              />
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Expected Monthly Rent</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Rent ($)</label>
                  <input
                    type="number"
                    value={expectedRent}
                    onChange={(e) => setExpectedRent(Number(e.target.value))}
                    placeholder="Enter expected monthly rent"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <ExpensesForm
                expenses={expenses}
                onChange={setExpenses}
                propertyDetails={propertyDetails}
              />
            </div>

            <div className="space-y-8">
              {metrics && <FinancialMetrics metrics={metrics} expenses={expenses} />}
            </div>
          </div>
        </div>
      </div>

      <SaveCalculationModal
        isOpen={isSaveModalOpen}
        onClose={() => setSaveModalOpen(false)}
        onSave={handleSave}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
      />

      <WelcomeModal
        isOpen={isWelcomeModalOpen}
        onClose={() => setWelcomeModalOpen(false)}
      />
    </div>
  );
}
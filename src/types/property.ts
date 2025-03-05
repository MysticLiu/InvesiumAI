export interface PropertyDetails {
  address: string;
  purchasePrice: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
}

export interface MonthlyExpenses {
  insurance: number;
  propertyTax: number;
  maintenance: number;
  utilities: number;
  hoaFees: number;
  propertyManagement: number;
}

export interface FinancialMetrics {
  monthlyMortgage: number;
  totalMonthlyExpenses: number;
  expectedRent: number;
  monthlyCashFlow: number;
  cashOnCashReturn: number;
  capRate: number;
  noi: number;
  dscr: number;
}

export interface SavedCalculation {
  id: string;
  name: string;
  date: string;
  propertyDetails: PropertyDetails;
  expenses: MonthlyExpenses;
  expectedRent: number;
  metrics: FinancialMetrics;
}
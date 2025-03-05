export const calculateMortgage = (price: number, downPayment: number, interestRate: number, years: number): number => {
  const principal = price - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = years * 12;
  
  const mortgage = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                  (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  return Math.round(mortgage * 100) / 100;
};

export const calculateMetrics = (
  propertyDetails: PropertyDetails,
  expenses: MonthlyExpenses,
  expectedRent: number
): FinancialMetrics => {
  const monthlyMortgage = calculateMortgage(
    propertyDetails.purchasePrice,
    propertyDetails.downPayment,
    propertyDetails.interestRate,
    propertyDetails.loanTerm
  );

  const totalMonthlyExpenses = monthlyMortgage + 
    Object.values(expenses).reduce((sum, expense) => sum + expense, 0);

  const monthlyCashFlow = expectedRent - totalMonthlyExpenses;

  const annualCashFlow = monthlyCashFlow * 12;
  const totalInvestment = propertyDetails.downPayment + expenses.maintenance * 12;
  
  const cashOnCashReturn = (annualCashFlow / totalInvestment) * 100;
  
  // Calculate annual operating expenses (excluding mortgage)
  const annualOperatingExpenses = Object.values(expenses).reduce((sum, expense) => sum + (expense * 12), 0);
  
  // Calculate annual gross rental income
  const annualGrossRentalIncome = expectedRent * 12;
  
  // Calculate NOI (Net Operating Income)
  const noi = annualGrossRentalIncome - annualOperatingExpenses;
  
  // Calculate annual debt service (total mortgage payments)
  const annualDebtService = monthlyMortgage * 12;
  
  // Calculate DSCR (Debt Service Coverage Ratio)
  const dscr = annualDebtService > 0 ? noi / annualDebtService : 0;
  
  const capRate = (noi / propertyDetails.purchasePrice) * 100;

  return {
    monthlyMortgage,
    totalMonthlyExpenses,
    expectedRent,
    monthlyCashFlow,
    cashOnCashReturn,
    capRate,
    noi,
    dscr
  };
};

export const generateAIAnalysis = (metrics: FinancialMetrics): AIAnalysis => {
  const strengths = [];
  const risks = [];
  let recommendation = "";
  let confidenceScore = 0;

  if (metrics.monthlyCashFlow > 500) {
    strengths.push("Strong positive cash flow");
    confidenceScore += 25;
  }

  if (metrics.capRate > 8) {
    strengths.push("Excellent cap rate above market average");
    confidenceScore += 25;
  }

  if (metrics.cashOnCashReturn > 10) {
    strengths.push("Superior cash-on-cash return");
    confidenceScore += 25;
  }

  if (metrics.monthlyCashFlow < 200) {
    risks.push("Tight monthly cash flow margin");
    confidenceScore -= 15;
  }

  if (metrics.capRate < 5) {
    risks.push("Below-average cap rate for the market");
    confidenceScore -= 15;
  }

  confidenceScore = Math.max(0, Math.min(100, confidenceScore + 50));

  recommendation = confidenceScore > 70 
    ? "Strong Investment Opportunity" 
    : confidenceScore > 50 
    ? "Moderate Investment Potential" 
    : "Proceed with Caution";

  return {
    recommendation,
    confidenceScore,
    keyStrengths: strengths,
    potentialRisks: risks
  };
};
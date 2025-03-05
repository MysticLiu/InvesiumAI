import React from 'react';
import type { AIAnalysis as Analysis } from '../types/property';

interface AIAnalysisProps {
  analysis: Analysis;
}

export default function AIAnalysis({ analysis }: AIAnalysisProps) {
  const getConfidenceColor = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">AI Investment Analysis</h2>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium text-gray-800">Investment Recommendation</h3>
          <span className={`text-lg font-bold ${getConfidenceColor(analysis.confidenceScore)}`}>
            {analysis.recommendation}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${getConfidenceColor(analysis.confidenceScore)}`}
            style={{ width: `${analysis.confidenceScore}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Analysis Confidence Score: {analysis.confidenceScore}%
        </p>
      </div>

      {analysis.keyStrengths.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Investment Strengths</h3>
          <ul className="space-y-2">
            {analysis.keyStrengths.map((strength, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                <span className="text-gray-700">{strength}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {analysis.potentialRisks.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-3">Risk Factors</h3>
          <ul className="space-y-2">
            {analysis.potentialRisks.map((risk, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                <span className="text-gray-700">{risk}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
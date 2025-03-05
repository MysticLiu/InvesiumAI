import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import AuthModal from '@/components/auth/AuthModal';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';

// Import all landing page sections
import { HeroSection } from '@/components/landing/hero-section';
import { FinancialAnalysisSection } from '@/components/landing/financial-analysis-section';
import { AIInsightsSection } from '@/components/landing/ai-insights-section';
import { InvestmentOptimizationSection } from '@/components/landing/investment-optimization-section';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';
import { InvestmentInsightsSection } from '@/components/landing/investment-insights-section';
import { BrowsePropertiesSection } from '@/components/landing/browse-properties-section';
import { CTASection } from '@/components/landing/cta-section';
import { Footer } from '@/components/landing/footer';
import { Header } from '@/components/landing/header';

export default function LandingPage() {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const openAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        <FinancialAnalysisSection />
        <AIInsightsSection />
        <InvestmentOptimizationSection />
        <HowItWorksSection />
        <InvestmentInsightsSection />
        <BrowsePropertiesSection />
        <CTASection />
      </main>

      <Footer />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
      />
    </div>
  );
}
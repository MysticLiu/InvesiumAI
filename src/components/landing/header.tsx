import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '../ui/navigation-menu';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import AuthModal from '../auth/AuthModal';
import GoogleSignInButton from '../auth/GoogleSignInButton';

export function Header() {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleLogout = async () => {
    try {
      console.log('Logging out user');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
      }
    } catch (error) {
      console.error('Unexpected error during logout:', error);
    }
  };

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  // Listen for custom events from child components
  useEffect(() => {
    const handleOpenAuthModal = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && customEvent.detail.mode) {
        openAuthModal(customEvent.detail.mode);
      } else {
        openAuthModal('signup'); // Default to signup
      }
    };

    window.addEventListener('openAuthModal', handleOpenAuthModal);

    return () => {
      window.removeEventListener('openAuthModal', handleOpenAuthModal);
    };
  }, []);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Invesium AI</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <a href="#how-it-works" className="text-gray-700 hover:text-gray-900">
                      How it works
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <a href="#investment-insights" className="text-gray-700 hover:text-gray-900">
                      Investment insights
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <a href="#browse-properties" className="text-gray-700 hover:text-gray-900">
                      Browse properties
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {user ? (
              <div className="flex items-center space-x-4">
                <Button asChild>
                  <Link to="/calculator">Dashboard</Link>
                </Button>
                <Button variant="outline" onClick={handleLogout}>
                  Log Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button variant="outline" onClick={() => openAuthModal('login')}>
                  Sign in
                </Button>
                <Button onClick={() => openAuthModal('signup')}>
                  Get Started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 py-4">
            <a href="#how-it-works" className="block text-gray-700 hover:text-gray-900">
              How it works
            </a>
            <a href="#investment-insights" className="block text-gray-700 hover:text-gray-900">
              Investment insights
            </a>
            <a href="#browse-properties" className="block text-gray-700 hover:text-gray-900">
              Browse properties
            </a>
            
            {user ? (
              <>
                <Link to="/calculator" className="block text-gray-700 hover:text-gray-900">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block text-gray-700 hover:text-gray-900"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => openAuthModal('login')} className="w-full">
                  Sign in
                </Button>
                <div className="mt-2">
                  <GoogleSignInButton mode="signin" />
                </div>
                <Button onClick={() => openAuthModal('signup')} className="w-full mt-2">
                  Get Started
                </Button>
              </>
            )}
          </div>
        )}
      </nav>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
      />
    </header>
  );
}
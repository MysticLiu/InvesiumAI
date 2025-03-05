import React from 'react';
import { Building2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container px-4 py-12 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center">
              <Building2 className="h-6 w-6 text-blue-600 mr-2" />
              <span className="text-lg font-bold">InvesiumAI</span>
            </div>
            <p className="text-sm text-gray-500">
              Making real estate investment analysis simple, powerful, and accessible to everyone.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900">Features</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900">Pricing</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900">Testimonials</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900">FAQ</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900">About</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900">Blog</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900">Careers</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900">Contact</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} InvesiumAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
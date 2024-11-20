import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './Button';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Products', href: '#' },
    { name: 'For Business', href: '#' },
    { name: 'Store', href: '#' },
    { name: 'Privacy Policy', href: '#' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-sm fixed w-full z-50 top-0 left-0 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-900 bg-clip-text text-transparent">
              EliteEdge
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Button variant="outline" size="sm">
              Log In
            </Button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 text-gray-600 hover:text-purple-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Button variant="outline" size="sm" className="w-full mt-4">
              Log In
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
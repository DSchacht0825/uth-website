'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useCartStore } from '@/store/cart';
import TopBar from './TopBar';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Shop', href: '/products' },
    { label: 'Gallery', href: '/gallery' },
  ];

  const rightNavItems = [
    { label: 'Reservation', href: '/booking' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <TopBar />
      <nav className="bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-24 md:h-28">
          {/* Left Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-gray-900 transition-colors text-sm uppercase tracking-wide"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Centered Logo */}
          <Link href="/" className="flex items-center flex-1 justify-center lg:flex-initial lg:justify-start">
            <Image
              src="/images/Under-The-Heavens-Collection-UTH-e1713160337359.png"
              alt="UTH Candles Logo"
              width={200}
              height={80}
              className="h-12 w-auto md:h-16 lg:h-20"
              priority
            />
          </Link>

          {/* Right Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {rightNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-gray-900 transition-colors text-sm uppercase tracking-wide"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/cart"
              className="relative text-gray-700 hover:text-gray-900 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-900 hover:text-gray-700"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-7 h-7"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {[...navItems, ...rightNavItems].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-gray-900 transition-colors text-sm uppercase tracking-wide"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-gray-900 transition-colors text-sm uppercase tracking-wide flex items-center"
              >
                Cart {itemCount > 0 && `(${itemCount})`}
              </Link>
            </div>
          </div>
        )}
        </div>
      </nav>
    </header>
  );
}

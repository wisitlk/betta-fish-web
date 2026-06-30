
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, LogOut, UserPlus, Truck, Heart } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { useWishlistStore } from '@/stores/wishlistStore';

const Header = () => {
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { items } = useCartStore();
  const wishlistItems = useWishlistStore((state) => state.items);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">TB</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Thailand Betta Fish</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/shop" className="text-gray-700 hover:text-blue-600 transition-colors">
              Shop
            </Link>
            <Link to="/wishlist" className="text-gray-700 hover:text-blue-600 transition-colors">
              Wishlist
            </Link>
            <Link to="/shipping" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-1">
              <Truck className="h-4 w-4" />
              Shipping
            </Link>
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-2">
            {/* Wishlist */}
            <Link to="/wishlist" className="relative">
              <Button variant="ghost" size="sm">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="sm">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* User menu */}
            {user ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline">{user.email}</span>
                </Button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    {isAdmin && (
                      <>
                        <Link
                          to="/admin/add-product"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Add Product
                        </Link>
                        <Link
                          to="/admin/users"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Manage Users
                        </Link>
                        <hr className="my-1" />
                      </>
                    )}
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 inline mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/auth">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              <Link
                to="/shop"
                className="text-gray-700 hover:text-blue-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/wishlist"
                className="text-gray-700 hover:text-blue-600 py-2 flex items-center gap-1"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart className="h-4 w-4" />
                Wishlist
              </Link>
              <Link
                to="/shipping"
                className="text-gray-700 hover:text-blue-600 py-2 flex items-center gap-1"
                onClick={() => setIsMenuOpen(false)}
              >
                <Truck className="h-4 w-4" />
                Shipping
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

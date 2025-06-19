
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-sm text-gray-600">Welcome, {user?.email}</p>
          </div>
          
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
            >
              Back to Shop
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/admin/users')}
            >
              Manage Users
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

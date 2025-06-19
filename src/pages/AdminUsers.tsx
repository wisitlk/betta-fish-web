
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import AdminHeader from '@/components/admin/AdminHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Trash2 } from 'lucide-react';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
}

const AdminUsers = () => {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/auth');
    }
  }, [user, loading, isAdmin, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchUsers();
    }
  }, [user, isAdmin]);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching users:', error);
        toast({
          title: "Error",
          description: "Failed to load users",
          variant: "destructive",
        });
      } else {
        setUsers(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleDeleteUser = async (userId: string, userEmail: string) => {
    try {
      // First delete from profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (profileError) {
        throw profileError;
      }

      // Remove from local state
      setUsers(users.filter(u => u.id !== userId));
      
      toast({
        title: "Success",
        description: `User ${userEmail} has been deleted successfully.`,
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: "Error",
        description: "Failed to delete user. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading || loadingUsers) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage registered users in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.length === 0 ? (
                <p className="text-center py-8 text-gray-500">No users found.</p>
              ) : (
                users.map((userProfile) => (
                  <div key={userProfile.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{userProfile.full_name || 'No name provided'}</h3>
                      <p className="text-sm text-gray-600">{userProfile.email}</p>
                      <p className="text-xs text-gray-400">
                        Joined: {new Date(userProfile.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm" disabled={userProfile.id === user.id}>
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the user account for {userProfile.email}.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDeleteUser(userProfile.id, userProfile.email)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete User
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminUsers;

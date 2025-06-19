
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface ShippingAddress {
  id?: string;
  user_id: string;
  full_name: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
}

const ShippingAddress = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [addresses, setAddresses] = useState<ShippingAddress[]>([]);
  const [formData, setFormData] = useState<Omit<ShippingAddress, 'id' | 'user_id'>>({
    full_name: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    is_default: false
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchAddresses();
    }
  }, [user]);

  const fetchAddresses = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('shipping_addresses')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false });

      if (error) {
        console.error('Error fetching addresses:', error);
      } else {
        setAddresses(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (field: keyof Omit<ShippingAddress, 'id' | 'user_id'>, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    try {
      const addressData = {
        ...formData,
        user_id: user.id
      };

      const { error } = await supabase
        .from('shipping_addresses')
        .insert([addressData]);

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Shipping address saved successfully!",
        });
        setFormData({
          full_name: '',
          address_line_1: '',
          address_line_2: '',
          city: '',
          state: '',
          postal_code: '',
          country: '',
          is_default: false
        });
        fetchAddresses();
      }
    } catch (error) {
      console.error('Error saving address:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Add New Shipping Address</CardTitle>
              <CardDescription>Enter your shipping details for product delivery</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => handleInputChange('full_name', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address_line_1">Address Line 1</Label>
                  <Input
                    id="address_line_1"
                    value={formData.address_line_1}
                    onChange={(e) => handleInputChange('address_line_1', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address_line_2">Address Line 2 (Optional)</Label>
                  <Input
                    id="address_line_2"
                    value={formData.address_line_2}
                    onChange={(e) => handleInputChange('address_line_2', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="postal_code">Postal Code</Label>
                    <Input
                      id="postal_code"
                      value={formData.postal_code}
                      onChange={(e) => handleInputChange('postal_code', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Address'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Saved Addresses</CardTitle>
              <CardDescription>Your saved shipping addresses</CardDescription>
            </CardHeader>
            <CardContent>
              {addresses.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No saved addresses yet.</p>
              ) : (
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div key={address.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{address.full_name}</h3>
                        {address.is_default && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {address.address_line_1}
                        {address.address_line_2 && <><br />{address.address_line_2}</>}
                        <br />
                        {address.city}, {address.state} {address.postal_code}
                        <br />
                        {address.country}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ShippingAddress;

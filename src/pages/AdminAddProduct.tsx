import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';

type TailType = Database['public']['Enums']['tail_type'];
type Gender = Database['public']['Enums']['gender'];

const AdminAddProduct = () => {
  const { isAdmin, loading } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    type: '',
    tail_type: '' as TailType,
    color: [''],
    gender: '' as Gender,
    age: '',
    price: '',
    images: [''],
    video: '',
    description: '',
    is_new_arrival: false,
    is_best_seller: false,
    is_giant_betta: false,
    is_samurai: false,
    shipping_info: '',
    acclimatization_guide: '',
  });
  
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleColorChange = (index: number, value: string) => {
    const newColors = [...formData.color];
    newColors[index] = value;
    setFormData(prev => ({
      ...prev,
      color: newColors
    }));
  };

  const addColorField = () => {
    setFormData(prev => ({
      ...prev,
      color: [...prev.color, '']
    }));
  };

  const removeColorField = (index: number) => {
    const newColors = formData.color.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      color: newColors
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const removeImageField = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const dataToSubmit = {
        ...formData,
        price: parseFloat(formData.price),
        color: formData.color.filter(c => c.trim() !== ''),
        images: formData.images.filter(img => img.trim() !== ''),
      };

      const { error } = await supabase
        .from('fish')
        .insert(dataToSubmit);

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Product added successfully!",
        });
        
        // Reset form
        setFormData({
          code: '',
          name: '',
          type: '',
          tail_type: '' as TailType,
          color: [''],
          gender: '' as Gender,
          age: '',
          price: '',
          images: [''],
          video: '',
          description: '',
          is_new_arrival: false,
          is_best_seller: false,
          is_giant_betta: false,
          is_samurai: false,
          shipping_info: '',
          acclimatization_guide: '',
        });
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: "Error",
        description: "Failed to add product",
        variant: "destructive",
      });
    }

    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
            <CardDescription>
              Add a new betta fish to your inventory
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="code">Product Code</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => handleInputChange('code', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Input
                    id="type"
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tail_type">Tail Type</Label>
                  <Select value={formData.tail_type} onValueChange={(value) => handleInputChange('tail_type', value as TailType)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tail type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Halfmoon">Halfmoon</SelectItem>
                      <SelectItem value="Plakat">Plakat</SelectItem>
                      <SelectItem value="Crowntail">Crowntail</SelectItem>
                      <SelectItem value="Dumbo Ear">Dumbo Ear</SelectItem>
                      <SelectItem value="Rosetail">Rosetail</SelectItem>
                      <SelectItem value="Spade Tail">Spade Tail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value as Gender)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Colors</Label>
                {formData.color.map((color, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={color}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                      placeholder="Enter color"
                    />
                    {formData.color.length > 1 && (
                      <Button type="button" variant="outline" onClick={() => removeColorField(index)}>
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addColorField}>
                  Add Color
                </Button>
              </div>

              <div className="space-y-4">
                <Label>Images</Label>
                {formData.images.map((image, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={image}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      placeholder="Enter image URL"
                    />
                    {formData.images.length > 1 && (
                      <Button type="button" variant="outline" onClick={() => removeImageField(index)}>
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addImageField}>
                  Add Image
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="video">Video URL (optional)</Label>
                <Input
                  id="video"
                  value={formData.video}
                  onChange={(e) => handleInputChange('video', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-4">
                <Label>Special Categories</Label>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="is_new_arrival"
                      checked={formData.is_new_arrival}
                      onCheckedChange={(checked) => handleInputChange('is_new_arrival', checked)}
                    />
                    <Label htmlFor="is_new_arrival">New Arrival</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="is_best_seller"
                      checked={formData.is_best_seller}
                      onCheckedChange={(checked) => handleInputChange('is_best_seller', checked)}
                    />
                    <Label htmlFor="is_best_seller">Best Seller</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="is_giant_betta"
                      checked={formData.is_giant_betta}
                      onCheckedChange={(checked) => handleInputChange('is_giant_betta', checked)}
                    />
                    <Label htmlFor="is_giant_betta">Giant Betta</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="is_samurai"
                      checked={formData.is_samurai}
                      onCheckedChange={(checked) => handleInputChange('is_samurai', checked)}
                    />
                    <Label htmlFor="is_samurai">Samurai</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shipping_info">Shipping Info</Label>
                <Textarea
                  id="shipping_info"
                  value={formData.shipping_info}
                  onChange={(e) => handleInputChange('shipping_info', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="acclimatization_guide">Acclimatization Guide</Label>
                <Textarea
                  id="acclimatization_guide"
                  value={formData.acclimatization_guide}
                  onChange={(e) => handleInputChange('acclimatization_guide', e.target.value)}
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? 'Adding Product...' : 'Add Product'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminAddProduct;

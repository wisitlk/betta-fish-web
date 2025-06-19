
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface ProductFormData {
  name: string;
  code: string;
  type: string;
  price: number;
  age: string;
  gender: 'Male' | 'Female';
  tail_type: 'Halfmoon' | 'Plakat' | 'Crowntail' | 'Dumbo Ear' | 'Rosetail' | 'Spade Tail';
  color: string[];
  description: string;
  shipping_info: string;
  acclimatization_guide: string;
  images: string[];
  video: string;
  is_new_arrival: boolean;
  is_best_seller: boolean;
  is_giant_betta: boolean;
  is_samurai: boolean;
  is_sold: boolean;
}

const ProductForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    code: '',
    type: '',
    price: 0,
    age: '',
    gender: 'Male',
    tail_type: 'Halfmoon',
    color: [],
    description: '',
    shipping_info: '',
    acclimatization_guide: '',
    images: [],
    video: '',
    is_new_arrival: false,
    is_best_seller: false,
    is_giant_betta: false,
    is_samurai: false,
    is_sold: false,
  });

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('fish')
        .insert([formData]);

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
          name: '',
          code: '',
          type: '',
          price: 0,
          age: '',
          gender: 'Male',
          tail_type: 'Halfmoon',
          color: [],
          description: '',
          shipping_info: '',
          acclimatization_guide: '',
          images: [],
          video: '',
          is_new_arrival: false,
          is_best_seller: false,
          is_giant_betta: false,
          is_samurai: false,
          is_sold: false,
        });
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
        <CardDescription>Add a new fish to your inventory</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Label htmlFor="code">Code</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => handleInputChange('code', e.target.value)}
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
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                required
              />
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
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(value: 'Male' | 'Female') => handleInputChange('gender', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tail_type">Tail Type</Label>
              <Select value={formData.tail_type} onValueChange={(value: any) => handleInputChange('tail_type', value)}>
                <SelectTrigger>
                  <SelectValue />
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
              <Label htmlFor="color">Colors (comma-separated)</Label>
              <Input
                id="color"
                value={formData.color.join(', ')}
                onChange={(e) => handleInputChange('color', e.target.value.split(',').map(c => c.trim()))}
                placeholder="Red, Blue, Yellow"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shipping_info">Shipping Info</Label>
            <Textarea
              id="shipping_info"
              value={formData.shipping_info}
              onChange={(e) => handleInputChange('shipping_info', e.target.value)}
              rows={2}
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

          <div className="space-y-2">
            <Label htmlFor="images">Image URLs (comma-separated)</Label>
            <Input
              id="images"
              value={formData.images.join(', ')}
              onChange={(e) => handleInputChange('images', e.target.value.split(',').map(url => url.trim()))}
              placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="video">Video URL</Label>
            <Input
              id="video"
              value={formData.video}
              onChange={(e) => handleInputChange('video', e.target.value)}
              placeholder="https://example.com/video.mp4"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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

            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_sold"
                checked={formData.is_sold}
                onCheckedChange={(checked) => handleInputChange('is_sold', checked)}
              />
              <Label htmlFor="is_sold">Sold</Label>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Adding Product...' : 'Add Product'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;

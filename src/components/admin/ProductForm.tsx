
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ProductFormData {
  code: string;
  name: string;
  type: string;
  tail_type: string;
  color: string[];
  gender: string;
  age: string;
  price: number;
  images: string[];
  video: string;
  description: string;
  is_new_arrival: boolean;
  is_best_seller: boolean;
  is_giant_betta: boolean;
  is_samurai: boolean;
  shipping_info: string;
  acclimatization_guide: string;
}

const ProductForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    code: '',
    name: '',
    type: '',
    tail_type: '',
    color: [],
    gender: '',
    age: '',
    price: 0,
    images: [],
    video: '',
    description: '',
    is_new_arrival: false,
    is_best_seller: false,
    is_giant_betta: false,
    is_samurai: false,
    shipping_info: 'Standard shipping worldwide with live arrival guarantee',
    acclimatization_guide: 'Please acclimate slowly over 30 minutes by floating the bag and gradually mixing tank water'
  });

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleColorChange = (color: string) => {
    setFormData(prev => ({
      ...prev,
      color: prev.color.includes(color) 
        ? prev.color.filter(c => c !== color)
        : [...prev.color, color]
    }));
  };

  const handleImageUrlsChange = (urls: string) => {
    const imageArray = urls.split(',').map(url => url.trim()).filter(url => url);
    setFormData(prev => ({
      ...prev,
      images: imageArray
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
          code: '',
          name: '',
          type: '',
          tail_type: '',
          color: [],
          gender: '',
          age: '',
          price: 0,
          images: [],
          video: '',
          description: '',
          is_new_arrival: false,
          is_best_seller: false,
          is_giant_betta: false,
          is_samurai: false,
          shipping_info: 'Standard shipping worldwide with live arrival guarantee',
          acclimatization_guide: 'Please acclimate slowly over 30 minutes by floating the bag and gradually mixing tank water'
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

  const colors = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Pink', 'Black', 'White', 'Multicolor'];

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
        <CardDescription>Fill in the details to add a new fish to the inventory</CardDescription>
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
              <Label htmlFor="name">Fish Name</Label>
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
                placeholder="e.g., Betta splendens"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tail_type">Tail Type</Label>
              <Select value={formData.tail_type} onValueChange={(value) => handleInputChange('tail_type', value)}>
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
              <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
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
                placeholder="e.g., 6 months"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (USD)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Colors</Label>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              {colors.map((color) => (
                <div key={color} className="flex items-center space-x-2">
                  <Checkbox
                    id={color}
                    checked={formData.color.includes(color)}
                    onCheckedChange={() => handleColorChange(color)}
                  />
                  <Label htmlFor={color} className="text-sm">{color}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="images">Image URLs (comma-separated)</Label>
            <Textarea
              id="images"
              value={formData.images.join(', ')}
              onChange={(e) => handleImageUrlsChange(e.target.value)}
              placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="video">Video URL (optional)</Label>
            <Input
              id="video"
              value={formData.video}
              onChange={(e) => handleInputChange('video', e.target.value)}
              placeholder="https://example.com/video.mp4"
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

          <div className="space-y-2">
            <Label htmlFor="shipping_info">Shipping Information</Label>
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

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Adding Product...' : 'Add Product'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;

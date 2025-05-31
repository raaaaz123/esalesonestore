import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Product, ProductVariant } from '@/app/lib/types';
import { Button } from '../common/Button';
import { Select } from '../common/Select';
import { useStore } from '@/app/lib/store';
import { Card } from '../common/Card';

interface ProductDisplayProps {
  product: Product;
}

export const ProductDisplay: React.FC<ProductDisplayProps> = ({ product }) => {
  const router = useRouter();
  const { state, setVariant, setQuantity } = useStore();
  const [selectedVariantId, setSelectedVariantId] = useState(state.selectedVariant?.id || product.variants[0].id);
  const [quantity, setLocalQuantity] = useState(state.quantity);
  
  const selectedVariant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0];
  const variantOptions = product.variants.map(variant => ({
    value: variant.id,
    label: variant.name,
  }));
  
  const quantityOptions = Array.from({ length: 10 }, (_, i) => ({
    value: String(i + 1),
    label: String(i + 1),
  }));
  
  const handleVariantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const variantId = e.target.value;
    setSelectedVariantId(variantId);
    const variant = product.variants.find(v => v.id === variantId);
    if (variant) {
      setVariant(variant);
    }
  };
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const qty = parseInt(e.target.value, 10);
    setLocalQuantity(qty);
    setQuantity(qty);
  };
  
  const handleBuyNow = () => {
    router.push('/checkout');
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        {selectedVariant.image ? (
          <Image
            src={selectedVariant.image}
            alt={product.name}
            className="object-cover object-center"
            fill
            priority
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
      </div>
      
      <div>
        <Card>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{product.name}</h1>
          <div className="mt-3">
            <p className="text-3xl font-bold text-gray-900">${selectedVariant.price.toFixed(2)}</p>
            {selectedVariant.price !== product.basePrice && (
              <p className="text-sm text-gray-500 line-through">${product.basePrice.toFixed(2)}</p>
            )}
          </div>
          
          <div className="mt-6 space-y-6">
            <p className="text-base text-gray-700">{product.description}</p>
            
            <div className="space-y-4">
              <div>
                <Select
                  label="Variant"
                  options={variantOptions}
                  value={selectedVariantId}
                  onChange={handleVariantChange}
                  fullWidth
                />
              </div>
              
              <div>
                <Select
                  label="Quantity"
                  options={quantityOptions}
                  value={String(quantity)}
                  onChange={handleQuantityChange}
                  fullWidth
                />
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                onClick={handleBuyNow} 
                fullWidth 
                size="lg"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}; 
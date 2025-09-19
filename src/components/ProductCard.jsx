import React from 'react';
import { Button } from "./ui/button";

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="border rounded-lg p-4 flex flex-col items-center text-center shadow-sm transition-all hover:shadow-md">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-bold mb-2">{product.name}</h3>
      <p className="text-muted-foreground mb-2">{product.price} EGP</p>
      <p className="text-sm text-muted-foreground/80 mb-4 h-10">
        {product.description.substring(0, 60)}...
      </p>
    
      <ul className="list-disc list-inside text-xs text-left text-muted-foreground mb-4 w-full">
        {product.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>

      <Button
        className="w-full mt-auto"
        onClick={() => onAddToCart(product)}
      >
        Add To Cart
      </Button>
    </div>
  );
}
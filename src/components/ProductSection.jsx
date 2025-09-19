import React from "react";
import ProductCard from "./ProductCard";
import { productsData } from "../data/product";

const ProductSection = React.forwardRef(({ onAddToCart }, ref) => {
  return (
    <section ref={ref} className="pt-20 pb-16 container mx-auto px-6">
      
      <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 rounded-md mb-12 text-center">
        <p className="font-medium">
          Special Offer! Use code <strong className="font-bold">SAVE10</strong> for a 10% discount on your order.
        </p>
      </div>

      <h2 className="text-4xl font-bold text-center mb-12">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg-grid-cols-3 gap-8">
        {productsData.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart} 
          />
        ))}
      </div>
    </section>
  );
});

export default ProductSection;
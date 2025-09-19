import React from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";

export default function Header({ cartCount, onCartClick, subtotal }) {
  const isFreeShippingEligible = subtotal >= 500;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      {!isFreeShippingEligible && (
        <div className="bg-primary text-primary-foreground text-center text-sm py-1 transition-all">
          Free shipping on orders above 500 EGP 🚚
        </div>
      )}

      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">My Store</h1>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Open cart"
            onClick={onCartClick}
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      </nav>
    </header>
  );
}

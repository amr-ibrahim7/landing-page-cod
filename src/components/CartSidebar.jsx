import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";

export default function CartSidebar({
  cart,
  onClose,
  onRemove,
  onUpdateQty,
  onCheckout,
  subtotal,
  discount,
  discountAmount,
  totalAfterDiscount,
  appliedCode,
  applyDiscount,
}) {
  const [discountCode, setDiscountCode] = useState("");

  const handleApplyClick = () => {
    applyDiscount(discountCode);
    setDiscountCode("");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-background w-80 sm:w-96 h-full shadow-xl p-4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <Button className="" variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4">
          {cart.length === 0 ? (
            <p className="text-muted-foreground text-center">
              Your cart is empty.
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.price} EGP x {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    className=""
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      onUpdateQty(item.id, Math.max(1, item.quantity - 1))
                    }
                  >
                    -
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    className=""
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      onUpdateQty(item.id, Math.min(5, item.quantity + 1))
                    }
                  >
                    +
                  </Button>
                  <Button
                    className=""
                    variant="destructive"
                    size="icon"
                    onClick={() => onRemove(item.id)}
                  >
                    🗑️
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="mt-4 border-t pt-4">
            <div className="flex justify-between mb-2 text-sm">
              <span>Subtotal</span>
              <span>{subtotal.toFixed(2)} EGP</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between mb-2 text-sm text-green-600">
                <span>Discount ({appliedCode})</span>
                <span>-{discountAmount.toFixed(2)} EGP</span>
              </div>
            )}

            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total</span>
              <span>{totalAfterDiscount.toFixed(2)} EGP</span>
            </div>

            <div className="flex gap-2 mb-4">
              <input
                id="discount-code-input"
                type="text"
                placeholder="Discount code"
                className="w-full border p-2 rounded-md"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <Button
                className=""
                size="default"
                variant="secondary"
                onClick={handleApplyClick}
              >
                Apply
              </Button>
            </div>

            <Button
              className="w-full"
              onClick={onCheckout}
              variant="default"
              size="lg"
            >
              Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useCart } from "./hooks/useCart";
import Header from "./components/Header";
import ProductSection from "./components/ProductSection";
import CartSidebar from "./components/CartSidebar";
import CheckoutForm from "./components/CheckoutForm";
import OrderConfirmation from "./components/OrderConfirmation";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import { useRef } from "react";

export default function App() {
  const {
    cart,
    cartCount,
    subtotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyDiscount,
    removeDiscount,
    discount,
    discountAmount,
    totalAfterDiscount,
    appliedCode,
  } = useCart();

  const [view, setView] = useState("home");

  const [order, setOrder] = useState(null);

  const productsSectionRef = useRef(null);
  const handleScrollToProducts = () => {
    productsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePlaceOrder = (customerInfo) => {
    const orderDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomNum = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    const orderId = `ORD-${orderDate}${randomNum}`;

    const shippingFee = customerInfo.shippingMethod === "express" ? 50 : 25;
    const total = subtotal + shippingFee;

    const newOrder = {
      orderId,
      items: cart,
      customerInfo,
      subtotal: totalAfterDiscount,
      shipping: shippingFee,
      total,
      orderDate: new Date().toISOString(),
    };

    console.log("Analytics: Purchase", newOrder);

    setOrder(newOrder);
    clearCart();
    setView("confirmation");
  };

  return (
    <>
      <Toaster position="bottom-center" containerStyle={{ zIndex: 9999 }} />

      <Header
        cartCount={cartCount}
        onCartClick={() => setView("cart")}
        subtotal={subtotal}
      />

      <main>
        <HeroSection onShopNowClick={handleScrollToProducts} />
        <ProductSection ref={productsSectionRef} onAddToCart={addToCart} />
      </main>

      {view === "cart" && (
        <CartSidebar
          cart={cart}
          onClose={() => setView("home")}
          onRemove={removeFromCart}
          onUpdateQty={updateQuantity}
          onCheckout={() => {
            if (cart.length > 0) {
              setView("checkout");
            } else {
              toast.error("Your cart is empty!");
            }
          }}
          // --- Props الجديدة ---
          subtotal={subtotal}
          discount={discount}
          discountAmount={discountAmount}
          totalAfterDiscount={totalAfterDiscount}
          appliedCode={appliedCode}
          applyDiscount={applyDiscount}
          removeDiscount={removeDiscount}
        />
      )}

      {view === "checkout" && (
        <CheckoutForm
          cart={cart}
          subtotal={totalAfterDiscount}
          onClose={() => setView("cart")}
          onSubmit={handlePlaceOrder}
        />
      )}

      {view === "confirmation" && order && (
        <OrderConfirmation
          order={order}
          onClose={() => {
            setView("home");
            setOrder(null);
          }}
        />
      )}
      <Footer />
    </>
  );
}

import { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-hot-toast';

export function useCart() {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });


  const [discount, setDiscount] = useState(0);
  const [appliedCode, setAppliedCode] = useState('');


  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cart]);


  const addToCart = (product) => {
    console.log("Analytics: AddToCart", { id: product.id, name: product.name });
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        if (existingItem.quantity >= 5) {
          toast.error("You can only add a maximum of 5 items.");
          return prevCart;
        }
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name} added to cart!`);
  };


  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };


  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.min(quantity, 5) } : item
      )
    );
  };
  

  const clearCart = () => {
    setCart([]);
    setDiscount(0);
    setAppliedCode('');
  };


  const applyDiscount = (code) => {
    if (code.toUpperCase() === 'SAVE10') {
      if (appliedCode) {
        toast.error("A discount code has already been applied.");
        return false;
      }
      setDiscount(0.10);
      setAppliedCode(code.toUpperCase());
      toast.success("Discount code 'SAVE10' applied!");
      return true;
    }
    toast.error("Invalid discount code.");
    return false;
  };


  const removeDiscount = () => {
      setDiscount(0);
      setAppliedCode('');
      toast.success("Discount removed.");
  };

  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    return subtotal * discount;
  }, [subtotal, discount]);
  
  const totalAfterDiscount = useMemo(() => {
    return subtotal - discountAmount;
  }, [subtotal, discountAmount]);



  return { 
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
    appliedCode
  };
}
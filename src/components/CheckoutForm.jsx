import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function CheckoutForm({ cart, subtotal, onClose, onSubmit }) {
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    phone: "",
    city: "",
    address: "",
    notes: "",
    shippingMethod: "standard",
  });

  const isFreeShippingEligible = subtotal >= 500;
  -useEffect(() => {
    if (isFreeShippingEligible) {
      setCustomerInfo((prev) => ({ ...prev, shippingMethod: "standard" }));
    }
  }, [isFreeShippingEligible]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (customerInfo.fullName.length < 3) {
      toast.error("Full name must be at least 3 characters.");
      return;
    }
    if (!/^\d{10,15}$/.test(customerInfo.phone)) {
      toast.error("Please enter a valid phone number (10-15 digits).");
      return;
    }
    if (!customerInfo.city || !customerInfo.address) {
      toast.error("Please fill in all required fields.");
      return;
    }

    onSubmit(customerInfo);
  };

  const calculateShipping = () => {
    if (isFreeShippingEligible) {
      return customerInfo.shippingMethod === "express" ? 50 : 0;
    }

    return customerInfo.shippingMethod === "express" ? 50 : 25;
  };

  const shippingCost = calculateShipping();
  const total = subtotal + shippingCost;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Checkout - Cash on Delivery
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close checkout"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 p-6">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Shipping Information
            </h3>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={customerInfo.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="01xxxxxxxxx"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  City/Region *
                </label>
                <select
                  id="city"
                  name="city"
                  value={customerInfo.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                >
                  <option value="">Select City</option>
                  <option value="cairo">Cairo</option>
                  <option value="alexandria">Alexandria</option>
                  <option value="giza">Giza</option>
                  <option value="mansoura">Mansoura</option>
                  <option value="aswan">Aswan</option>
                  <option value="luxor">Luxor</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Address *
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Enter your complete address"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={customerInfo.notes}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Any special instructions or notes"
                />
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Shipping Method *
                </h4>
                {isFreeShippingEligible && (
                  <div className="bg-green-50 border border-green-200 text-green-800 p-3 rounded-lg mb-3 text-sm">
                    🎉 Congratulations! You've earned free standard shipping.
                  </div>
                )}
                <div className="space-y-3">
                  <label
                    className={`flex items-center p-3 border rounded-lg transition-colors ${
                      isFreeShippingEligible
                        ? "bg-gray-100 border-gray-200 cursor-not-allowed opacity-70"
                        : "border-gray-300 hover:bg-gray-50 cursor-pointer"
                    }`}
                  >
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="standard"
                      checked={customerInfo.shippingMethod === "standard"}
                      onChange={handleInputChange}
                      disabled={isFreeShippingEligible}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        Standard Shipping (3-5 days)
                      </div>
                      <div
                        className={`text-sm ${
                          isFreeShippingEligible
                            ? "text-green-600 font-bold"
                            : "text-gray-500"
                        }`}
                      >
                        {isFreeShippingEligible ? "FREE" : "EGP 25"}
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="express"
                      checked={customerInfo.shippingMethod === "express"}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        Express Shipping (1-2 days)
                      </div>
                      <div className="text-sm text-gray-500">EGP 50</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Order Summary
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        {item.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Qty: {item.quantity} × EGP {item.price.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      EGP {(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              <hr className="border-gray-200" />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">
                    EGP {subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">
                    EGP {shippingCost.toFixed(2)}
                  </span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-base font-semibold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">EGP {total.toFixed(2)}</span>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-green-800">
                    Cash on Delivery (COD)
                  </span>
                </div>
                <p className="text-xs text-green-700 mt-1">
                  Pay when you receive your order
                </p>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Place Order (COD) - EGP {total.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

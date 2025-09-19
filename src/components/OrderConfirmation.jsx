import React from "react";

export default function OrderConfirmation({ order, onClose }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="text-center p-8 border-b border-gray-200">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            Order Confirmed!
          </h2>
          <p className="text-gray-600">
            Thank you for your order. We'll contact you within 24 hours to
            confirm delivery details.
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">
              Order Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Order ID:</span>
                <span className="font-mono font-semibold ml-2 text-gray-900">
                  {order.orderId}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Order Date:</span>
                <span className="ml-2 text-gray-900">
                  {formatDate(order.orderDate)}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Payment Method:</span>
                <span className="ml-2 text-gray-900">Cash on Delivery</span>
              </div>
              <div>
                <span className="text-gray-600">Shipping:</span>
                <span className="ml-2 text-gray-900 capitalize">
                  {order.customerInfo.shippingMethod}(
                  {order.customerInfo.shippingMethod === "express"
                    ? "1-2 days"
                    : "3-5 days"}
                  )
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">
              Delivery Information
            </h3>
            <div className="text-sm space-y-2">
              <div>
                <span className="text-gray-600">Customer:</span>
                <span className="ml-2 text-gray-900 font-medium">
                  {order.customerInfo.fullName}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Phone:</span>
                <span className="ml-2 text-gray-900 font-mono">
                  {order.customerInfo.phone}
                </span>
              </div>
              <div>
                <span className="text-gray-600">City:</span>
                <span className="ml-2 text-gray-900 capitalize">
                  {order.customerInfo.city}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Address:</span>
                <span className="ml-2 text-gray-900">
                  {order.customerInfo.address}
                </span>
              </div>
              {order.customerInfo.notes && (
                <div>
                  <span className="text-gray-600">Notes:</span>
                  <span className="ml-2 text-gray-900">
                    {order.customerInfo.notes}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      Quantity: {item.quantity} × EGP {item.price}
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-gray-900">
                    EGP {item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">EGP {order.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Shipping ({order.customerInfo.shippingMethod})
                </span>
                <span className="text-gray-900">EGP {order.shipping}</span>
              </div>
              <hr className="border-gray-300" />
              <div className="flex justify-between text-base font-semibold">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">EGP {order.total}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">
              What happens next?
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• We'll call you within 24 hours to confirm your order</li>
              <li>• Your order will be prepared and shipped</li>
              <li>• You'll receive a call when the delivery is on the way</li>
              <li>• Pay cash when you receive your order</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Print Order
            </button>
          </div>

          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Need help? Contact us at{" "}
              <a
                href="tel:+201234567890"
                className="text-blue-600 hover:underline"
              >
                +20 1029696632
              </a>{" "}
              or{" "}
              <a
                href="mailto:support@techstore.com"
                className="text-blue-600 hover:underline"
              >
                amr@techstore.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

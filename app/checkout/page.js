"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { PaymentMethodIcon } from "../components/PaymentMethodIcons";

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart, saveOrderTimestamp } = useCart();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment
  const [orderComplete, setOrderComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const [billingAddress, setBillingAddress] = useState("same");
  const [showUpsellModal, setShowUpsellModal] = useState(false);
  const [upsellProduct, setUpsellProduct] = useState(null);
  const [upsellSize, setUpsellSize] = useState(null);
  const [upsellPrice, setUpsellPrice] = useState(null);
  const [upsellSuccess, setUpsellSuccess] = useState(false);
  const [upsellPaymentMethod, setUpsellPaymentMethod] = useState("card");
  const [errors, setErrors] = useState({});

  // Constants
  const FREE_SHIPPING_THRESHOLD = 50;
  const STANDARD_SHIPPING_COST = 5.99;
  const shippingCost = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
  const total = cartTotal + shippingCost;

  // Payment method components
  const PaymentMethodTabIcon = ({ methodId, style }) => (
    <PaymentMethodIcon method={methodId} className="w-5 h-5" style={style} />
  );

  // Update form fields
  const handleShippingChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handlePaymentChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "cardNumber") {
      value = value
        .replace(/\D/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
      value = value.slice(0, 19);
    } else if (e.target.name === "expiry") {
      value = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .slice(0, 5);
    } else if (e.target.name === "cvv") {
      value = value.replace(/\D/g, "").slice(0, 4);
    }
    setPaymentInfo({ ...paymentInfo, [e.target.name]: value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  // Validate shipping
  const validateShipping = () => {
    const newErrors = {};
    if (!shippingInfo.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!shippingInfo.lastName.trim())
      newErrors.lastName = "Last name is required";
    if (!shippingInfo.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(shippingInfo.email))
      newErrors.email = "Invalid email";
    if (!shippingInfo.phone.trim()) newErrors.phone = "Phone is required";
    if (!shippingInfo.address.trim()) newErrors.address = "Address is required";
    if (!shippingInfo.city.trim()) newErrors.city = "City is required";
    if (!shippingInfo.state.trim()) newErrors.state = "State is required";
    if (!shippingInfo.zipCode.trim())
      newErrors.zipCode = "ZIP code is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate payment
  const validatePayment = () => {
    if (paymentMethod !== "card") return true;
    const newErrors = {};
    const cardNum = paymentInfo.cardNumber.replace(/\s/g, "");
    if (!cardNum) newErrors.cardNumber = "Card number is required";
    else if (cardNum.length < 15) newErrors.cardNumber = "Invalid card number";
    if (!paymentInfo.cardName.trim())
      newErrors.cardName = "Name on card is required";
    if (!paymentInfo.expiry) newErrors.expiry = "Expiry is required";
    if (!paymentInfo.cvv) newErrors.cvv = "CVV is required";
    else if (paymentInfo.cvv.length < 3) newErrors.cvv = "Invalid CVV";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Continue to payment
  const handleContinue = () => {
    if (validateShipping()) {
      setStep(2);
      window.scrollTo(0, 0);
    }
  };

  // Place order
  const handlePlaceOrder = () => {
    if (!validatePayment()) return;
    setIsProcessing(true);

    localStorage.setItem("lastShippingInfo", JSON.stringify(shippingInfo));
    localStorage.setItem(
      "lastPaymentInfo",
      JSON.stringify({
        cardNumber: paymentInfo.cardNumber.replace(/\s/g, "").slice(-4),
        cardName: paymentInfo.cardName,
        expiry: paymentInfo.expiry,
      }),
    );

    const orderItems = cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.image,
      size: item.size,
      price: item.price,
      quantity: item.quantity,
    }));

    setTimeout(() => {
      setOrderComplete(true);
      saveOrderTimestamp(cartTotal, orderItems);
      clearCart();
      setIsProcessing(false);
    }, 2000);
  };

  const handleUpsellPurchase = (product, size, price) => {
    setUpsellProduct(product);
    setUpsellSize(size);
    setUpsellPrice(price);
    setShowUpsellModal(true);
  };

  const confirmUpsellPayment = () => {
    if (upsellPaymentMethod === "card" && !validatePayment()) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowUpsellModal(false);
      setUpsellSuccess(true);
    }, 1500);
  };

  // Upsell modal + success states (kept mostly as-is from original)

  if (showUpsellModal && orderComplete) {
    const savedShipping = JSON.parse(
      localStorage.getItem("lastShippingInfo") || "{}",
    );

    return (
      <main className='pt-16 md:pt-20 min-h-screen bg-gray-50'>
        <div className='container-custom py-20'>
          <div className='max-w-lg mx-auto bg-white rounded-2xl p-8 text-center shadow-sm'>
            <h2 className='text-2xl font-bold mb-2'>Complete Your Order</h2>
            <p className='text-gray-500 mb-4'>
              You're ordering: {upsellProduct?.name} - $
              {upsellPrice?.toFixed(2)}
            </p>

            <div className='p-4 bg-green-50 rounded-xl mb-6 text-left'>
              <p className='text-sm font-medium text-green-700'>Shipping to:</p>
              <p className='text-gray-600 text-sm'>
                {savedShipping.firstName || "N/A"}{" "}
                {savedShipping.lastName || ""}
                <br />
                {savedShipping.address || "N/A"}
                <br />
                {savedShipping.city || "N/A"}, {savedShipping.state || ""}{" "}
                {savedShipping.zipCode || ""}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-6">
              {[
                { id: "card", label: "Credit Card", color: "#1A1F71" },
                { id: "paypal", label: "PayPal", color: "#003087" },
                { id: "apple", label: "Apple Pay", color: "#000000" },
                { id: "google", label: "Google Pay", color: "#4285F4" },
              ].map((method) => {
                const isActive = upsellPaymentMethod === method.id;
                return (
                  <button
                    key={method.id}
                    onClick={() => setUpsellPaymentMethod(method.id)}
                    className="flex-1 py-3 px-2 rounded-xl border-2 flex items-center justify-center transition-all text-xs font-bold"
                    style={{
                      borderColor: isActive ? method.color : "#e5e7eb",
                      backgroundColor: isActive ? method.color + "1a" : "transparent",
                      color: isActive ? method.color : "#374151",
                    }}
                  >
                    {method.label}
                  </button>
                );
              })}
            </div>

            <button
              onClick={confirmUpsellPayment}
              disabled={isProcessing}
              className={`w-full btn-primary py-3 text-lg mt-6 ${
                isProcessing ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isProcessing
                ? "Processing..."
                : `Pay $${upsellPrice?.toFixed(2)}`}
            </button>

            <button
              onClick={() => {
                setShowUpsellModal(false);
                setUpsellSuccess(false);
              }}
              className='w-full btn-secondary py-3 mt-3'
            >
              Cancel
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (upsellSuccess && orderComplete) {
    return (
      <main className='pt-16 md:pt-20 min-h-screen bg-gradient-to-b from-green-50 to-white'>
        <div className='container-custom py-20'>
          <div className='max-w-lg mx-auto bg-white rounded-3xl p-10 text-center shadow-lg border-2 border-green-100'>
            <div className='relative'>
              <div className='w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce'>
                <svg
                  className='w-12 h-12 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={3}
                    d='M5 13l4 4L19 7'
                  />
                </svg>
              </div>
              <div className='absolute top-0 left-1/2 -translate-x-1/2 -mt-2 text-2xl'>
                ⭐
              </div>
            </div>

            <h2 className='text-3xl font-bold mb-3 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent'>
              Thank You!
            </h2>
            <p className='text-gray-600 text-lg mb-2'>You're all set!</p>

            <div className='p-4 bg-green-50 rounded-xl mb-6'>
              <p className='text-green-700 font-semibold'>
                {upsellProduct?.name}
              </p>
              <p className='text-green-600'>${upsellPrice?.toFixed(2)}</p>
            </div>

            <p className='text-gray-500 text-sm mb-8'>
              Your order has been added to your original purchase. Confirmation
              email on its way!
            </p>

            <div className='flex flex-col gap-3'>
              <Link
                href='/'
                className='w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-md'
              >
                Continue Shopping
              </Link>
              <Link
                href='/products'
                className='w-full bg-gray-100 text-gray-700 font-semibold py-4 px-6 rounded-xl hover:bg-gray-200 transition-all'
              >
                Browse More Juices
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (cartItems.length === 0 && !orderComplete) {
    return (
      <main className='pt-16 md:pt-20 min-h-screen bg-gray-50'>
        <div className='container-custom py-20 text-center'>
          <h1 className='text-3xl font-bold mb-4'>Your Cart is Empty</h1>
          <p className='text-gray-600 mb-8'>
            Add some juices to your cart first.
          </p>
          <Link
            href='/products'
            className='btn-primary inline-flex items-center gap-2'
          >
            Shop Now
          </Link>
        </div>
      </main>
    );
  }

  if (orderComplete) {
    return (
      <main className='pt-16 md:pt-20 min-h-screen bg-gray-50'>
        <div className='container-custom py-20'>
          <div className='max-w-lg mx-auto bg-white rounded-2xl p-8 text-center shadow-sm'>
            <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6'>
              <svg
                className='w-10 h-10 text-green-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M5 13l4 4L19 7'
                />
              </svg>
            </div>
            <h1 className='text-3xl font-bold mb-4'>Order Confirmed!</h1>
            <p className='text-gray-600 mb-2'>Thank you for your order!</p>
            <p className='text-gray-500 text-sm mb-8'>
              Order #COLD
              {Math.floor(Math.random() * 1000000)
                .toString()
                .padStart(6, "0")}{" "}
              has been placed successfully.
              <br />A confirmation email will be sent to {shippingInfo.email}
            </p>

            <div className='mt-8 p-6 bg-green-50 rounded-xl'>
              <p className='font-bold mb-2 text-primary'>
                Special Offer 15%OFF - Save 15%!
              </p>
              <div className='flex items-center gap-4 mb-3'>
                <div className='w-16 h-16 relative bg-white rounded-lg overflow-hidden flex-shrink-0'>
                  <Image
                    src='/green-vitality.jpg'
                    alt='Green Vitality'
                    fill
                    className='object-cover'
                    sizes='64px'
                  />
                </div>
                <div className='text-left'>
                  <h3 className='font-semibold'>Green Vitality</h3>
                  <p className='text-sm text-gray-500'>Detox & Glow · 500ml</p>
                  <div className='flex items-center gap-2'>
                    <span className='text-gray-400 line-through text-sm'>
                      $12.99
                    </span>
                    <span className='text-green-600 font-bold'>$11.04</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() =>
                  handleUpsellPurchase(
                    {
                      id: 1,
                      name: "Green Vitality",
                      image: "/green-vitality.jpg",
                    },
                    { name: "500ml", price: 11.04 },
                    11.04,
                  )
                }
                className='w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-xl hover:bg-green-700 transition-colors text-sm'
              >
                Claim Offer - $11.04
              </button>
            </div>

            <Link href='/' className='btn-primary inline-flex mt-4'>
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className='pt-[64px] md:pt-[72px] min-h-screen bg-gray-50'>
      <div className='container-custom py-12'>
        <h1 className='text-3xl md:text-4xl font-bold mb-8'>Checkout</h1>

        <div className='flex items-center justify-center mb-12'>
          {[
            { num: 1, label: "Shipping" },
            { num: 2, label: "Payment" },
          ].map((s, i) => (
            <div key={s.num} className='flex items-center'>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= s.num
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step > s.num ? (
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                ) : (
                  s.num
                )}
              </div>
              <span
                className={`ml-2 hidden sm:inline ${
                  step >= s.num ? "text-primary font-medium" : "text-gray-500"
                }`}
              >
                {s.label}
              </span>
              {i < 1 && (
                <div
                  className={`w-16 h-1 mx-4 rounded ${
                    step > s.num ? "bg-primary" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className='grid lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2'>
            {step === 1 && (
              <div className='bg-white rounded-2xl p-6 shadow-sm'>
                <h2 className='text-xl font-bold mb-6'>Shipping Information</h2>
                <div className='grid md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium mb-2'>
                      First Name *
                    </label>
                    <input
                      type='text'
                      name='firstName'
                      value={shippingInfo.firstName}
                      onChange={handleShippingChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.firstName ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    {errors.firstName && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-2'>
                      Last Name *
                    </label>
                    <input
                      type='text'
                      name='lastName'
                      value={shippingInfo.lastName}
                      onChange={handleShippingChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.lastName ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    {errors.lastName && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-2'>
                      Email *
                    </label>
                    <input
                      type='email'
                      name='email'
                      value={shippingInfo.email}
                      onChange={handleShippingChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.email ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    {errors.email && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-2'>
                      Phone *
                    </label>
                    <input
                      type='tel'
                      name='phone'
                      value={shippingInfo.phone}
                      onChange={handleShippingChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.phone ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    {errors.phone && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <div className='md:col-span-2'>
                    <label className='block text-sm font-medium mb-2'>
                      Address *
                    </label>
                    <input
                      type='text'
                      name='address'
                      value={shippingInfo.address}
                      onChange={handleShippingChange}
                      placeholder='Street address'
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.address ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    {errors.address && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.address}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-2'>
                      City *
                    </label>
                    <input
                      type='text'
                      name='city'
                      value={shippingInfo.city}
                      onChange={handleShippingChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.city ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    {errors.city && (
                      <p className='text-red-500 text-sm mt-1'>{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-2'>
                      State *
                    </label>
                    <input
                      type='text'
                      name='state'
                      value={shippingInfo.state}
                      onChange={handleShippingChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.state ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    {errors.state && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.state}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-2'>
                      ZIP Code *
                    </label>
                    <input
                      type='text'
                      name='zipCode'
                      value={shippingInfo.zipCode}
                      onChange={handleShippingChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.zipCode ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    {errors.zipCode && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.zipCode}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-2'>
                      Country
                    </label>
                    <select
                      name='country'
                      value={shippingInfo.country}
                      onChange={handleShippingChange}
                      className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary'
                    >
                      <option value='United States'>United States</option>
                      <option value='Canada'>Canada</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={handleContinue}
                  className='w-full btn-primary py-4 text-lg mt-6'
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {step === 2 && (
              <div className='bg-white rounded-2xl p-6 shadow-sm'>
                <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3 mb-6">
                  {[
                    { id: "card", label: "Credit Card", color: "#1A1F71" },
                    { id: "paypal", label: "PayPal", color: "#003087" },
                    { id: "apple", label: "Apple Pay", color: "#000000" },
                    { id: "google", label: "Google Pay", color: "#4285F4" },
                  ].map((method) => {
                    const isActive = paymentMethod === method.id;
                    const activeColor = method.color;

                    return (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className="flex-1 py-3 sm:py-4 px-2 sm:px-4 rounded-xl border-2 flex items-center justify-center transition-all font-bold gap-1 sm:gap-2"
                        style={{
                          borderColor: isActive ? activeColor : "#e5e7eb",
                          backgroundColor: isActive ? activeColor + "10" : "transparent",
                          color: isActive ? activeColor : "#374151",
                        }}
                      >
                        <PaymentMethodTabIcon methodId={method.id} style={{ color: isActive ? activeColor : "#6b7280" }} />
                        <span className="text-xs sm:text-sm">{method.label}</span>
                      </button>
                    );
                  })}
                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-4 p-4 bg-gradient-to-br from-[#1A1F71]/5 to-[#1A1F71]/10 rounded-xl border border-[#1A1F71]/20">
                    <div className="flex items-center gap-2 mb-2">
                      <PaymentMethodIcon method="card" className="w-5 h-5" style={{ color: "#1A1F71" }} />
                      <span className="font-semibold" style={{ color: "#1A1F71" }}>
                        Credit Card Details
                      </span>
                    </div>
                    <div>
                      <label className='block text-sm font-medium mb-2'>
                        Card Number *
                      </label>
                      <input
                        type='text'
                        name='cardNumber'
                        value={paymentInfo.cardNumber}
                        onChange={handlePaymentChange}
                        placeholder='1234 5678 9012 3456'
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.cardNumber
                            ? "border-red-500"
                            : "border-gray-200"
                        }`}
                      />
                      {errors.cardNumber && (
                        <p className='text-red-500 text-sm mt-1'>
                          {errors.cardNumber}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className='block text-sm font-medium mb-2'>
                        Name on Card *
                      </label>
                      <input
                        type='text'
                        name='cardName'
                        value={paymentInfo.cardName}
                        onChange={handlePaymentChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.cardName ? "border-red-500" : "border-gray-200"
                        }`}
                        placeholder='John Doe'
                      />
                      {errors.cardName && (
                        <p className='text-red-500 text-sm mt-1'>
                          {errors.cardName}
                        </p>
                      )}
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-sm font-medium mb-2'>
                          Expiry Date *
                        </label>
                        <input
                          type='text'
                          name='expiry'
                          value={paymentInfo.expiry}
                          onChange={handlePaymentChange}
                          placeholder='MM/YY'
                          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary ${
                            errors.expiry ? "border-red-500" : "border-gray-200"
                          }`}
                        />
                        {errors.expiry && (
                          <p className='text-red-500 text-sm mt-1'>
                            {errors.expiry}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className='block text-sm font-medium mb-2'>
                          CVV *
                        </label>
                        <input
                          type='text'
                          name='cvv'
                          value={paymentInfo.cvv}
                          onChange={handlePaymentChange}
                          placeholder='123'
                          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary ${
                            errors.cvv ? "border-red-500" : "border-gray-200"
                          }`}
                        />
                        {errors.cvv && (
                          <p className='text-red-500 text-sm mt-1'>
                            {errors.cvv}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className='mt-4'>
                      <label className='block text-sm font-medium mb-2'>
                        Billing Address
                      </label>
                      <div className='flex gap-4'>
                        <label className='flex items-center gap-2 cursor-pointer'>
                          <input
                            type='radio'
                            name='billing'
                            checked={billingAddress === "same"}
                            onChange={() => setBillingAddress("same")}
                            className='w-4 h-4 text-primary'
                          />
                          <span className='text-sm'>Same as shipping</span>
                        </label>
                        <label className='flex items-center gap-2 cursor-pointer'>
                          <input
                            type='radio'
                            name='billing'
                            checked={billingAddress === "different"}
                            onChange={() => setBillingAddress("different")}
                            className='w-4 h-4 text-primary'
                          />
                          <span className='text-sm'>Different address</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "paypal" && (
                  <div className="py-8 bg-gradient-to-br from-[#003087]/5 to-[#003087]/10 rounded-xl border border-[#003087]/20">
                    <div className="flex flex-col items-center">
                      <PaymentMethodIcon method="paypal" className="w-12 h-12 mb-3" style={{ color: "#003087" }} />
                      <p
                        className="text-2xl font-bold mb-2"
                        style={{ color: "#003087" }}
                      >
                        PayPal
                      </p>
                      <p className="text-gray-600 mb-4 text-center px-4">
                        You will be redirected to PayPal to complete your payment securely.
                      </p>
                      <div className="flex items-center gap-2 text-sm text-[#003087]/70">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Buyer Protection</span>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "apple" && (
                  <div className="py-8 bg-gradient-to-br from-black/5 to-black/10 rounded-xl border border-black/10">
                    <div className="flex flex-col items-center">
                      <PaymentMethodIcon method="apple" className="w-12 h-12 mb-3" />
                      <p
                        className="text-2xl font-bold mb-2"
                      >
                        Apple Pay
                      </p>
                      <p className="text-gray-600 mb-4 text-center px-4">
                        Pay securely with Touch ID or Face ID.
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Secure Authentication</span>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "google" && (
                  <div className="py-8 bg-gradient-to-br from-[#4285F4]/5 to-[#4285F4]/10 rounded-xl border border-[#4285F4]/20">
                    <div className="flex flex-col items-center">
                      <PaymentMethodIcon method="google" className="w-12 h-12 mb-3" style={{ color: "#4285F4" }} />
                      <p
                        className="text-2xl font-bold mb-2"
                        style={{ color: "#4285F4" }}
                      >
                        Google Pay
                      </p>
                      <p className="text-gray-600 mb-4 text-center px-4">
                        Pay instantly with your saved cards.
                      </p>
                      <div className="flex items-center gap-2 text-sm text-[#4285F4]/70">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Fast & Secure</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className='flex items-center gap-3 mt-6 p-4 bg-gray-50 rounded-xl'>
                  <svg
                    className='w-5 h-5 text-green-600'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <span className='text-sm text-gray-600'>
                    Your payment info is secure and encrypted
                  </span>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className={`w-full btn-primary py-4 text-lg mt-6 ${
                    isProcessing ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isProcessing
                    ? "Processing Order..."
                    : `Place Order - $${total.toFixed(2)}`}
                </button>

                <button
                  onClick={() => setStep(1)}
                  className='w-full btn-secondary py-4 text-lg mt-3'
                >
                  Back to Shipping
                </button>
              </div>
            )}
          </div>

          <div className='lg:col-span-1'>
            <div className='bg-white p-6 rounded-2xl shadow-sm sticky top-24'>
              <h2 className='text-xl font-bold mb-6'>Order Summary</h2>
              <div className='space-y-4 max-h-80 overflow-y-auto'>
                {cartItems.map((item, index) => (
                  <div key={index} className='flex gap-3'>
                    <div className='w-16 h-16 relative bg-gray-100 rounded-lg overflow-hidden flex-shrink-0'>
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className='object-cover'
                          sizes='64px'
                        />
                      )}
                    </div>
                    <div className='flex-1'>
                      <h3 className='font-medium text-sm'>{item.name}</h3>
                      <p className='text-gray-500 text-xs'>
                        {item.size} x {item.quantity}
                      </p>
                      <p className='font-semibold text-sm'>
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className='border-t border-gray-100 mt-4 pt-4 space-y-3'>
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-600'>Subtotal</span>
                  <span className='text-primary'>${cartTotal.toFixed(2)}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-600'>Shipping</span>
                  <span className={shippingCost === 0 ? "text-green-600" : ""}>
                    {shippingCost === 0
                      ? "FREE"
                      : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                {shippingCost > 0 && (
                  <p className='text-xs text-green-600'>
                    Free shipping on orders $50+
                  </p>
                )}
                <div className='flex justify-between font-bold text-lg pt-3 border-t'>
                  <span>Total</span>
                  <span className='text-primary'>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

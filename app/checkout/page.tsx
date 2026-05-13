'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// ─── Plan options ────────────────────────────────────────────────────────────
const PLANS = [
  {
    id: 'basic',
    name: 'Basic Listing',
    price: 99,
    currency: 'DKK',
    description: '30 days · Standard visibility',
    features: ['Listed in search results', 'Contact form', 'Up to 5 photos'],
  },
  {
    id: 'featured',
    name: 'Featured Listing',
    price: 249,
    currency: 'DKK',
    description: '60 days · Top placement',
    features: ['Everything in Basic', 'Featured badge', 'Priority placement', 'Up to 20 photos'],
    popular: true,
  },
];

// ─── Payment form (inner) ─────────────────────────────────────────────────────
function CheckoutForm({ amount, planName }: { amount: number; planName: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!stripe || !elements) return;

    setLoading(true);
    setError('');

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message ?? 'Something went wrong.');
      setLoading(false);
      return;
    }

    const res = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, currency: 'dkk' }),
    });

    const { clientSecret, error: apiError } = await res.json();
    if (apiError) {
      setError(apiError);
      setLoading(false);
      return;
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
      redirect: 'if_required',
    });

    if (confirmError) {
      setError(confirmError.message ?? 'Payment failed.');
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center space-y-4 py-8">
        <div className="text-5xl">🎉</div>
        <h2 className="text-[24px] font-bold text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Payment Successful!
        </h2>
        <p className="text-[#45464d]">Your <strong>{planName}</strong> listing is now active.</p>
        <Link
          href="/browse"
          className="inline-block mt-4 bg-black text-white text-[12px] font-bold uppercase tracking-widest px-8 py-3 rounded-lg hover:opacity-90 transition-all"
        >
          Browse Listings
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PaymentElement />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-[14px] px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!stripe || loading}
        className="w-full bg-black text-white text-[12px] font-bold uppercase tracking-widest py-3 rounded-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing…' : `Pay ${amount} DKK`}
      </button>

      <p className="text-center text-[12px] text-[#76777d]">
        🔒 Secured by Stripe · SSL encrypted
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const [selectedPlan, setSelectedPlan] = useState(PLANS[1]); // default: Featured
  const [clientSecret, setClientSecret] = useState('');
  const [loadingSecret, setLoadingSecret] = useState(false);

  // Fetch a payment intent whenever the plan changes
  useEffect(() => {
    setLoadingSecret(true);
    setClientSecret('');
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: selectedPlan.price, currency: 'dkk' }),
    })
      .then((r) => r.json())
      .then(({ clientSecret }) => {
        setClientSecret(clientSecret);
        setLoadingSecret(false);
      })
      .catch(() => setLoadingSecret(false));
  }, [selectedPlan]);

  return (
    <main className="min-h-screen bg-[#f6f3f5] py-16 px-4" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-[900px] mx-auto space-y-10">

        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="text-black font-black text-[24px]" style={{ fontFamily: 'Manrope, sans-serif' }}>
            NordicMarket
          </Link>
          <h1 className="text-[32px] font-bold text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Choose your listing plan
          </h1>
          <p className="text-[#45464d]">Reach thousands of buyers and investors across Scandinavia.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">

          {/* Left: Plan selector */}
          <div className="space-y-4">
            {PLANS.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan)}
                className={`w-full text-left p-6 rounded-xl border-2 transition-all bg-white relative ${
                  selectedPlan.id === plan.id
                    ? 'border-black shadow-md'
                    : 'border-[#eae7e9] hover:border-[#c6c6cd]'
                }`}
              >
                {plan.popular && (
                  <span className="absolute top-4 right-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    Popular
                  </span>
                )}
                <div className="space-y-1 mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[28px] font-black text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {plan.price}
                    </span>
                    <span className="text-[14px] text-[#45464d] font-medium">{plan.currency}</span>
                  </div>
                  <p className="font-bold text-black text-[16px]">{plan.name}</p>
                  <p className="text-[13px] text-[#76777d]">{plan.description}</p>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[13px] text-[#45464d]">
                      <span className="text-emerald-500 font-bold">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>

          {/* Right: Payment form */}
          <div className="bg-white rounded-xl border-2 border-[#eae7e9] p-8 space-y-6">
            <div>
              <h2 className="font-bold text-[18px] text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Payment details
              </h2>
              <p className="text-[13px] text-[#76777d] mt-1">
                {selectedPlan.name} · {selectedPlan.price} DKK
              </p>
            </div>

            {loadingSecret || !clientSecret ? (
              <div className="h-40 flex items-center justify-center text-[#76777d] text-[14px]">
                Loading payment form…
              </div>
            ) : (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: {
                    theme: 'stripe',
                    variables: {
                      colorPrimary: '#000000',
                      borderRadius: '8px',
                      fontFamily: 'Inter, sans-serif',
                    },
                  },
                }}
              >
                <CheckoutForm amount={selectedPlan.price} planName={selectedPlan.name} />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
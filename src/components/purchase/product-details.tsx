'use client';

import PayPalCheckout from '../paypal-checkout';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Spinner } from '../spinner';
import { getMcDataFromCookie } from '@/utils/cooki-manager';
import { formatMoney } from '@/utils/formatter';

export default function ProductDetails({ product }: { product: any }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [minecraftUsername, setMinecraftUsername] = useState('');
  const [customAmount, setCustomAmount] = useState('1.00');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error' | 'validating'>('validating');
  const [error, setError] = useState<string | null>(null);

  const handlePaymentSuccess = async (viewToken: string) => {
    setPaymentStatus('validating');
    const response = await fetch('/api/validate-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ viewToken }),
    });
    if (!response.ok) {
      // check if the response is 422
      if (response.status === 422) {
        const data = await response.json();
        if (data.result && data.result.errorMessages) {
          setPaymentStatus('error');
          setError(data.result.errorMessages?.join('. '));
          return;
        }
        setPaymentStatus('error');
        setError('There was an error validating your payment. Please try again.');
        return;
      }
      console.error('Error validating payment:', response);
      setPaymentStatus('error');
      setError('There was an error validating your payment. Please try again.');
      return;
    }
    const data = await response.json();
    if (!data || !data.success) {
      setPaymentStatus('error');
      setError('There was an error validating your payment. Please try again.');
      return;
    }
    setPaymentStatus('success');
  };

  const handlePaymentError = (error: any) => {
    console.error('Payment error:', error);
    setPaymentStatus('error');
    setError('There was an error processing your payment. Please try again.');
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow valid decimal numbers and enforce minimum amount
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setCustomAmount(value);

      // Show error if less than $1, but still allow typing
      if (parseFloat(value) < 1) {
        setError('Minimum donation amount is $1.00');
      } else {
        setError(null);
      }
    }
  };

  useEffect(() => {
    // Check if user is logged in
    const mcData = getMcDataFromCookie();
    if (mcData) {
      setIsLoggedIn(true);
      setMinecraftUsername(mcData.username);
    }
    setPaymentStatus('idle');
  }, []);

  if (!product) {
    return (
      <main className="container mx-auto py-12 px-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold mb-6 bg-clip-text text-[var(--accent)]">Package Not Found</h1>
          <div className="card max-w-md w-full mb-8 text-center">
            <p className="text-xl mb-8">{error || "The package you're looking for doesn't exist."}</p>
            <Link href="/store" className="btn">
              Back to Store
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!isLoggedIn) {
    return (
      <main className="container mx-auto py-12 px-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold mb-6 bg-clip-text text-[var(--accent)]">Login Required</h1>
          <div className="card max-w-md w-full mb-8">
            <p className="text-xl mb-8">Please log in with your Minecraft username before making a purchase.</p>
            <p className="text-md mb-4 text-gray-400">
              This helps us know which Minecraft account to apply benefits to.
            </p>
            <Link href="/store" className="btn">
              Back to Store
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (paymentStatus === 'validating') {
    return (
      <main className="container mx-auto py-12 px-4">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-6 bg-clip-text text-[var(--accent)]">Validating</h1>
          <div className="card max-w-md w-full mb-8">
            <h2 className="text-2xl font-bold mb-4 text-center"> Please wait... </h2>
            <div className="flex justify-center mt-4">
              <Spinner size="w-15 h-15" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (paymentStatus === 'success') {
    return (
      <main className="container mx-auto py-12 px-4">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-6 text-[var(--primary)]">Thank You for Your Donation!</h1>
          <div className="card max-w-md w-full mb-8">
            <div className="mx-auto text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-center">Payment Successful</h2>
            <p className="mb-4 text-center">
              Your {product.name} has been processed successfully. If the package includes in-game perks, they will be
              applied to your account within the next few minutes. Use the command <code>/claimrewards</code> in-game to
              claim it.
            </p>
            <div className="p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span>Package:</span>
                <span className="font-bold">{product.name}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span>Amount:</span>
                <span className="font-bold">{formatMoney(product.customPrice ? customAmount : product.price)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Minecraft Username:</span>
                <span className="font-bold">{minecraftUsername}</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 text-center">
              If you have any questions, please contact us on our Discord server.
            </p>
          </div>
          <Link className="btn" href="/store">
            Back to Store
          </Link>
        </div>
      </main>
    );
  }

  if (paymentStatus === 'error') {
    return (
      <main className="container mx-auto py-12 px-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold mb-6 bg-clip-text text-[var(--danger)]">Payment Error</h1>
          <div className="card max-w-md w-full mb-8">
            <div className="mx-auto mb-4 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Payment Failed</h2>
            <p className="mb-6">
              There was an error processing your payment. Please try again or contact support if the issue persists.
            </p>
            <p className="mb-6">
              If the payment went through, please contact us on our Discord server with your transaction ID for
              assistance.
            </p>

            <p className=""> Additional info from server:</p>
            <p className="text-red-500 text-sm mt-2 mb-4">{error}</p>
            <div className="flex flex-col space-y-4">
              <button onClick={() => setPaymentStatus('idle')} className="btn">
                Try Again
              </button>
              <Link href="/store" className="btn">
                Back to Store
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-12 px-4">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6 bg-clip-text text-[var(--accent)]">Complete Your Donation</h1>

        <div className="card max-w-lg w-full mb-8 relative">
          <div className="mt-4">
            {product.img && (
              <div className="flex justify-center mb-4">
                <img src={`/${product.img}`} alt={`${product.name} Image`} width={200} draggable={false} />
              </div>
            )}

            <div className="flex justify-between items-center mb-4">
              <span className="text-lg">Package:</span>
              <span className="font-bold">{product.name}</span>
            </div>

            <div className="flex justify-between items-center mb-4">
              <span className="text-lg">Minecraft Username:</span>
              <span className="font-bold">{minecraftUsername}</span>
            </div>

            {product.description && (
              <div className="mb-6">
                <h3 className="text-lg mb-2">Descriptiom:</h3>
                <p className=" text-gray-300">{product.description}</p>
              </div>
            )}

            {product.features && product.features.length > 0 && (
              <div className="mb-6">
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  {product.features.map((feature: any, index: number) => (
                    <li key={feature.description}>
                      {feature.description}{' '}
                      {feature.link ? (
                        <a href={feature.link.href} className="underline" target="_blank" rel="noopener noreferrer">
                          ({feature.link.text})
                        </a>
                      ) : (
                        ''
                      )}{' '}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.customPrice ? (
              <div className="mb-6">
                <label className="block text-lg mb-2">Amount (minimum $1.00):</label>
                <input
                  type="number"
                  min="1"
                  step="0.5"
                  value={customAmount}
                  onChange={handleAmountChange}
                  className="input-text"
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
            ) : (
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg">Price:</span>
                <span className="text-2xl font-bold">{formatMoney(product.price)}</span>
              </div>
            )}

            <PayPalCheckout
              itemId={product.id}
              amount={product.customPrice ? (parseFloat(customAmount) < 1 ? '1.00' : customAmount) : product.price}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </div>
        </div>

        <Link href="/store" className="btn btn-danger">
          Back to Store
        </Link>
      </div>
    </main>
  );
}

'use client';

import { getMcDataFromCookie } from '@/utils/cooki-manager';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useState } from 'react';

// This would typically come from environment variables
const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;

interface PayPalCheckoutProps {
  itemId: string;
  amount: number;
  onSuccess?: (viewToken: string) => void;
  onError?: (error: any) => void;
}

export default function PayPalCheckout({ itemId, amount, onSuccess, onError }: PayPalCheckoutProps) {
  const [isPending, setIsPending] = useState(false);
  const [scriptError, setScriptError] = useState<string | null>(null);
  const [viewToken, setViewToken] = useState<string>('');

  const createOrder = async () => {
    try {
      const mcData = getMcDataFromCookie();
      if (!mcData) {
        setScriptError('You need to log in to make a purchase.');
        return;
      }

      const response = await fetch('/api/place-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId, amount, playerUuid: mcData.uuid }),
      });


      if (!response.ok) {
        console.error('Error creating order:', response);
        setScriptError('Failed to create order');
        return;
      }

      const data = await response.json();
      if (!data || !data.success) {
        setScriptError('Failed to create order');
        return;
      }

      setViewToken(data.result.viewToken);

      return data.result.orderId;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const onApprove = async (data: any, actions: any) => {

    if (!actions.order) {
      return Promise.resolve();
    }
    setIsPending(true);

    try {
      setIsPending(false);
      if (onSuccess) {
        onSuccess(viewToken);
      }
    } catch (error) {
      setIsPending(false);
      if (onError) {
        onError(error);
      }
      setScriptError('Failed to process payment: ' + error);
    }
  };

  if (scriptError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Payment Error:</strong>
        <span className="block sm:inline"> {scriptError}</span>
      </div>
    );
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId: PAYPAL_CLIENT_ID,
        currency: 'USD',
        components: 'buttons',
      }}>
      <div className={`${isPending ? 'opacity-60 pointer-events-none' : ''}`}>
        <div className="mb-4 text-center text-sm text-gray-400">You don't need a PayPal account.</div>
        <PayPalButtons
          style={{
            color: 'blue',
            shape: 'rect',
            label: 'donate',
          }}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </div>
      {isPending && (
        <div className="text-center mt-4">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      )}
    </PayPalScriptProvider>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { getMcDataFromCookie } from '@/utils/cooki-manager';

export default function BuyButton({ product }: { product: any }) {
  const router = useRouter();

  const checkCookie = () => {
    const mcData = getMcDataFromCookie();
    if (mcData) {
      router.push('/store/purchase/' + product.id);
    } else {
      router.push('/store#login');
    }
  };

  return (
    <>
      <button onClick={() => checkCookie()} className="btn w-full mt-auto">
        Buy
      </button>
    </>
  );
}

import { ProductDetailsParent } from '@/components/purchase/product-details-parent';
import { SuspenseFallback } from '@/components/suspense-fallback';
import { Suspense } from 'react';

export default async function PurchasePage({ params }: { params: Promise<{ packageId: string }> }) {
  const { packageId } = await params;

  return (
    <Suspense fallback={<SuspenseFallback className='mt-8'/>}>
      <ProductDetailsParent packageId={packageId} />
    </Suspense>
  );
}

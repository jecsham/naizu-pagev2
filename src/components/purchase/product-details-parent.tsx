import { serverRequest } from '@/app/actions/request';
import ProductDetails from './product-details';

export async function ProductDetailsParent({ packageId }: { packageId: string }) {
  const response = await serverRequest(`/api/products/${packageId}`, 'GET', null, { tags: ['products'] });
  if (!response.ok) {
    return <ProductDetails product={null} />;
  }
  const data = await response.json();
  if (!data || !data.success) {
    return <ProductDetails product={null} />;
  }
  const product = data.result;
  return <ProductDetails product={product} />;
}

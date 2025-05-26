import { serverRequest } from '@/app/actions/request';
import { formatMoney } from '@/utils/formatter';
import BuyButton from './buy-button';

export default async function Products() {
  const error = <div>Error fetching data :/</div>;
  const response = await serverRequest('/api/products', 'GET', null, { tags: ['products'] });
  if (!response.ok) {
    return error;
  }
  const data = await response.json();
  if (!data || !data.success) {
    return error;
  }
  const products = data.result;

  const headerClassResolver = (productId: string) => {
    switch (productId) {
      case 'vip':
        return 'from-amber-500 to-yellow-400';
      case 'custom':
        return 'from-purple-600 to-indigo-600';
      default:
        return 'from-emerald-500 to-teal-500';
    }
  };

  return (
    <div className="flex justify-center gap-8 mb-12 w-full max-w-6xl">
      {products.map((product: any) => (
        <div key={product.id} className="card flex flex-col h-full w-full max-w-sm">
          <div className={`bg-gradient-to-r ${headerClassResolver(product.id)} p-1 rounded-t-xl`}>
            <h2 className="text-2xl font-bold py-2">{product.name}</h2>
          </div>
          <div className="flex-grow p-6 flex flex-col">
            {product.img && (
              <div className="mb-4 mx-auto">
                <img src={product.img} alt="Package Icon" width={200} draggable={false} />
              </div>
            )}
            <h3 className="text-3xl font-bold mb-4">
              {product.customPrice ? 'From' : ''} {formatMoney(product.price)}
            </h3>
            {product.description && <p className="mb-4"> {product.description}</p>}
            {product.features && (
              <ul className="text-left mb-6 flex-grow">
                {product.features.map((feature: any, index: number) => (
                  <li key={feature.description} className="mb-2">
                    {feature.description}{' '}
                    {feature.link
                      ?
                        (
                          <a href={feature.link.href} className="underline" target="_blank" rel="noopener noreferrer">
                            ({feature.link.text})
                          </a>
                        )
                      : ''}{' '}
                  </li>
                ))}
              </ul>
            )}
            <BuyButton product={product}/>
          </div>
        </div>
      ))}
    </div>
  );
}

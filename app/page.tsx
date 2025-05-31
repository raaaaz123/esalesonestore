import { PageLayout } from './components/common/PageLayout';
import { ProductDisplay } from './components/landing/ProductDisplay';
import { mockProduct } from './lib/mockData';
import { StoreProvider } from './lib/store';

export default function Home() {
  return (
    <StoreProvider>
      <PageLayout 
        title="Premium Wireless Headphones" 
        subtitle="Experience crystal-clear sound with our premium wireless headphones."
      >
        <ProductDisplay product={mockProduct} />
      </PageLayout>
    </StoreProvider>
  );
}

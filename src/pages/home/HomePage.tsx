import { useState } from 'react';
import { useSearchParams } from 'react-router';
import Header from '../../components/Header';
import ProductsGrid from './ProductsGrid';
import { useAiSearch, useGetProducts } from '../../hooks/useApi';
import './HomePage.css';

export function HomePage() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || undefined;

  const { data: products = [] } = useGetProducts(search);
  const [aiMode, setAiMode] = useState(false);
  const { data: aiProducts = [], isFetching: aiLoading } = useAiSearch(
    aiMode ? search : undefined,
  );

  return (
    <>
      <title>Ecommerce Project</title>
      <link rel='icon' href='home-favicon.png' type='image/png' />
      <Header />
      <div className='home-page' data-testid='home-page'>
        <div className='ai-search-toggle'>
          <button
            className={`ai-toggle-button ${aiMode ? 'active' : ''}`}
            onClick={() => setAiMode((prev) => !prev)}
          >
            {aiMode ? 'AI Search ON' : 'AI Search OFF'}
          </button>
          {aiMode && aiLoading && (
            <span className='ai-loading-text'>Searching with AI...</span>
          )}
          {aiMode && !aiLoading && aiProducts.length === 0 && search && (
            <span className='ai-no-results'>No AI matches found</span>
          )}
        </div>
        <ProductsGrid products={aiMode ? aiProducts : products} />
      </div>
    </>
  );
}

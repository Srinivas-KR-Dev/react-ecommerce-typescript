import { useSearchParams } from 'react-router';
import AiAssistantChat from '../../components/AiAssistantChat';
import Header from '../../components/Header';
import ProductsGrid from './ProductsGrid';
import { useAiSearch, useGetProducts } from '../../hooks/useApi';
import './HomePage.css';

export function HomePage() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || undefined;
  const aiMode = searchParams.get('ai') === 'true';

  const { data: products = [] } = useGetProducts(search);
  const {
    data: aiProducts = [],
    isFetching: aiLoading,
    isError: aiError,
  } = useAiSearch(
    aiMode && search ? search : undefined,
  );

  return (
    <>
      <title>Ecommerce Project</title>
      <link rel='icon' href='home-favicon.png' type='image/png' />
      <Header />
      <div className='home-page' data-testid='home-page'>
        {aiMode && search && !aiLoading && !aiError && (
          <div className='ai-results-banner'>AI Search Results for "{search}"</div>
        )}
        {aiMode && aiLoading ? (
          <div className='ai-status-text ai-status-info'>Searching with AI...</div>
        ) : !aiMode && search && products.length === 0 ? (
          <div className='ai-status-text ai-status-empty'>
            No products matched "{search}". Try another keyword or use AI
            search for a broader match.
          </div>
        ) : (
          <ProductsGrid products={aiMode ? aiProducts : products} />
        )}
        {aiMode && !aiLoading && !aiError && aiProducts.length === 0 && search && (
          <div className='ai-status-text ai-status-empty'>
            No AI matches found for "{search}"
          </div>
        )}
        {aiMode && aiError && (
          <div className='ai-status-text ai-status-warning'>
            AI search is temporarily unavailable. Try again in a few minutes
            or use regular search.
          </div>
        )}
      </div>
      <AiAssistantChat />
    </>
  );
}

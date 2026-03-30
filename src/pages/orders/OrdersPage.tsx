import Header from '../../components/Header';
import OrderGrid from './OrderGrid';
import './OrdersPage.css';
import { useGetOrders } from '../../hooks/useApi';

export function OrdersPage() {
  const {
    data: orders = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetOrders();

  const errorMessage =
    error instanceof Error
      ? error.message
      : 'Failed to load orders. Please try again.';

  if (isLoading) {
    return (
      <>
        <title>Orders</title>
        <link rel='icon' href='orders-favicon.png' type='image/png' />
        <Header />
        <div className='orders-page'>
          <div className='page-title'>Your Orders</div>
          <div style={{ marginTop: 20 }}>Loading your orders...</div>
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <title>Orders</title>
        <link rel='icon' href='orders-favicon.png' type='image/png' />
        <Header />
        <div className='orders-page'>
          <div className='page-title'>Your Orders</div>
          <div style={{ marginTop: 20, marginBottom: 12 }}>Could not load orders.</div>
          <div style={{ marginBottom: 16, color: 'var(--text-muted)' }}>
            {errorMessage}
          </div>
          <button className='button-secondary' onClick={() => refetch()}>
            Retry
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <title>Orders</title>
      <link rel='icon' href='orders-favicon.png' type='image/png' />
      <Header />
      <div className='orders-page'>
        <div className='page-title'>Your Orders</div>
        {orders.length > 0 ? (
          <OrderGrid orders={orders} />
        ) : (
          <div style={{ marginTop: 20 }}>No orders yet.</div>
        )}
      </div>
    </>
  );
}

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import OrderDetails from './OrderDetails';
import type { Order } from '../../types/orders';
import { useAddToCart } from '../../hooks/useApi';

vi.mock('../../hooks/useApi', () => ({
  useAddToCart: vi.fn(),
}));

describe('OrderDetails component', () => {
  let order: Order;
  let queryClient: QueryClient;
  let addToCartMutateAsync: ReturnType<typeof vi.fn>;
  let user = userEvent.setup();

  beforeEach(() => {
    order = {
      id: 'order-1',
      orderTimeMs: 1711929600000,
      totalCostCents: 4599,
      products: [
        {
          productId: 'product-1',
          quantity: 2,
          estimatedDeliveryTimeMs: 1712188800000,
          product: {
            id: 'product-1',
            image: 'images/products/product-1.jpg',
            name: 'Running Shoes',
            rating: {
              stars: 4.5,
              count: 120,
            },
            priceCents: 4599,
            keywords: ['shoes', 'running'],
          },
        },
      ],
    };

    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
        mutations: {
          retry: false,
        },
      },
    });

    addToCartMutateAsync = vi.fn().mockResolvedValue({});

    vi.mocked(useAddToCart).mockReturnValue({
      mutateAsync: addToCartMutateAsync,
    } as unknown as ReturnType<typeof useAddToCart>);

    user = userEvent.setup();
  });

  it('renders the order product details and tracking link', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <OrderDetails order={order} />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(screen.getByText('Running Shoes')).toBeInTheDocument();
    expect(screen.getByText('Quantity: 2')).toBeInTheDocument();
    expect(screen.getByText('Arriving on: April 4')).toBeInTheDocument();

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/tracking/order-1/product-1',
    );
  });

  it('adds the order product to cart', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <OrderDetails order={order} />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await user.click(screen.getByRole('button', { name: 'Add to Cart' }));

    expect(addToCartMutateAsync).toHaveBeenCalledWith({
      productId: 'product-1',
      quantity: 1,
    });
  });

  it('renders an error message when adding to cart fails', async () => {
    addToCartMutateAsync.mockRejectedValue({
      response: {
        data: {
          message: 'Unable to add this item right now',
        },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <OrderDetails order={order} />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await user.click(screen.getByRole('button', { name: 'Add to Cart' }));

    await waitFor(() => {
      expect(
        screen.getByText('Unable to add this item right now'),
      ).toBeInTheDocument();
    });
  });
});

import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '../../context/ThemeContext';
import { useGetOrders } from '../../hooks/useApi';
import { queryClient } from '../../utils/queryClient';
import { OrdersPage } from './OrdersPage';

vi.mock('../../hooks/useApi', () => ({
  useGetOrders: vi.fn(),
}));

vi.mock('../../components/Header', () => ({
  default: () => <div data-testid='header'>Header</div>,
}));

vi.mock('./OrderGrid', () => ({
  default: () => <div data-testid='order-grid'>Order Grid</div>,
}));

describe('OrdersPage', () => {
  it('renders a loading state while orders are loading', () => {
    vi.mocked(useGetOrders).mockReturnValue({
      data: [],
      isLoading: true,
      isError: false,
      error: null,
      refetch: vi.fn(),
    } as unknown as ReturnType<typeof useGetOrders>);

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <MemoryRouter>
            <OrdersPage />
          </MemoryRouter>
        </ThemeProvider>
      </QueryClientProvider>,
    );

    expect(screen.getByText('Loading your orders...')).toBeInTheDocument();
    expect(screen.queryByTestId('order-grid')).not.toBeInTheDocument();
  });

  it('renders an error state and retries loading orders', async () => {
    const refetch = vi.fn();
    const user = userEvent.setup();

    vi.mocked(useGetOrders).mockReturnValue({
      data: [],
      isLoading: false,
      isError: true,
      error: new Error('Orders service is unavailable'),
      refetch,
    } as unknown as ReturnType<typeof useGetOrders>);

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <MemoryRouter>
            <OrdersPage />
          </MemoryRouter>
        </ThemeProvider>
      </QueryClientProvider>,
    );

    expect(screen.getByText('Could not load orders.')).toBeInTheDocument();
    expect(screen.getByText('Orders service is unavailable')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Retry' }));

    expect(refetch).toHaveBeenCalled();
  });
});

import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '../../context/ThemeContext';
import { useGetOrderById } from '../../hooks/useApi';
import { queryClient } from '../../utils/queryClient';
import { TrackingPage } from './TrackingPage';

vi.mock('../../hooks/useApi', () => ({
  useGetOrderById: vi.fn(),
}));

vi.mock('../../components/Header', () => ({
  default: () => <div data-testid='header'>Header</div>,
}));

vi.mock('./OrderTracking', () => ({
  default: () => <div data-testid='order-tracking'>Order Tracking</div>,
}));

describe('TrackingPage', () => {
  it('renders a loading state while tracking data is loading', () => {
    vi.mocked(useGetOrderById).mockReturnValue({
      data: undefined,
      isLoading: true,
    } as unknown as ReturnType<typeof useGetOrderById>);

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <MemoryRouter initialEntries={['/tracking/order-1/product-1']}>
            <Routes>
              <Route
                path='/tracking/:orderId/:productId'
                element={<TrackingPage />}
              />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </QueryClientProvider>,
    );

    expect(screen.getByTestId('tracking-loading')).toHaveTextContent(
      'Loading tracking details...',
    );
    expect(screen.queryByTestId('order-tracking')).not.toBeInTheDocument();
  });
});

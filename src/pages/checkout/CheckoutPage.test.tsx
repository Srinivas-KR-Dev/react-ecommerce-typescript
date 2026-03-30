import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '../../context/ThemeContext';
import {
  useGetCartItems,
  useGetDeliveryOptions,
  useGetPaymentSummary,
} from '../../hooks/useApi';
import { queryClient } from '../../utils/queryClient';
import { CheckoutPage } from './CheckoutPage';

vi.mock('../../hooks/useApi', () => ({
  useGetCartItems: vi.fn(),
  useGetDeliveryOptions: vi.fn(),
  useGetPaymentSummary: vi.fn(),
}));

vi.mock('./CheckoutHeader', () => ({
  default: ({ cart }: { cart: unknown[] }) => (
    <div data-testid='checkout-header'>Header cart items: {cart.length}</div>
  ),
}));

vi.mock('./OrderSummary', () => ({
  default: () => <div data-testid='order-summary'>Order Summary</div>,
}));

vi.mock('./PaymentSummary', () => ({
  default: () => <div data-testid='payment-summary'>Payment Summary</div>,
}));

describe('CheckoutPage', () => {
  it('renders a loading state while checkout data is loading', () => {
    vi.mocked(useGetCartItems).mockReturnValue({
      data: [],
      isLoading: true,
    } as unknown as ReturnType<typeof useGetCartItems>);

    vi.mocked(useGetDeliveryOptions).mockReturnValue({
      data: [],
      isLoading: false,
    } as unknown as ReturnType<typeof useGetDeliveryOptions>);

    vi.mocked(useGetPaymentSummary).mockReturnValue({
      data: undefined,
      isLoading: false,
    } as unknown as ReturnType<typeof useGetPaymentSummary>);

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <MemoryRouter>
            <CheckoutPage />
          </MemoryRouter>
        </ThemeProvider>
      </QueryClientProvider>,
    );

    expect(screen.getByTestId('checkout-loading')).toHaveTextContent(
      'Loading checkout...',
    );
    expect(screen.queryByTestId('order-summary')).not.toBeInTheDocument();
  });
});

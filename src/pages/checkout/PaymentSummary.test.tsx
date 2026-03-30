import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import PaymentSummary from './PaymentSummary';
import type { PaymentSummary as PaymentSummarType } from '../../types/paymentSummary';

vi.mock('axios');

describe('PaymentSummary component', () => {
  let paymentSummary: PaymentSummarType;
  let queryClient: QueryClient;
  let user = userEvent.setup();

  beforeEach(() => {
    paymentSummary = {
      totalItems: 8,
      productCostCents: 10506,
      shippingCostCents: 0,
      totalCostBeforeTaxCents: 10506,
      taxCents: 1051,
      totalCostCents: 11557,
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

    user = userEvent.setup();
  });

  it('display the correct details', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <PaymentSummary paymentSummary={paymentSummary} />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(screen.getAllByText('₹105.06').length).toBe(2);

    expect(screen.getAllByText('₹105.06').length).toBeGreaterThan(0);

    expect(
      within(screen.getByTestId('payment-summary-product-cost')).getByText(
        '₹105.06',
      ),
    ).toBeInTheDocument();

    expect(
      within(screen.getByTestId('payment-summary-total-before-tax')).getByText(
        '₹105.06',
      ),
    ).toBeInTheDocument();

    expect(screen.getByText('₹0.00')).toBeInTheDocument();

    expect(screen.getByText('₹10.51')).toBeInTheDocument();

    expect(screen.getByText('₹115.57')).toBeInTheDocument();

    expect(
      screen.getByTestId('payment-summary-product-cost'),
    ).toHaveTextContent('tems (8):');

    expect(
      screen.getByTestId('payment-summary-shipping-cost'),
    ).toHaveTextContent('Shipping & handling:');

    expect(
      screen.getByTestId('payment-summary-total-before-tax'),
    ).toHaveTextContent('Total before tax:');

    expect(screen.getByTestId('payment-summary-tax')).toHaveTextContent(
      'Estimated tax (10%):',
    );

    expect(screen.getByTestId('payment-summary-total')).toHaveTextContent(
      'Order total:',
    );
  });
  it('places an order', async () => {
    vi.mocked(axios.post).mockResolvedValue({ data: {} });

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <PaymentSummary paymentSummary={paymentSummary} />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const placeOrderButton = screen.getByTestId('place-order-button');
    await user.click(placeOrderButton);

    expect(axios.post).toHaveBeenCalledWith('/api/orders');
  });

  it('renders an error message when placing an order fails', async () => {
    vi.mocked(axios.post).mockRejectedValue({
      response: {
        data: {
          message: 'Order service is temporarily unavailable',
        },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <PaymentSummary paymentSummary={paymentSummary} />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await user.click(screen.getByTestId('place-order-button'));

    await waitFor(() => {
      expect(
        screen.getByText('Order service is temporarily unavailable'),
      ).toBeInTheDocument();
    });
  });
});

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import Header from './Header';
import { ThemeProvider } from '../context/ThemeContext';
import { useGetCartItems } from '../hooks/useApi';
import { queryClient } from '../utils/queryClient';

vi.mock('../hooks/useApi', () => ({
  useGetCartItems: vi.fn(),
}));

function LocationDisplay() {
  const location = useLocation();

  return <div data-testid='location-display'>{location.pathname + location.search}</div>;
}

describe('Header component', () => {
  let user = userEvent.setup();

  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('ecommerce-theme', 'light');

    vi.mocked(useGetCartItems).mockReturnValue({
      data: [
        {
          productId: 'product-1',
          quantity: 2,
          deliveryOptionId: '1',
          product: {
            id: 'product-1',
            image: 'images/products/product-1.jpg',
            name: 'Product 1',
            rating: {
              stars: 4.5,
              count: 10,
            },
            priceCents: 1000,
            keywords: ['test'],
          },
        },
        {
          productId: 'product-2',
          quantity: 3,
          deliveryOptionId: '2',
          product: {
            id: 'product-2',
            image: 'images/products/product-2.jpg',
            name: 'Product 2',
            rating: {
              stars: 4,
              count: 12,
            },
            priceCents: 2000,
            keywords: ['test'],
          },
        },
      ],
    } as unknown as ReturnType<typeof useGetCartItems>);

    user = userEvent.setup();
  });

  it('displays the cart quantity and current search text', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <MemoryRouter initialEntries={['/?search=socks']}>
            <Routes>
              <Route
                path='/'
                element={
                  <>
                    <Header />
                    <LocationDisplay />
                  </>
                }
              />
              <Route
                path='/orders'
                element={
                  <>
                    <Header />
                    <LocationDisplay />
                  </>
                }
              />
              <Route
                path='/checkout'
                element={
                  <>
                    <Header />
                    <LocationDisplay />
                  </>
                }
              />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </QueryClientProvider>,
    );

    expect(screen.getByDisplayValue('socks')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Dark' })).toBeInTheDocument();
  });

  it('searches products when clicking the search button', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <MemoryRouter initialEntries={['/']}>
            <Routes>
              <Route
                path='/'
                element={
                  <>
                    <Header />
                    <LocationDisplay />
                  </>
                }
              />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </QueryClientProvider>,
    );

    const searchInput = screen.getByRole('textbox', { name: 'Search products' });
    await user.type(searchInput, 'running shoes');
    await user.click(screen.getByRole('button', { name: 'Search products' }));

    expect(screen.getByTestId('location-display')).toHaveTextContent(
      '/?search=running%20shoes',
    );
  });

  it('navigates to home without a query when search is empty', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <MemoryRouter initialEntries={['/?search=socks']}>
            <Routes>
              <Route
                path='/'
                element={
                  <>
                    <Header />
                    <LocationDisplay />
                  </>
                }
              />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </QueryClientProvider>,
    );

    const searchInput = screen.getByRole('textbox', { name: 'Search products' });
    await user.clear(searchInput);
    await user.click(screen.getByRole('button', { name: 'Search products' }));

    expect(screen.getByTestId('location-display')).toHaveTextContent('/');
    expect(screen.getByTestId('location-display')).not.toHaveTextContent('?search=');
  });

  it('searches with AI when clicking the AI button', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <MemoryRouter initialEntries={['/']}>
            <Routes>
              <Route
                path='/'
                element={
                  <>
                    <Header />
                    <LocationDisplay />
                  </>
                }
              />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </QueryClientProvider>,
    );

    const searchInput = screen.getByRole('textbox', { name: 'Search products' });
    await user.type(searchInput, 'running shoes');
    await user.click(screen.getByRole('button', { name: 'Search with AI' }));

    expect(screen.getByTestId('location-display')).toHaveTextContent(
      '/?search=running%20shoes&ai=true',
    );
  });
});

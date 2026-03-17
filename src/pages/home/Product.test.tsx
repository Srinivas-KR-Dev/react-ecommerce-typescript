import axios from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClientProvider } from '@tanstack/react-query';
import Product from './Product';
import { queryClient } from '../../utils/queryClient';
import type { Product as ProductType } from '../../types/product';




vi.mock('axios');

describe('Product component', () => {

    let product: ProductType;

    let user = userEvent.setup();

    beforeEach(() => {

        product = {
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
                stars: 4.5,
                count: 87
            },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"]
        }

        vi.mocked(axios.post).mockResolvedValue({ data: {} });
        user = userEvent.setup();

    })

    it('displays the product details correctly', () => {


        render(
            <QueryClientProvider client={queryClient}>
                <Product product={product} />
            </QueryClientProvider>
        );

        expect(
            screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
        ).toBeInTheDocument();

        expect(
            screen.getByText('$10.90')
        ).toBeInTheDocument();

        expect(
            screen.getByTestId('product-image')
        ).toBeInTheDocument();

        expect(
            screen.getByTestId('product-image')
        ).toHaveAttribute('src', "images/products/athletic-cotton-socks-6-pairs.jpg");

        expect(
            screen.getByTestId('product-rating-stars')
        ).toBeInTheDocument();

        expect(
            screen.getByTestId('product-rating-stars'),
        ).toHaveAttribute('src', 'images/ratings/rating-45.png')

        expect(
            screen.getByText('87'),
        ).toBeInTheDocument();

    });

    it('adds a product to cart', async () => {


        render(
            <QueryClientProvider client={queryClient}>
                <Product product={product} />
            </QueryClientProvider>
        );

        const addToCartButton = screen.getByTestId('add-to-cart-button');

        await user.click(addToCartButton);

        expect(axios.post).toBeCalledWith('/api/cart-items', {
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1
        });

    });

    it('selects a quantity', async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <Product product={product} />
            </QueryClientProvider>
        );

        const quantitySelector = screen.getByTestId('product-quantity-selector');

        expect(quantitySelector).toHaveValue('1');

        await user.selectOptions(quantitySelector, '3');

        expect(quantitySelector).toHaveValue('3');

        const addToCartButton = screen.getByTestId('add-to-cart-button')

        await user.click(addToCartButton);

        expect(axios.post).toBeCalledWith('/api/cart-items', {
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 3
        });

    });

    it('displays added message after clicked the button', async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <Product product={product} />
            </QueryClientProvider>
        );

        const addToCartButton = screen.getByTestId('add-to-cart-button');

        const addedMessage = screen.getByText('Added');

        expect(addedMessage).toHaveStyle({
            opacity: 0
        });

        await user.click(addToCartButton);

        expect(addedMessage).toHaveStyle({
            opacity: 1
        });

    })

});



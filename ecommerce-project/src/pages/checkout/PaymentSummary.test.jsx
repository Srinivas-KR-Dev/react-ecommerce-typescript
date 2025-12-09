import axios from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, within} from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router';
import  userEvent from '@testing-library/user-event';
import PaymentSummary from './PaymentSummary';


vi.mock('axios');

describe('PaymentSummary component', () => {

    let loadCart;

    let paymentSummary;

    let user;

    beforeEach(() => {

        loadCart = vi.fn();

        paymentSummary = {

            "totalItems": 8,
            "productCostCents": 10506,
            "shippingCostCents": 0,
            "totalCostBeforeTaxCents": 10506,
            "taxCents": 1051,
            "totalCostCents": 11557
        }

        user = userEvent.setup();

    });

    it('display the correct details', () => {


        render(

            <MemoryRouter>

                <PaymentSummary paymentSummary = {paymentSummary} loadCart={loadCart} />
            
            </MemoryRouter>

        );

        expect(
             screen.getAllByText('$105.06').length
        ).toBe(2);

        expect(
             screen.getAllByText('$105.06').length
        ).toBeGreaterThan(0);

        expect(
            within(screen.getByTestId('payment-summary-product-cost'))
                .getByText('$105.06')
        ).toBeInTheDocument();

        expect(
            within(screen.getByTestId('payment-summary-total-before-tax'))
                .getByText('$105.06')
        ).toBeInTheDocument();


         expect(
             screen.getByText('$0.00')
        ).toBeInTheDocument();

        expect(
             screen.getByText('$10.51')
        ).toBeInTheDocument();

        expect(
             screen.getByText('$115.57')
        ).toBeInTheDocument();
        

        expect(screen.getByTestId('payment-summary-product-cost'))
            .toHaveTextContent('tems (8):');

        expect(screen.getByTestId('payment-summary-shipping-cost'))
            .toHaveTextContent('Shipping & handling:');

        expect(screen.getByTestId('payment-summary-total-before-tax'))
            .toHaveTextContent('Total before tax:');

        expect(screen.getByTestId('payment-summary-tax'))
            .toHaveTextContent('Estimated tax (10%):');

        expect(screen.getByTestId('payment-summary-total'))
            .toHaveTextContent('Order total:');

    });

    it('places an order', async () => {

        function Location() {

            const location = useLocation();

            return (

                
                <div data-testid="url-path">
                    {location.pathname}
                </div>
            );
        }

        render(

            <MemoryRouter>

                <PaymentSummary paymentSummary = {paymentSummary} loadCart={loadCart} />
                <Location />

            </MemoryRouter>

        );

        const placeOrderButton  = screen.getByTestId('place-order-button');

        await user.click(placeOrderButton);

        expect(axios.post).toHaveBeenCalledWith('/api/orders');

        expect(loadCart).toHaveBeenCalled();

        expect(screen.getByTestId('url-path')).toHaveTextContent('/orders');


    })
});
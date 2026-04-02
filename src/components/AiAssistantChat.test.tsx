import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AiAssistantChat from './AiAssistantChat';
import type { AiAssistantResponse } from '../types/aiAssistant';
import { useAddToCart, useAiAssistant } from '../hooks/useApi';

vi.mock('../hooks/useApi', () => ({
  useAiAssistant: vi.fn(),
  useAddToCart: vi.fn(),
}));

describe('AiAssistantChat component', () => {
  let user = userEvent.setup();
  let assistantResponse: AiAssistantResponse;
  let aiAssistantMutateAsync: ReturnType<typeof vi.fn>;
  let addToCartMutateAsync: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    assistantResponse = {
      reply: 'These look like good options for your request.',
      products: [
        {
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
      ],
    };

    aiAssistantMutateAsync = vi.fn().mockResolvedValue(assistantResponse);
    addToCartMutateAsync = vi.fn().mockResolvedValue({});

    vi.mocked(useAiAssistant).mockReturnValue({
      mutateAsync: aiAssistantMutateAsync,
      isPending: false,
      isError: false,
    } as unknown as ReturnType<typeof useAiAssistant>);

    vi.mocked(useAddToCart).mockReturnValue({
      mutateAsync: addToCartMutateAsync,
      isPending: false,
    } as unknown as ReturnType<typeof useAddToCart>);

    user = userEvent.setup();
  });

  it('opens the assistant panel and shows the welcome message', async () => {
    render(<AiAssistantChat />);

    await user.click(screen.getByRole('button', { name: 'Open AI shopping assistant' }));

    expect(screen.getByText('AI Shopping Assistant')).toBeInTheDocument();
    expect(
      screen.getByText('Ask me for gift ideas, budget picks, or category suggestions.'),
    ).toBeInTheDocument();
  });

  it('sends a message and shows the assistant response with suggested products', async () => {
    render(<AiAssistantChat />);

    await user.click(screen.getByRole('button', { name: 'Open AI shopping assistant' }));
    await user.type(
      screen.getByRole('textbox', { name: 'Ask the AI shopping assistant' }),
      'Suggest running shoes',
    );
    await user.click(screen.getByRole('button', { name: 'Send' }));

    expect(aiAssistantMutateAsync).toHaveBeenCalledWith('Suggest running shoes');

    await waitFor(() => {
      expect(
        screen.getByText('These look like good options for your request.'),
      ).toBeInTheDocument();
    });

    expect(screen.getByText('Suggested Products')).toBeInTheDocument();
    expect(screen.getByText('Running Shoes')).toBeInTheDocument();
    expect(screen.getByText('₹45.99')).toBeInTheDocument();
  });

  it('adds a suggested product to cart', async () => {
    render(<AiAssistantChat />);

    await user.click(screen.getByRole('button', { name: 'Open AI shopping assistant' }));
    await user.type(
      screen.getByRole('textbox', { name: 'Ask the AI shopping assistant' }),
      'Suggest running shoes',
    );
    await user.click(screen.getByRole('button', { name: 'Send' }));

    await waitFor(() => {
      expect(screen.getByText('Running Shoes')).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: 'Add to Cart' }));

    expect(addToCartMutateAsync).toHaveBeenCalledWith({
      productId: 'product-1',
      quantity: 1,
    });
  });

  it('renders a fallback error message when the assistant request fails', async () => {
    aiAssistantMutateAsync.mockRejectedValue(new Error('Assistant failed'));

    render(<AiAssistantChat />);

    await user.click(screen.getByRole('button', { name: 'Open AI shopping assistant' }));
    await user.type(
      screen.getByRole('textbox', { name: 'Ask the AI shopping assistant' }),
      'Suggest something',
    );
    await user.click(screen.getByRole('button', { name: 'Send' }));

    await waitFor(() => {
      expect(
        screen.getByText('I could not answer right now. Please try again in a moment.'),
      ).toBeInTheDocument();
    });
  });
});

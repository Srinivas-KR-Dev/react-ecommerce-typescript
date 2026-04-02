import { useEffect, useRef, useState } from 'react';
import { useAddToCart, useAiAssistant } from '../hooks/useApi';
import type { Product } from '../types/product';
import { formatMoney } from '../utils/money';
import './AiAssistantChat.css';

type ChatMessage = {
  id: string;
  role: 'assistant' | 'user';
  text: string;
};

function AiAssistantChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Ask me for gift ideas, budget picks, or category suggestions.',
    },
  ]);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [cartError, setCartError] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const addedMessageTimeoutRef = useRef<number | null>(null);
  const aiAssistantMutation = useAiAssistant();
  const addToCartMutation = useAddToCart();

  const canSend = input.trim().length > 0 && !aiAssistantMutation.isPending;

  useEffect(() => {
    if (!isOpen || !scrollContainerRef.current) {
      return;
    }

    scrollContainerRef.current.scrollTop =
      scrollContainerRef.current.scrollHeight;
  }, [isOpen, messages, suggestedProducts]);

  useEffect(() => {
    return () => {
      if (addedMessageTimeoutRef.current !== null) {
        window.clearTimeout(addedMessageTimeoutRef.current);
      }
    };
  }, []);

  let assistantStatus = 'Ask for recommendations, budget picks, or category help.';

  if (aiAssistantMutation.isPending) {
    assistantStatus = 'Thinking...';
  } else if (aiAssistantMutation.isError) {
    assistantStatus = 'Assistant is temporarily unavailable.';
  }

  const submitMessage = async () => {
    const trimmed = input.trim();

    if (!trimmed || aiAssistantMutation.isPending) {
      return;
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: `user-${Date.now()}`,
        role: 'user',
        text: trimmed,
      },
    ]);
    setSuggestedProducts([]);
    setAddedProductId(null);
    setCartError(null);
    setInput('');

    try {
      const response = await aiAssistantMutation.mutateAsync(trimmed);

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          text: response.reply,
        },
      ]);
      setSuggestedProducts(response.products);
    } catch {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: `assistant-error-${Date.now()}`,
          role: 'assistant',
          text: 'I could not answer right now. Please try again in a moment.',
        },
      ]);
      setSuggestedProducts([]);
    }
  };

  const addSuggestedProductToCart = async (productId: string) => {
    try {
      await addToCartMutation.mutateAsync({
        productId,
        quantity: 1,
      });
      setCartError(null);
      setAddedProductId(productId);

      if (addedMessageTimeoutRef.current !== null) {
        window.clearTimeout(addedMessageTimeoutRef.current);
      }

      addedMessageTimeoutRef.current = window.setTimeout(() => {
        setAddedProductId(null);
        addedMessageTimeoutRef.current = null;
      }, 2000);
    } catch (error) {
      console.error('Failed to add suggested product to cart:', error);
      setCartError('Could not add that product to cart right now.');
    }
  };

  return (
    <div className={`ai-assistant ${isOpen ? 'open' : ''}`}>
      {isOpen && (
        <div className='ai-assistant-panel'>
          <div className='ai-assistant-panel-header'>
            <div>
              <div className='ai-assistant-title'>AI Shopping Assistant</div>
              <div className='ai-assistant-subtitle'>{assistantStatus}</div>
            </div>

            <button
              className='ai-assistant-close'
              type='button'
              onClick={() => setIsOpen(false)}
              aria-label='Close AI shopping assistant'
            >
              Close
            </button>
          </div>

          <div className='ai-assistant-body' ref={scrollContainerRef}>
            <div className='ai-assistant-messages'>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`ai-assistant-message ai-assistant-message-${message.role}`}
                >
                  {message.text}
                </div>
              ))}
              {aiAssistantMutation.isPending && (
                <div className='ai-assistant-message ai-assistant-message-assistant ai-assistant-message-thinking'>
                  <span className='ai-assistant-thinking-dot'></span>
                  <span className='ai-assistant-thinking-dot'></span>
                  <span className='ai-assistant-thinking-dot'></span>
                </div>
              )}
            </div>

            {suggestedProducts.length > 0 && (
              <div className='ai-assistant-products'>
                <div className='ai-assistant-products-title'>Suggested Products</div>
                <div className='ai-assistant-products-list'>
                  {suggestedProducts.map((product) => (
                    <div className='ai-assistant-product-card' key={product.id}>
                      <img src={product.image} alt={product.name} />
                      <div className='ai-assistant-product-info'>
                        <div className='ai-assistant-product-name'>{product.name}</div>
                        <div className='ai-assistant-product-price'>
                          {formatMoney(product.priceCents)}
                        </div>
                      </div>
                      <button
                        className='ai-assistant-product-action button-primary'
                        type='button'
                        onClick={() => addSuggestedProductToCart(product.id)}
                        disabled={addToCartMutation.isPending}
                      >
                        {addedProductId === product.id ? 'Added' : 'Add to Cart'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className='ai-assistant-input-row'>
            <input
              className='ai-assistant-input'
              type='text'
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => event.key === 'Enter' && submitMessage()}
              placeholder='Ask for gifts, budget picks, or product ideas'
              aria-label='Ask the AI shopping assistant'
            />
            <button
              className='ai-assistant-send button-primary'
              type='button'
              onClick={submitMessage}
              disabled={!canSend}
            >
              Send
            </button>
          </div>
          {cartError && <div className='ai-assistant-cart-error'>{cartError}</div>}
        </div>
      )}

      <button
        className='ai-assistant-trigger'
        type='button'
        onClick={() => setIsOpen((currentState) => !currentState)}
        aria-label='Open AI shopping assistant'
      >
        <span className='ai-assistant-trigger-icon' aria-hidden='true'>
          {'\u2726'}
        </span>
        <span>AI Assistant</span>
      </button>
    </div>
  );
}

export default AiAssistantChat;

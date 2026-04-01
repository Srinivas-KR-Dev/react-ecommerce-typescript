import { useMemo, useState } from 'react';
import { useAiAssistant } from '../hooks/useApi';
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
  const aiAssistantMutation = useAiAssistant();

  const canSend = input.trim().length > 0 && !aiAssistantMutation.isPending;

  const assistantStatus = useMemo(() => {
    if (aiAssistantMutation.isPending) {
      return 'Thinking...';
    }

    if (aiAssistantMutation.isError) {
      return 'Assistant is temporarily unavailable.';
    }

    return 'Ask for recommendations, budget picks, or category help.';
  }, [aiAssistantMutation.isError, aiAssistantMutation.isPending]);

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

          <div className='ai-assistant-messages'>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`ai-assistant-message ai-assistant-message-${message.role}`}
              >
                {message.text}
              </div>
            ))}
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
                  </div>
                ))}
              </div>
            </div>
          )}

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

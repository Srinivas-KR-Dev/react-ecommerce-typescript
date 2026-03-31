import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Cart, CartItem } from '../types/cart';
import type { DeliveryOptions } from '../types/deliveryOptions';
import type { Order, Orders } from '../types/orders';
import type { PaymentSummary } from '../types/paymentSummary';
import type { Product } from '../types/product';

const API_BASE_URL = '/api';

// ============ QUERIES ============

/**
 * Fetch cart items with expanded product data
 */
export const useGetCartItems = () => {
  return useQuery<Cart>({
    queryKey: ['cart-items'],
    queryFn: async (): Promise<Cart> => {
      const response = await axios.get<Cart>(
        `${API_BASE_URL}/cart-items?expand=product`,
      );
      return response.data;
    },
  });
};

/**
 * Fetch products with optional search
 */
export const useGetProducts = (search?: string) => {
  return useQuery<Product[]>({
    queryKey: ['products', search],
    queryFn: async (): Promise<Product[]> => {
      const urlPath = search
        ? `${API_BASE_URL}/products?search=${search}`
        : `${API_BASE_URL}/products`;
      const response = await axios.get<Product[]>(urlPath);
      return response.data;
    },
  });
};

export const useAiSearch = (query?: string) => {
  return useQuery({
    queryKey: ['ai-search', query],
    queryFn: async () => {
      const response = await axios.get(
        `/api/ai-search?query=${encodeURIComponent(query ?? '')}`,
      );
      return response.data;
    },
    enabled: !!query?.trim(),
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * Fetch delivery options with expanded data
 */
export const useGetDeliveryOptions = () => {
  return useQuery<DeliveryOptions>({
    queryKey: ['delivery-options'],
    queryFn: async (): Promise<DeliveryOptions> => {
      const response = await axios.get<DeliveryOptions>(
        `${API_BASE_URL}/delivery-options?expand=estimatedDeliveryTime`,
      );
      return response.data;
    },
  });
};

/**
 * Fetch payment summary
 */
export const useGetPaymentSummary = (cartDependency?: unknown) => {
  return useQuery<PaymentSummary>({
    queryKey: ['payment-summary', cartDependency],
    queryFn: async (): Promise<PaymentSummary> => {
      const response = await axios.get<PaymentSummary>(
        `${API_BASE_URL}/payment-summary`,
      );
      return response.data;
    },
  });
};

/**
 * Fetch all orders
 */
export const useGetOrders = () => {
  return useQuery<Orders>({
    queryKey: ['orders'],
    queryFn: async (): Promise<Orders> => {
      const response = await axios.get<Orders>(
        `${API_BASE_URL}/orders?expand=products`,
      );
      return response.data;
    },
  });
};

/**
 * Fetch a single order by ID
 */
export const useGetOrderById = (orderId?: string) => {
  return useQuery<Order>({
    queryKey: ['order', orderId],
    queryFn: async (): Promise<Order> => {
      const response = await axios.get<Order>(
        `${API_BASE_URL}/orders/${orderId}?expand=products`,
      );
      return response.data;
    },
    enabled: !!orderId,
  });
};

// ============ MUTATIONS ============

/**
 * Add item to cart
 */
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation<CartItem, Error, { productId: string; quantity: number }>({
    mutationFn: async (
      data: { productId: string; quantity: number },
    ): Promise<CartItem> => {
      const response = await axios.post<CartItem>(
        `${API_BASE_URL}/cart-items`,
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart-items'] });
      queryClient.invalidateQueries({ queryKey: ['payment-summary'] });
    },
  });
};

/**
 * Update cart item quantity or delivery option
 */
export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CartItem,
    Error,
    {
      itemId: string;
      quantity?: number;
      deliveryOptionId?: string;
    }
  >({
    mutationFn: async (data: {
      itemId: string;
      quantity?: number;
      deliveryOptionId?: string;
    }): Promise<CartItem> => {
      const response = await axios.put<CartItem>(
        `${API_BASE_URL}/cart-items/${data.itemId}`,
        {
          ...(data.quantity !== undefined && { quantity: data.quantity }),
          ...(data.deliveryOptionId !== undefined && {
            deliveryOptionId: data.deliveryOptionId,
          }),
        },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart-items'] });
      queryClient.invalidateQueries({ queryKey: ['payment-summary'] });
    },
  });
};

/**
 * Remove item from cart
 */
export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (itemId: string): Promise<void> => {
      await axios.delete(`${API_BASE_URL}/cart-items/${itemId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart-items'] });
      queryClient.invalidateQueries({ queryKey: ['payment-summary'] });
    },
  });
};

/**
 * Create order
 */
export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<Order, Error, void>({
    mutationFn: async (): Promise<Order> => {
      const response = await axios.post<Order>(`${API_BASE_URL}/orders`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['cart-items'] });
      queryClient.invalidateQueries({ queryKey: ['payment-summary'] });
    },
  });
};

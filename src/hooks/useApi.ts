import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Cart } from '../types/cart';

const API_BASE_URL = '/api';

// ============ QUERIES ============

/**
 * Fetch cart items with expanded product data
 */
export const useGetCartItems = () => {
  return useQuery({
    queryKey: ['cart-items'],
    queryFn: async () => {
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
  return useQuery({
    queryKey: ['products', search],
    queryFn: async () => {
      const urlPath = search
        ? `${API_BASE_URL}/products?search=${search}`
        : `${API_BASE_URL}/products`;
      const response = await axios.get(urlPath);
      return response.data;
    },
  });
};

/**
 * Fetch delivery options with expanded data
 */
export const useGetDeliveryOptions = () => {
  return useQuery({
    queryKey: ['delivery-options'],
    queryFn: async () => {
      const response = await axios.get(
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
  return useQuery({
    queryKey: ['payment-summary', cartDependency],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/payment-summary`);
      return response.data;
    },
  });
};

/**
 * Fetch all orders
 */
export const useGetOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await axios.get(
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
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => {
      const response = await axios.get(
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

  return useMutation({
    mutationFn: async (data: { productId: string; quantity: number }) => {
      const response = await axios.post(`${API_BASE_URL}/cart-items`, data);
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

  return useMutation({
    mutationFn: async (data: {
      itemId: string;
      quantity?: number;
      deliveryOptionId?: string;
    }) => {
      const response = await axios.put(
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

  return useMutation({
    mutationFn: async (itemId: string) => {
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

  return useMutation({
    mutationFn: async () => {
      const response = await axios.post(`${API_BASE_URL}/orders`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['cart-items'] });
      queryClient.invalidateQueries({ queryKey: ['payment-summary'] });
    },
  });
};

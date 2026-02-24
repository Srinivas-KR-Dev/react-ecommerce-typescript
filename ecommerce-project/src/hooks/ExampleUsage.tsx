/**
 * EXAMPLE: How to use TanStack Query in your components
 */

import { useGetCartItems, useAddToCart, useRemoveFromCart } from '../hooks/useApi';

export const ExampleCartComponent = () => {
    // Fetch cart items
    const { data: cart, isLoading, error } = useGetCartItems();

    // Add to cart mutation
    const addToCart = useAddToCart();

    // Remove from cart mutation
    const removeFromCart = useRemoveFromCart();

    if (isLoading) return <div>Loading cart...</div>;
    if (error) return <div>Error loading cart: {error.message}</div>;

    const handleAddToCart = async (productId: string) => {
        try {
            await addToCart.mutateAsync({ productId, quantity: 1 });
            // The cart will automatically refetch due to queryClient.invalidateQueries
        } catch (error) {
            console.error('Failed to add to cart:', error);
        }
    };

    const handleRemoveFromCart = async (productId: string) => {
        try {
            await removeFromCart.mutateAsync(productId);
        } catch (error) {
            console.error('Failed to remove from cart:', error);
        }
    };

    return (
        <div>
            <h1>Cart Items ({cart?.length || 0})</h1>
            {cart?.map((item) => (
                <div key={item.productId}>
                    <h3>{item.product?.name}</h3>
                    <button
                        onClick={() => handleRemoveFromCart(item.productId)}
                        disabled={removeFromCart.isPending}
                    >
                        {removeFromCart.isPending ? 'Removing...' : 'Remove'}
                    </button>
                </div>
            ))}

            <button
                onClick={() => handleAddToCart('product-123')}
                disabled={addToCart.isPending}
            >
                {addToCart.isPending ? 'Adding...' : 'Add to Cart'}
            </button>
        </div>
    );
};

/**
 * USAGE SUMMARY:
 * 
 * For QUERIES (GET requests):
 * const { data, isLoading, error, isFetching, refetch } = useGetCartItems();
 * - data: The fetched data
 * - isLoading: True on initial load
 * - error: Any error that occurred
 * - isFetching: True while any request is in flight
 * - refetch(): Manually refetch the data
 * 
 * For MUTATIONS (POST/PUT/DELETE requests):
 * const mutation = useAddToCart();
 * - mutation.mutate(data): Fire and forget
 * - await mutation.mutateAsync(data): Wait for completion
 * - mutation.isPending: True while request is in flight
 * - mutation.isSuccess: True after successful mutation
 * - mutation.error: Any error that occurred
 * 
 * DEVTOOLS:
 * - Open DevTools by pressing Ctrl+Alt+Q (or Cmd+Opt+Q on Mac)
 * - Search in browser dev tools for "React Query"
 */

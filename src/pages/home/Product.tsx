import { useState, type ChangeEvent } from "react";
import CheckmarkIcon from "../../assets/images/icons/checkmark.png";
import { useAddToCart } from "../../hooks/useApi";
import type { Product as ProductType } from "../../types/product";
import { formatMoney } from "../../utils/money";

type ProductProps = {
  product: ProductType;
};

function Product({ product }: ProductProps) {
  const [quantity, setQuantity] = useState(1);
  const [displayAddedMessage, setDisplayAddedMessage] = useState(false);
  const addToCartMutation = useAddToCart();

  const addToCart = async () => {
    try {
      await addToCartMutation.mutateAsync({
        productId: product.id,
        quantity,
      });
      setDisplayAddedMessage(true);
      setTimeout(() => {
        setDisplayAddedMessage(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const selectQuantity = (event: ChangeEvent<HTMLSelectElement>) => {
    setQuantity(Number(event.target.value));
  };

  return (
    <div className="product-container" data-testid="product-container">
      <div className="product-image-container">
        <img
          className="product-image"
          data-testid="product-image"
          src={product.image}
        />
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          data-testid="product-rating-stars"
          src={`images/ratings/rating-${product.rating.stars * 10}.png`}
        />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">{formatMoney(product.priceCents)}</div>

      <div className="product-quantity-container">
        <select
          value={quantity}
          onChange={selectQuantity}
          data-testid="product-quantity-selector"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>

      <div
        className="added-to-cart"
        style={{
          opacity: displayAddedMessage ? 1 : 0,
        }}
      >
        <img src={CheckmarkIcon} />
        Added
      </div>

      <button
        className="add-to-cart-button button-primary"
        data-testid="add-to-cart-button"
        onClick={addToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default Product;

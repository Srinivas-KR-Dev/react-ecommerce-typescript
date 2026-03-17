import { Link } from 'react-router';
import CheckoutLockIcon from '../../assets/images/icons/checkout-lock-icon.png';
import LogoDark from '../../assets/images/logo-dark.svg';
import LogoLight from '../../assets/images/logo-light.svg';
import MobileLogoDark from '../../assets/images/mobile-logo-dark.svg';
import MobileLogoLight from '../../assets/images/mobile-logo-light.svg';
import './CheckoutHeader.css';
import type { Cart } from '../../types/cart';
import { useTheme } from '../../context/ThemeContext';

type CheckoutHeaderProps = {
  cart: Cart;
};

function CheckoutHeader({ cart }: CheckoutHeaderProps) {
  const { theme, toggleTheme } = useTheme();

  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  return (
    <div className="checkout-header">
      <div className="header-content">
        <div className="checkout-header-left-section">
          <Link to="/">
            <img
              className="logo"
              src={theme === 'dark' ? LogoLight : LogoDark}
              alt="Srinivas KR Dev logo"
            />
            <img
              className="mobile-logo"
              src={theme === 'dark' ? MobileLogoLight : MobileLogoDark}
              alt="S KR Dev logo"
            />
          </Link>
        </div>

        <div className="checkout-header-middle-section">
          Checkout (
          <Link className="return-to-home-link" to="/">
            {totalQuantity} items
          </Link>
          )
        </div>

        <div className="checkout-header-right-section">
          <button className="theme-toggle-button" type="button" onClick={toggleTheme}>
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          <img src={CheckoutLockIcon} alt="" />
        </div>
      </div>
    </div>
  );
}

export default CheckoutHeader;

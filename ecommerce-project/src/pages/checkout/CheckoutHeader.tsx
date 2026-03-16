import { Link } from 'react-router';
import CheckoutLockIcon from '../../assets/images/icons/checkout-lock-icon.png';
import Logo from '../../assets/images/logo.png';
import MobileLogo from '../../assets/images/mobile-logo.png';
import './CheckoutHeader.css';
import type { Cart } from '../../types/cart';
import { useTheme } from '../../context/ThemeContext';

type CheckoutHeaderProps = {
    cart: Cart
}

function CheckoutHeader({ cart }: CheckoutHeaderProps) {
    const { theme, toggleTheme } = useTheme();


    let totalQuantity = 0;


    cart.forEach((cartItem) => {

        totalQuantity += cartItem.quantity

    });

    return (

        <div className="checkout-header">
            <div className="header-content">
                <div className="checkout-header-left-section">
                    <Link to="/">
                        <img className="logo" src={Logo} />
                        <img className="mobile-logo" src={MobileLogo} />
                    </Link>
                </div>

                <div className="checkout-header-middle-section">
                    Checkout (<Link className="return-to-home-link"
                        to="/">{totalQuantity} items</Link>)
                </div>

                <div className="checkout-header-right-section">
                    <button className="theme-toggle-button" type="button" onClick={toggleTheme}>
                        {theme === 'dark' ? 'Light' : 'Dark'}
                    </button>
                    <img src={CheckoutLockIcon} />
                </div>
            </div>
        </div>
    );
}

export default CheckoutHeader;

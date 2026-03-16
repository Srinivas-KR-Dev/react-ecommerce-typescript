import { NavLink, useNavigate, useSearchParams } from 'react-router';
import { useEffect, useState, type ChangeEvent } from 'react';
import { useGetCartItems } from '../hooks/useApi';
import CartIcon from '../assets/images/icons/cart-icon.png';
import SearchIcon from '../assets/images/icons/search-icon.png';
import Logo from '../assets/images/logo.png';
import LogoWhite from '../assets/images/logo-white.png';
import MobileLogo from '../assets/images/mobile-logo.png';
import MobileLogoWhite from '../assets/images/mobile-logo-white.png';
import { useTheme } from '../context/ThemeContext';
import './Header.css';

function Header() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const searchText = searchParams.get('search');
    const [search, setSearch] = useState(searchText ?? '');
    const { data: cart = [] } = useGetCartItems();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {

        setSearch(searchText ?? '');

    }, [searchText]);

    const updateSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }

    const searchProducts = () => {
        navigate(`/?search=${search}`);
        /* setSearchParams(
            {search: search} )*/


    }


    let totalQuantity = 0;

    cart.forEach((cartItem) => {

        totalQuantity += cartItem.quantity

    });



    return (



        <div className="header">

            <div className="left-section">
                <NavLink to="/" className="header-link">
                    <img className="logo"
                        src={theme === 'dark' ? LogoWhite : Logo} />
                    <img className="mobile-logo"
                        src={theme === 'dark' ? MobileLogoWhite : MobileLogo} />
                </NavLink>
            </div>

            <div className="middle-section">
                <input
                    className="search-bar"
                    type="text" placeholder="Search"
                    value={search}
                    onChange={updateSearchInput} />

                <button className="search-button" onClick={searchProducts}>
                    <img className="search-icon" src={SearchIcon} />
                </button>
            </div>

            <div className="right-section">
                <button className="theme-toggle-button" type="button" onClick={toggleTheme}>
                    {theme === 'dark' ? 'Light' : 'Dark'}
                </button>

                <NavLink className="orders-link header-link" to="/orders">

                    <span className="orders-text">Orders</span>
                </NavLink>

                <NavLink className="cart-link header-link" to="/checkout">
                    <img className="cart-icon" src={CartIcon} />
                    <div className="cart-quantity">{totalQuantity}</div>
                    <div className="cart-text">Cart</div>
                </NavLink>
            </div>
        </div>

    );
}

export default Header

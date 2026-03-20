import { useEffect, useState, type ChangeEvent } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router';
import CartIcon from '../assets/images/icons/cart-icon.png';
import SearchIcon from '../assets/images/icons/search-icon.png';
import LogoDark from '../assets/images/logo-dark.svg';
import LogoLight from '../assets/images/logo-light.svg';
import MobileLogoDark from '../assets/images/mobile-logo-dark.svg';
import MobileLogoLight from '../assets/images/mobile-logo-light.svg';
import { useTheme } from '../context/ThemeContext';
import { useGetCartItems } from '../hooks/useApi';
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
  };

  const searchProducts = () => {
    navigate(`/?search=${search}`);
  };

  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  return (
    <div className='header'>
      <div className='left-section'>
        <NavLink to='/' className='header-link'>
          <img
            className='logo'
            src={theme === 'dark' ? LogoLight : LogoDark}
            alt='Srinivas KR Dev logo'
          />
          <img
            className='mobile-logo'
            src={theme === 'dark' ? MobileLogoLight : MobileLogoDark}
            alt='S KR Dev logo'
          />
        </NavLink>
      </div>

      <div className='middle-section'>
        <input
          className='search-bar'
          type='text'
          placeholder='Search'
          value={search}
          onChange={updateSearchInput}
        />

        <button className='search-button' onClick={searchProducts}>
          <img className='search-icon' src={SearchIcon} />
        </button>
      </div>

      <div className='right-section'>
        <button
          className='theme-toggle-button'
          type='button'
          onClick={toggleTheme}
        >
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>

        <NavLink className='orders-link header-link' to='/orders'>
          <span className='orders-text'>Orders</span>
        </NavLink>

        <NavLink className='cart-link header-link' to='/checkout'>
          <img className='cart-icon' src={CartIcon} />
          <div className='cart-quantity'>{totalQuantity}</div>
          <div className='cart-text'>Cart</div>
        </NavLink>
      </div>
    </div>
  );
}

export default Header;

import { useEffect, useState, type ChangeEvent } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router';
import CartIcon from '../assets/images/icons/cart-icon.png';
import SearchIcon from '../assets/images/icons/search-icon.png';
import LogoLight from '../assets/images/logo-light.svg';
import MobileLogoLight from '../assets/images/mobile-logo-light.svg';
import { useTheme } from '../context/ThemeContext';
import { useGetCartItems } from '../hooks/useApi';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get('search');
  const aiMode = searchParams.get('ai') === 'true';
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
    const trimmed = search.trim();

    // If the search is empty, go to the home route without a query param.
    if (!trimmed) {
      navigate('/');
      return;
    }

    // Encode to keep special characters (spaces, %) from breaking the query string.
    navigate(`/?search=${encodeURIComponent(trimmed)}`);
  };

  const searchWithAi = () => {
    const trimmed = search.trim();
    if (!trimmed) return;

    navigate(`/?search=${encodeURIComponent(trimmed)}&ai=true`);
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
            src={LogoLight}
            alt='Srinivas KR Dev logo'
          />
          <img
            className='mobile-logo'
            src={MobileLogoLight}
            alt='S KR Dev logo'
          />
        </NavLink>
      </div>

      <div className='middle-section'>
        <input
          className='search-bar'
          type='text'
          placeholder='Search or try "shoes under ₹1500"'
          value={search}
          onChange={updateSearchInput}
          onKeyDown={(e) => e.key === 'Enter' && searchProducts()}
          aria-label='Search products'
        />

        <button
          className={`ai-pill ${aiMode ? 'active' : ''}`}
          onClick={searchWithAi}
          type='button'
          title={
            !search.trim()
              ? 'Type a search query first'
              : 'Search with AI'
          }
          aria-label='Search with AI'
        >
          <span className='ai-pill-icon' aria-hidden='true'>
            {'\u2726'}
          </span>
          <span>AI Search</span>
        </button>

        <button
          className='search-button'
          onClick={searchProducts}
          aria-label='Search products'
        >
          <img className='search-icon' src={SearchIcon} alt='' />
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
          <img className='cart-icon' src={CartIcon} alt='' />
          <div className='cart-quantity'>{totalQuantity}</div>
          <div className='cart-text'>Cart</div>
        </NavLink>
      </div>
    </div>
  );
}

export default Header;



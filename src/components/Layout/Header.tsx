import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.scss';
import logo from '../../assets/images/logo.svg';
import {
  SearchIcon,
  NotificationIcon,
  DropdownArrowIcon,
} from '../../assets/icons';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    navigate('/login');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="header">
      <button
        className="header__menu-toggle"
        onClick={onMenuClick}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className="header__logo">
        <img src={logo} alt="Lendsqr" />
      </div>

      <div className="header__search">
        <input
          type="text"
          className="header__search-input"
          placeholder="Search for anything"
        />
        <button className="header__search-button">
          <SearchIcon />
        </button>
      </div>

      <div className="header__right">
        <a href="#" className="header__docs">
          Docs
        </a>

        <div className="header__notification">
          <NotificationIcon />
        </div>

        <div className="header__user" onClick={toggleDropdown}>
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
            alt="User avatar"
            className="header__user-avatar"
          />
          <span className="header__user-name">Adedeji</span>
          <div className="header__user-dropdown">
            <DropdownArrowIcon />
          </div>

          {isDropdownOpen && (
            <div className="header__user-menu">
              <button className="header__user-menu-item" onClick={handleLogout}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H6"
                    stroke="#545F7D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.6667 11.3333L14 8L10.6667 4.66667"
                    stroke="#545F7D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 8H6"
                    stroke="#545F7D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

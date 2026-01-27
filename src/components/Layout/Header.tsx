import './Header.scss';
import logo from '../../assets/images/logo.svg';
import {
  SearchIcon,
  NotificationIcon,
  DropdownArrowIcon,
} from '../../assets/icons';

const Header = () => {
  return (
    <header className="header">
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

        <div className="header__user">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
            alt="User avatar"
            className="header__user-avatar"
          />
          <span className="header__user-name">Adedeji</span>
          <div className="header__user-dropdown">
            <DropdownArrowIcon />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import SearchBar from './SearchBar';

import './Navbar.css';
import { ReactComponent as Logo } from '../assets/logo.svg';

export default function Navbar() {
  const { color, mode } = useContext(ThemeContext);

  return (
    <div className="navbar" style={{ background: color }}>
      <nav>
        <NavLink to="/" className="brand">
          <Logo className={`navbar__logo navbar__logo--${mode}`} />
        </NavLink>
        <SearchBar />
        <NavLink to="/create">Create recipe</NavLink>
      </nav>
    </div>
  );
}

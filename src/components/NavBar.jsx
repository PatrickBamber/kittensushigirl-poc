import { NavLink } from 'react-router-dom'
import './NavBar.css'

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-cat">🐱</span>
        <span className="brand-text">KittenSushiGirl</span>
        <span className="brand-sushi">🍣</span>
      </div>
      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Home
        </NavLink>
        <NavLink to="/pat" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          About Pat
        </NavLink>
        <NavLink to="/game" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Pac-Man
        </NavLink>
      </div>
    </nav>
  )
}

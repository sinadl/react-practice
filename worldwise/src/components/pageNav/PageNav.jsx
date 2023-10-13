import { NavLink } from "react-router-dom"
import styles from './PageNav.module.css'
import Logo from '../logo/Logo'

export default function PageNav() {
  return (
    <nav className={styles.nav}>
        <NavLink to='/'>
            <Logo/>
        </NavLink>
        
        <ul>
            <li>
                <NavLink to="/pricing">Pricing</NavLink>
            </li>
            <li>
                <NavLink to="/product">Product</NavLink>
            </li>
            <li>
                <NavLink to="/login">Login</NavLink>
            </li>
        </ul>
    </nav>
  )
}

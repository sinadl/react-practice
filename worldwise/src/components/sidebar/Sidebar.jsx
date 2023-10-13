import AppNav from '../appNav/AppNav'
import styles from './Sidebar.module.css'
import Logo from '../logo/Logo'
import { Outlet } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
        <Logo/>
        <AppNav/>
        
        <Outlet/>
        <footer className={styles.footer}>
            <p className={styles.copyright}>
                &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
            </p>
        </footer>
    </div>
  )
}

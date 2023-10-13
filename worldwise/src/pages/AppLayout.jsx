import styles from './AppLayout.module.css'

// import AppNav from "../components/appNav/AppNav";
import Sidebar from "../components/sidebar/Sidebar";
import Map from '../components/map/Map';

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar/>
      <Map/>
    </div>
  )
}

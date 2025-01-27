import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'
import { useAuthValue } from '../context/AuthContex'
import {useAuthentication} from '../hooks/userAuthentication'

const Navbar = () => {

const {user} = useAuthValue();
const {logout} = useAuthentication();

  return (
    <nav className={styles.navbar}>
        <NavLink to='/' className={styles.brand}>
            Mine <span>blog</span>
        </NavLink>
        <ul className={styles.links_list}>
        
        
            <li>
                <NavLink to='/' 
                    className={({isActive})=>(isActive ? styles.active : '')}
                    >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to='/about' 
                className={({isActive})=>(isActive ? styles.active : '')}
                >
                    Sobre
                </NavLink>
            </li>
            
           

            
            {user && (<>
            <li>
                <NavLink to='/dashboard' className={({isActive}) => (isActive ? styles.active : '')}>
                    Dashboard 
                </NavLink>
            </li>
            <li>
                <NavLink to='/posts/create' className={({isActive}) => (isActive ? styles.active : '')}>
                    Novo Post 
                </NavLink>
            </li>
            <li>
                <button onClick={logout}>Sair</button>
            </li>

            </>)}
            {!user && (<>
                <li>
                    <NavLink to='/login' className={({isActive})=>(isActive ? styles.active : '')}>Entrar</NavLink>
                </li>
                <li>
                    <NavLink to='/cadastrar' className={({isActive})=>(isActive ? styles.active : '')}>Cadastrar</NavLink>
                </li>
            </>)}

        </ul>
    </nav>
  )
}

export default Navbar
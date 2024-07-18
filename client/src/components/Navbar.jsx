import Logo from '../assets/BK lie.jpg';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

const Navbar = () => {
    return (
        <nav className='nav'>
            <div className='site-logo'>
                <Link to="/">
                    <img src={Logo} />
                </Link>
            </div>
            <div className='site-pages'>
                <ul>
                    <Link to="/">Home</Link>
                    <a href='/map'>Search</a>
                    <Link to="/appointment">Appointment</Link>
                    <Link to="/contact">Contact</Link>
                </ul>
            </div>
            <div className='lgn-sgp'>
                <Dropdown>
                    <DropdownTrigger>
                        <Button variant="shadow" >Open Menu</Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions" className='dropdown-menu'>
                        <DropdownItem className='item'><Link to="/login">Login</Link></DropdownItem>
                        <DropdownItem className='item'><Link to="/sign-up">Sign Up</Link></DropdownItem>
                        <DropdownItem className='item'><Link to="/account">Account</Link></DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </nav>
    )
}
// const CustomLink = ({to, children, ...props}) => {
//     const path = window.location.pathname;
//     return (
//         <li className={path === to ? "active" : ""}>
//             <Link to={to} {...props}>
//                 {children}
//             </Link>
//         </li>
//     )
// }

export default Navbar;
import Logo from '../assets/logo.jpg';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

const Navbar = () => {
    return (
        <nav className='nav'>
            <div className='site-title'>
                <Link to="/">
                    <img className='logo' src={Logo} alt="HT-healthcare Logo" />
                </Link>
                <Link to="/" className='site-name'>HT Healthcare</Link>
            </div>
            <div className='site-pages'>
                <ul>
                    <CustomLink to="/">Home</CustomLink>
                    <CustomLink to="/map">Nearby Hospital</CustomLink>
                    <CustomLink to="/appointment">Appointment</CustomLink>
                    <CustomLink to="/contact">Contact</CustomLink>
                </ul>
            </div>
            <div className='lgn-sgp'>
                <Dropdown>
                    <DropdownTrigger>
                        <Button 
                        variant="shadow" 
                        >
                        Open Menu
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions" className='dropdown-menu'>
                        <DropdownItem ><CustomLink to="/login">Login</CustomLink></DropdownItem>
                        <DropdownItem ><CustomLink to="/sign-up">Sign Up</CustomLink></DropdownItem>
                        <DropdownItem ><CustomLink to="/account">Account</CustomLink></DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                    {/* <ul>
                        <CustomLink to="/login">Login</CustomLink>
                        <CustomLink to="/sign-up">Sign Up</CustomLink>
                    </ul> */}
            </div>
        </nav>
    )
}

const CustomLink = ({to, children, ...props}) => {
    const path = window.location.pathname;

    return (
        <li className={path === to ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}

export default Navbar;
import Logo from '../assets/BK lie.jpg';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

export const navLinks = [
    {id: 1, path: "/", element: "Home"},
    {id: 2, path: "/map", element: "Search"},
    {id: 3, path: "/appointment", element: "Appointment"},
    {id: 4, path: "/contact", element: "Contact"},
]

const Navbar = () => {
    return (
        <nav className='nav'>
            <div className='site-logo'>
                <Link to="/">
                    <img src={Logo} />
                </Link>
            </div>
            <div className='site-pages' 
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "5vw"
                }}
            >
                {navLinks.map((navLink) => (
                    <Button
                        key={navLink.id}
                        as={Link}
                        to={navLink.path}
                    >
                        {navLink.element}
                    </Button>
                ))}
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
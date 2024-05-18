import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Dialog } from '@material-tailwind/react'; 
import Auth from '../../Components/Auth';
import SignIn from '../../Authentication/SignIn';
import logo from '../../Assets/logo-white.png'
const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [openAuthDialog, setOpenAuthDialog] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Set toggle
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Toggle dark mode
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`pt-4 ud-header absolute left-0 top-0 z-40 flex w-full items-center ${isSticky ? 'bg-gray-800' : 'bg-transparent'} ${isSticky ? 'sticky' : ''}` }>
            <div className="container">
                <div className="relative -mx-4 flex items-center justify-between">
                    <div className="w-96 max-w-full px-4 ml-10">
                        <Link to="/" className="navbar-logo block w-full py-5">
                            <img
                                src={logo}
                                alt="logo"
                                className="header-logo"
                            />
                        </Link>
                    </div>
                    <div className="flex w-full items-center justify-between px-4">
                        <button
                            id="navbarToggler"
                            className="absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                            onClick={toggleMenu}
                        >
                            <span className="relative my-[6px]  block h-[2px] w-[30px] bg-white"></span>
                            <span className="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
                            <span className="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
                        </button>
                        <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
                            <nav
                                id="navbarCollapse"
                                className="absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white py-5 shadow-lg dark:bg-dark-2"
                            >
                                <ul className="block">
                                    <li className="group relative ">
                                        <Link
                                            to="/#home"
                                            className={`ud-menu-scroll mx-8 flex py-2 text-base font-medium 'text-dark'} group-hover:text-primary`}
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    <li className="group relative">
                                        <Link
                                            to="/#about"
                                            className={`ud-menu-scroll mx-8 flex py-2 text-base font-medium text-dark} group-hover:text-primary`}
                                        >
                                            About
                                        </Link>
                                    </li>
                                    <li className="group relative">
                                        <Link
                                            to="/#pricing"
                                            className={`ud-menu-scroll mx-8 flex py-2 text-base font-medium text-dark'} group-hover:text-primary`}
                                        >
                                            Pricing
                                        </Link>
                                    </li>
                                    <li className="group relative">
                                        <Link
                                            to="/#team"
                                            className={`ud-menu-scroll mx-8 flex py-2 text-base font-medium text-dark'} group-hover:text-primary`}
                                        >
                                            Team
                                        </Link>
                                    </li>
                                    <li className="group relative">
                                        <Link
                                            to="/#blog"
                                            className={`ud-menu-scroll mx-8 flex py-2 text-base font-medium text-dark'} group-hover:text-primary`}
                                        >
                                            Blog
                                        </Link>
                                    </li>
                                    <li className="group relative">
                                        <Link
                                            to="/#faq"
                                            className={`ud-menu-scroll mx-8 flex py-2 text-base font-medium text-dark group-hover:text-primary`}
                                        >
                                            FAQ
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        {/* Navigation links for larger screens */}
                        <div className={`hidden lg:flex w-full items-center justify-between px-4`}>
                            <ul className="flex">
                                
                               
                                
                                
                               
                            </ul>
                        </div>
                    </div>
                    <div className="flex items-center justify-end pr-16 lg:pr-0 mr-4">
                        
                        <div className="hidden sm:flex">
                        </div>
                    </div>
                </div>
            </div>
            <Dialog
                size="sm"
                open={openAuthDialog}
                handler={() => setOpenAuthDialog(false)}
                className="bg-transparent shadow-none"
            >
                <Auth /> 
            </Dialog>
        </header>
    );
};

export default NavBar;

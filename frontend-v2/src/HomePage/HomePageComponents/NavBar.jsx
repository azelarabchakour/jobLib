import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Dialog } from '@material-tailwind/react'; 
import Auth from '../../Components/Auth';

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [openAuthDialog, setOpenAuthDialog] = useState(false); 

    // Set toggle
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
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
        <header className={`ud-header absolute left-0 top-0 z-40 flex w-full items-center bg-transparent ${isSticky ? 'sticky' : ''}`}>
            <div className="container">
                <div className="relative -mx-4 flex items-center justify-between">
                    <div className="w-60 max-w-full px-4">
                        <Link to="/" className="navbar-logo block w-full py-5">
                            <img
                                src="assets/images/logo/logo-white.svg"
                                alt="logo"
                                className="header-logo w-full"
                            />
                        </Link>
                    </div>
                    <div className="flex w-full items-center justify-between px-4">
                        <button
                            id="navbarToggler"
                            className="absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                            onClick={toggleMenu}
                        >
                            <span className="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
                            <span className="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
                            <span className="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
                        </button>
                        <nav
                            id="navbarCollapse"
                            className={`absolute right-4 top-full hidden w-full max-w-[250px] rounded-lg bg-white py-5 shadow-lg dark:bg-dark-2 lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:px-4 lg:py-0 lg:shadow-none dark:lg:bg-transparent xl:px-6 ${isMenuOpen ? 'block' : 'hidden'}`}
                        >
                            <ul className="block lg:flex 2xl:ml-20">
                                <li className="group relative">
                                    <Link
                                        to="#home"
                                        className="ud-menu-scroll mx-8 flex py-2 text-base font-medium text-dark group-hover:text-primary dark:text-white lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li className="group relative">
                                    <Link
                                        to="#about"
                                        className="ud-menu-scroll mx-8 flex py-2 text-base font-medium text-dark group-hover:text-primary dark:text-white lg:ml-7 lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70 xl:ml-10"
                                    >
                                        About
                                    </Link>
                                </li>
                                <li className="group relative">
                                    <Link
                                        to="#pricing"
                                        className="ud-menu-scroll mx-8 flex py-2 text-base font-medium text-dark group-hover:text-primary dark:text-white lg:ml-7 lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70 xl:ml-10"
                                    >
                                        Pricing
                                    </Link>
                                </li>
                                <li className="group relative">
                                    <Link
                                        to="#team"
                                        className="ud-menu-scroll mx-8 flex py-2 text-base font-medium text-dark group-hover:text-primary dark:text-white lg:ml-7 lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70 xl:ml-10"
                                    >
                                        Team
                                    </Link>
                                </li>
                                <li className="group relative">
                                    <Link
                                        to="#blog"
                                        className="ud-menu-scroll mx-8 flex py-2 text-base font-medium text-dark group-hover:text-primary dark:text-white lg:ml-7 lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70 xl:ml-10"
                                    >
                                        Blog
                                    </Link>
                                </li>
                                <li className="group relative">
                                    <Link
                                        to="#faq"
                                        className="ud-menu-scroll mx-8 flex py-2 text-base font-medium text-dark group-hover:text-primary dark:text-white lg:ml-7 lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70 xl:ml-10"
                                    >
                                        FAQ
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="flex items-center justify-end pr-16 lg:pr-0">
                        <label
                            htmlFor="themeSwitcher"
                            className="inline-flex cursor-pointer items-center"
                            aria-label="themeSwitcher"
                            name="themeSwitcher"
                        >
                            {/* Add the theme switcher input and SVG icons here */}
                        </label>
                        <div className="hidden sm:flex">
                        {/* <Auth
                                variant="link"
                                size="sm"
                                className="loginBtn px-[22px] py-2 text-base font-medium text-white hover:opacity-70"                            >
                                Sign In
                            </Auth> */}
                            {/* Sign-up button */}
                            <Auth
                                variant="outlined"
                                size="sm"
                                className="signUpBtn rounded-md bg-white bg-opacity-20 px-6 py-2 text-base font-medium text-white duration-300 ease-in-out hover:bg-opacity-100 hover:text-dark"
                            >
                                Sign Up
                            </Auth>
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

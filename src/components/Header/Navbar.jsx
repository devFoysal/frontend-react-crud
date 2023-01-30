import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Cookies from 'universal-cookie';

const Navbar = () => {
    const cookies = new Cookies();
    return (
        <header className='bg-white shadow-md'>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <span className="self-center text-xl font-semibold whitespace-nowrap ">
                            Foysal
                        </span>
                    </Link>
                    <div className="flex items-center lg:order-2">
                        {cookies.get('isAuthenticated') ? (
                            <Link
                                to="/admin/products"
                                className="text-gray-800  focus:ring-4 focus:bg-sky-200 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 bg-sky-100"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                to="/signin"
                                className="text-gray-800  focus:ring-4 focus:bg-sky-200 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 bg-sky-100"
                            >
                                Sign in
                            </Link>
                        )}

                        <button
                            data-collapse-toggle="mobile-menu-2"
                            type="button"
                            className="inline-flex items-center px-3 py-2 rounded-sm ml-1 text-sm text-gray-500 lg:hidden hover:bg-gray-100 "
                            aria-controls="mobile-menu-2"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <svg
                                className="hidden w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                    to="/"
                                    className="block py-2 pr-4 pl-3 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700  "
                                    aria-current="page"
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/about"
                                    className="block py-2 pr-4 pl-3 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700"
                                >
                                    About Us
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/contact"
                                    className="block py-2 pr-4 pl-3 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700"
                                >
                                    Contact
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
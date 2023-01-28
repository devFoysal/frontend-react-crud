import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="p-4 bg-white shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {currentYear} <Link to="https://flowbite.com" className="hover:underline" target="_blank">FOYSAL</Link>. All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 sm:mt-0">
                <li>
                    <Link to="#" className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400">About</Link>
                </li>
                <li>
                    <Link to="#" className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Privacy Policy</Link>
                </li>
                <li>
                    <Link to="#" className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Licensing</Link>
                </li>
                <li>
                    <Link to="#" className="text-sm text-gray-500 hover:underline dark:text-gray-400">Contact</Link>
                </li>
            </ul>
        </footer>
    )
}

export default Footer
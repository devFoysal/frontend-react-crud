import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="p-4 bg-white shadow flex  items-center justify-center md:p-6 ">
            <span className="text-sm text-gray-500 sm:text-center ">© {currentYear} <Link to="https://flowbite.com" className="hover:underline" target="_blank">FOYSAL</Link>. All Rights Reserved.
            </span>

        </footer>
    )
}

export default Footer
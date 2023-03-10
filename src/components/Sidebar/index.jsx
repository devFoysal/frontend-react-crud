import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AiOutlineDashboard, AiOutlineLogout, AiOutlineShopping, AiOutlineUser } from "react-icons/ai";
import { useSignOutMutation } from '../../app/features/auth/authApiSlice';
import Cookies from 'universal-cookie';

const Sidebar = () => {
    const cookies = new Cookies();

    const navigate = useNavigate()
    const [signOut] = useSignOutMutation()

    const handelSignOut = (e) => {
        e.preventDefault();
        try {
            signOut().unwrap().then(res => {
                if (res?.status) {
                    cookies.remove('user')
                    cookies.remove('isAuthenticated')
                }
            })
            navigate('/');
        } catch (error) {
            console.error(`Error: ${error}`)
        }
    }

    return (
        <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 min-h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className='py-3 text-center border-b border-gray-200'>
                <Link to="/">
                    <span className="capitalize self-center text-xl font-semibold whitespace-nowrap ">
                        {cookies?.get('user')?.username}
                    </span>
                </Link>
            </div>
            <div className="h-full overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <div className='flex flex-col justify-between min-h-screen'>
                    <ul >

                        <li>
                            <NavLink to="/admin/products" className="flex items-center p-3 text-base font-normal text-gray-900   hover:bg-sky-100 dark:hover:bg-gray-700">
                                <AiOutlineShopping size="1.3em" />
                                <span className="flex-1 ml-3 whitespace-nowrap">Products</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="javascript:void()" onClick={handelSignOut} className="flex items-center p-3 text-base font-normal text-gray-900   hover:bg-sky-100 dark:hover:bg-gray-700">
                                <AiOutlineLogout size="1.3em" />
                                <span className="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
                            </NavLink>
                        </li>
                    </ul>

                </div>
            </div>
        </aside>
    )
}

export default Sidebar
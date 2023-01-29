import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useSignInMutation, useSignUpMutation } from '../../app/features/auth/authApiSlice'
import Cookies from 'universal-cookie';
import Layout from '../../hoc/Layout'
import { AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';

const initialState = {
    username: "foysalmahmud",
    password: "123456"
}

const SignIn = () => {
    const cookies = new Cookies();

    const navigate = useNavigate();
    const [isSignInForm, setIsSignInForm] = useState(true)
    const [credential, setCredential] = useState(initialState)
    const [signIn, { isLoading: signInLoading }] = useSignInMutation();
    const [signUp, { isLoading: signUpLoading }] = useSignUpMutation();

    const handelChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setCredential(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    if (cookies.get('isAuthenticated')) {
        return (<Navigate to="/admin/products" />)
    }

    const submitForm = (e) => {
        e.preventDefault();

        if (isSignInForm) {
            signIn(credential).unwrap().then(res => {
                toast.success(res?.message)
                cookies.set("user", JSON.stringify(res?.user))
                cookies.set("isAuthenticated", !!res?.token)
                setTimeout(() => {
                    navigate("/admin/products")
                }, 500)
            }).catch(error => {
                toast.error(error?.data?.message)
            })
        } else {
            signUp(credential).unwrap().then(res => {
                toast.success(res?.message)
                cookies.set("user", JSON.stringify(res?.user))
                cookies.set("isAuthenticated", !!res?.token)
                setTimeout(() => {
                    navigate("/admin/products")
                }, 500)
            }).catch(error => {
                toast.error(error?.data?.message)
            })
        }

    }

    const formProcessing = (signInLoading || signUpLoading);

    return (
        <Layout>

            <div className='flex  justify-center py-7'>

                <div className='w-full max-w-sm'>
                    <ul className="flex flex-wrap w-full mb-2 bg-white border border-sky-200 rounded-lg overflow-hidden">
                        <li onClick={() => !formProcessing && setIsSignInForm(true)} className={`flex-1 ${isSignInForm && "bg-sky-100"} ${signUpLoading && "text-gray-400 cursor-not-allowed hover:bg-gray-100"} `}>
                            <Link to="#" className="inline-flex p-3 group w-full justify-center hover:bg-sky-100">
                                <AiOutlineLogin size="1.3em" className='mr-2' /> Sign In
                            </Link>
                        </li>
                        <li onClick={() => !formProcessing && setIsSignInForm(false)} className={`flex-1 hover:bg-sky-100 ${!isSignInForm && "bg-sky-100"} ${signInLoading && "text-gray-400 cursor-not-allowed hover:bg-gray-100"} `}>
                            <Link to="#" className="inline-flex w-full justify-center p-3 group">
                                <AiOutlineUserAdd size="1.3em" className='mr-2' /> Sign Up
                            </Link>
                        </li>

                    </ul>
                    <div className="w-full p-4 bg-white border border-gray-100 rounded-lg shadow sm:p-6 md:p-8 ">

                        <form className="space-y-6" onSubmit={submitForm}>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">Username</label>
                                <input onChange={handelChange} type="text" name="username" id="username" value={credential?.username} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-200 focus:border-sky-200 block w-full p-2.5 " placeholder="dev.foysal@gmail.com" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">password</label>
                                <input onChange={handelChange} type="password" name="password" id="password" value={credential?.password} placeholder="******" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
                            </div>

                            <button type="submit" className="w-full h-ful bg-blue-700 hover:bg-sky-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-sky-200" style={{ minHeight: '40px' }}>
                                {formProcessing ? (
                                    <Loader />
                                ) : isSignInForm ? "Sign In" : "Sign Up"}
                            </button>
                        </form>
                    </div>
                </div>


            </div>
        </Layout>
    )
}

export default SignIn
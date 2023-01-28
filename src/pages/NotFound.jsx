import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../hoc/Layout'

const NotFound = () => {
    return (
        <Layout>
            <div>
                <div className="flex justify-center items-center h-screen">
                    <div className="text-center">
                        <h1 className="text-4xl font-medium">404 Not Found</h1>
                        <p className="text-lg font-light">The page you are looking for could not be found.</p>
                        <Link to="/" className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600">Go back to the home page</Link>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default NotFound
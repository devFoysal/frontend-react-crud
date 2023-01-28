import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ item }) => {
    return (

        <div className="bg-white max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
            <Link to="#">
                <img className="rounded-t-lg" src="https://www.shutterstock.com/image-photo/focused-woman-wearing-headphones-using-260nw-1395298487.jpg" alt="" />
            </Link>
            <div className="p-5">
                <Link to="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item?.title}</h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item?.short_description}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">${item?.price.toFixed(2)}</p>
                <Link to="#" className="w-full justify-center inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-sky-200 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Detail
                </Link>
            </div>
        </div>

    )
}

export default ProductCard
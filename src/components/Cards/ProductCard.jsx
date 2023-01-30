import React from 'react'
import { Link } from 'react-router-dom'
import { IMAGE_URL } from '../../app/config'

const ProductCard = ({ item }) => {
    return (

        <div className="bg-white max-w-sm border border-gray-200 rounded-lg shadow-sm">
            <Link to={`/product/${item?.id}`} className="block min-h-10">
                <img className="rounded-t-lg mx-auto w-full" src={`${IMAGE_URL}/${item?.image}`} alt="" />
            </Link>
            <div className="p-5">
                <Link to={`/product/${item?.id}`}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item?.title}</h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700 ">{item?.short_description}</p>
                <p className="mb-3 font-normal text-gray-700 ">${item?.price.toFixed(2)}</p>
                <Link to={`/product/${item?.id}`} className="w-full justify-center inline-flex items-center px-3 py-2 text-sm font-medium text-center bg-sky-200 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Detail
                </Link>
            </div>
        </div>

    )
}

export default ProductCard
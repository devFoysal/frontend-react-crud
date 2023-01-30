import React from 'react'
import { Link, Route, useParams } from "react-router-dom";
import { IMAGE_URL } from '../../app/config';
import { useGetProductQuery } from '../../app/features/product/productApiSlice';
import Loader from '../../components/Loader';
import Layout from '../../hoc/Layout'

const Products = (props) => {
  const params = useParams();
  const { data: item, isLoading, isSuccess } = useGetProductQuery(params?.id);
  if (isLoading) {
    return <Loader />
  }
  return (
    <Layout>
      <div className='container mx-auto'>
        <div className="md:py-16">
          {isSuccess && (
            <div className="flex-row sm:flex-col sm:justify-center md:items-center rounded-lg shadow-sm">
              <img className="rounded-t-lg sm:p-6" src={`${IMAGE_URL}/${item?.image}`} alt="" />
              <div className="px-8 flex-2">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item?.title}</h5>
                <p className="mb-3 font-semibold text-gray-700 ">${item?.price.toFixed(2)}</p>
                <p className="mb-3 font-normal text-gray-700 ">{item?.description}</p>

              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Products
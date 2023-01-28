import React from 'react'
import ProductCard from '../../components/Cards/ProductCard'
import Layout from '../../hoc/Layout';
import useFetchProducts from '../../hooks/useFetchProducts';

const Home = () => {
  const { productList, isSuccess, isLoading } = useFetchProducts();


  return (
    <Layout>
      <div className='container mx-auto'>
        <div className="grid grid-cols-3 gap-4 py-4">
          {isSuccess && productList && productList?.map(item => (
            <div key={item?.id}>
              <ProductCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Home
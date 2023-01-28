import React from 'react'
import ProductCard from '../../components/Cards/ProductCard'
import Layout from '../../hoc/Layout'

const Products = () => {
  return (
    <Layout>
      <div className='container mx-auto'>
        <div className="grid grid-cols-3 gap-4 py-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
            <ProductCard item={item} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Products
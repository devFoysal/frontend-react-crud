import React from 'react'
import Loader from '../../../components/Loader';
import ProductTable from '../../../components/Table/ProductTable';
import DashboardLayout from '../../../hoc/DashboardLayout'
import useFetchProducts from '../../../hooks/useFetchProducts';

const Products = () => {
  const { productList, isSuccess, isLoading } = useFetchProducts();

  return (
    <DashboardLayout>
      {isLoading && <Loader />}
      {isSuccess && (<ProductTable data={productList} />)}
    </DashboardLayout>
  )
}

export default Products
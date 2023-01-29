import { useEffect, useRef } from "react";
import {
  productAdapter,
  productApiSlice,
  productSelectors,
  useLazyGetProductsQuery,
} from "../app/features/product/productApiSlice";

const useFetchProducts = () => {
  const currentPage = useRef(1);
  const [getProducts, { isError, isFetching, isLoading, isSuccess }] =
    useLazyGetProductsQuery();

  const { productList, totalProducts } =
    productApiSlice.endpoints.getProducts.useQueryState(currentPage?.current, {
      selectFromResult: (result) => {
        return {
          totalProducts: result?.data?.totalProducts,
          productList: productSelectors.selectAll(
            result?.data ?? productAdapter.getInitialState()
          ),
        };
      },
    });

  const fetchProducts = async () => {
    await getProducts(1);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const loadMoreData = async (page) => {
    currentPage.current = page;

    setTimeout(async () => {
      await getProducts(currentPage?.current);
    }, 500);
  };

  return {
    isError,
    isFetching,
    isLoading,
    isSuccess,
    productList,
    loadMoreData,
    totalProducts,
  };
};

export default useFetchProducts;

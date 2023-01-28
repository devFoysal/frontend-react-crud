import { useEffect, useRef } from "react";
import {
  productAdapter,
  productApiSlice,
  productSelectors,
  useLazyGetProductsQuery,
} from "../app/features/product/productApiSlice";

const useFetchProducts = () => {
  const pageNumber = useRef(1);
  const filter = useRef("");

  const [getProducts, { isError, isFetching, isLoading, isSuccess }] =
    useLazyGetProductsQuery();
  // const [getMoreProducts] = useLazyGetMorePostsQuery();

  const { productList } = productApiSlice.endpoints.getProducts.useQueryState(
    undefined,
    {
      selectFromResult: (result) => {
        return {
          productList: productSelectors.selectAll(
            result?.data ?? productAdapter.getInitialState()
          ),
        };
      },
    }
  );

  const fetchProducts = async () => {
    await getProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // const getProductsByCategory = useCallback(async () => {
  //     pageNumber.current = 1;
  //     if (!hasMorePages || postFetching) return;
  //     await getProducts([1, selectedCategory]);
  // }, [selectedCategory]);

  // useEffect(() => {
  //     getProductsByCategory();
  // }, [selectedCategory]);

  const handleFilterPost = async (props) => {
    filter.current = props;
    await getProducts([1, props]);
  };

  const loadMoreData = async () => {
    // pageNumber.current += 1;
    // setTimeout(async () => {
    //   await getMoreProducts([pageNumber.current, filter.current]);
    // }, 2000);
  };

  return {
    isError,
    isFetching,
    isLoading,
    isSuccess,
    productList,
    // pagination,
    // hasMorePages,
    loadMoreData,
    handleFilterPost,
  };
};

export default useFetchProducts;

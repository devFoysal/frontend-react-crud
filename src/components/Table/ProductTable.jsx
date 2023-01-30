import React, { useState } from 'react'
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { toast } from 'react-toastify';
import { IMAGE_URL } from '../../app/config';
import { useAddProductMutation, useDeleteMultipleProductMutation, useDeleteProductMutation, useUpdateProductMutation } from '../../app/features/product/productApiSlice';
import useFetchProducts from '../../hooks/useFetchProducts';
import Loader from '../Loader';
import ModalWrapper from '../Modal/ModalWrapper';
import Pagination from '../Pagination';


const initialState = {
    image: "",
    title: "",
    price: 0.00,
    description: ""
}

const ProductTable = ({ data, totalCount }) => {
    const [addProduct, { isLoading: addLoading }] = useAddProductMutation();
    const [updateProduct, { isLoading: updateLoading }] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();
    const [deleteMultipleProduct] = useDeleteMultipleProductMutation();
    const [currentPage, setCurrentPage] = useState(1);
    const { loadMoreData } = useFetchProducts();

    const [product, setProduct] = useState(initialState);
    const [products, setProducts] = useState(data?.map(item => ({ ...item, selected: false })));
    const [isEdit, setIsEdit] = useState(false);
    const [openModal, setOpenModal] = useState(false);


    const handelChange = (e) => {
        e.preventDefault();
        const { name, value, files } = e.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: files?.length ? files[0] : value
        }))
    }

    const handelEdit = (product) => {
        setProduct({
            id: product?.id,
            image: "",
            title: product?.title,
            price: product?.price,
            description: product?.description
        })
        setIsEdit(true)
        setOpenModal(true);
    }

    const handelDelete = (product) => {
        deleteProduct(product?.id).unwrap().then(res => {
            toast.success(res?.message)
            setProducts(prevState => prevState?.filter(item => item.id !== product?.id))
        }).catch(error => {
            toast.error(error?.data?.message)
        })
    }

    const handelCheckbox = (e, product) => {

        if (product === 'all') {
            e.target.checked
                ? setProducts(prevState => prevState?.map(item => ({ ...item, selected: true })))
                : setProducts(prevState => prevState?.map(item => ({ ...item, selected: false })))
        } else {
            e.target.checked
                ? setProducts(prevState => prevState?.map(item => item?.id === product?.id ? { ...item, selected: true } : item))
                : setProducts(prevState => prevState?.map(item => item?.id === product?.id ? { ...item, selected: false } : item))
        }
    }

    const selectedProducts = products?.filter(item => item?.selected).map(item => item?.id);

    const multipleProductDelete = () => {
        deleteMultipleProduct({ ids: selectedProducts }).unwrap().then(res => {
            toast.success(res?.message)
            setProducts(prevState => prevState?.filter(item => selectedProducts?.indexOf(item.id) === -1))
        }).catch(error => {
            console.log(error, 'error')
            toast.error(error?.data?.message)
        })
    }

    const handelPagination = (page) => {
        setCurrentPage(page)
        loadMoreData(page)
    }

    const submitForm = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('title', product?.title)
        formData.append('image', product?.image)
        formData.append('price', product?.price)
        formData.append('description', product?.description)

        if (!isEdit) {

            addProduct(formData).unwrap().then(res => {
                console.log(res, 'res')
                setProducts(prevState => [
                    ...prevState,
                    {
                        id: data?.length + 1,
                        title: res?.product?.title,
                        image: res?.product?.image,
                        price: res?.product?.price,
                        description: res?.product?.description,
                    }
                ])
                toast.success(res?.message)
                setProduct(initialState)
                setOpenModal(false)
            }).catch(error => {
                console.log(error, 'error')
                toast.error(error?.data?.message)
            })
        } else {
            formData.append('id', product?.id)
            updateProduct(formData).unwrap().then(res => {
                console.log(res, 'res')
                let newProduct = {
                    id: product?.id,
                    title: product?.title,
                    image: product?.image,
                    price: product?.price,
                    description: product?.description,
                }
                setProducts(products?.map(item => item.id === parseInt(product?.id) ? newProduct : item))
                toast.success(res?.message)
                setProduct(initialState)
                setOpenModal(false)
            }).catch(error => {
                console.log(error, 'error')
                toast.error(error?.data?.message)
            })
        }
    }

    const formProcessing = (addLoading || updateLoading);

    return (
        <>
            <ModalWrapper open={openModal} close={setOpenModal} title={isEdit ? "Update product" : "Add new product"}>
                <form className="space-y-6" method='POST' onSubmit={submitForm}>
                    <div className="mt-1">
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Title</label>
                        <input onChange={handelChange} type="text" name="title" id="title" value={product?.title} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Product title" required />
                    </div>
                    <div className="mt-1">
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 ">Price</label>
                        <input onChange={handelChange} type="number" min="0" name="price" id="price" value={product?.price} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Product price" required />
                    </div>

                    <div className="mt-1">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                        <textarea onChange={handelChange} value={product?.description} type="text" name="description" id="description" rows={4} placeholder="Write product " className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required></textarea>
                    </div>

                    <div className="mt-1">
                        <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 ">Image</label>
                        <div className="flex gap-2">
                            <input onChange={handelChange} type="file" name="image" id="image" placeholder="Write product " className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                            {product?.image && (
                                <img
                                    src={URL.createObjectURL(product?.image)}
                                    alt=""
                                    width="50"
                                    className="rounded-md"
                                />
                            )}
                        </div>

                    </div>

                    <button type="submit" className="w-full h-full bg-blue-700 hover:bg-sky-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-sky-200" style={{ minHeight: '40px' }}>
                        {formProcessing ? (
                            <Loader />
                        ) : isEdit ? "Update" : "Add"}
                    </button>

                </form>
            </ModalWrapper>

            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="flex justify-end py-3 pl-2">
                        <div className="flex items-center space-x-2">
                            {selectedProducts?.length ? (
                                <div className="relative" onClick={selectedProducts?.length ? multipleProductDelete : null}>
                                    <button className="relative z-0 inline-flex text-sm rounded-md shadow-sm hover:bg-gray-50">
                                        <span className={`relative inline-flex items-center px-3 py-3 space-x-2 text-sm font-medium  ${selectedProducts?.length ? 'text-white bg-sky-400 border-gry-200' : 'bg-gray-200 text-gray-600 border-gray-300'} border rounded-md sm:py-2`}>
                                            <div>
                                                <AiOutlineDelete />
                                            </div>
                                            <div className="hidden sm:block">
                                                Delete {selectedProducts?.length || 0}
                                            </div>
                                        </span>
                                    </button>
                                </div>
                            ) : null}
                            <div className="relative" onClick={() => {
                                setIsEdit(false)
                                setOpenModal(true)
                            }}>
                                <button className="relative z-0 inline-flex text-sm rounded-md shadow-sm bg-sky-100 hover:bg-sky-50 ">
                                    <span className="relative inline-flex items-center px-3 py-3 space-x-2 text-sm font-medium text-gray-600 bg-white border border-sky-200 rounded-md sm:py-2">
                                        <div>
                                            <AiOutlinePlus />
                                        </div>
                                        <div className="hidden sm:block">
                                            Add New
                                        </div>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-1.5 w-full inline-block align-middle">
                        <div className="overflow-hidden border rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 md:table-fixed">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3 pl-4">
                                            <div className="flex items-center h-5">
                                                <input
                                                    onChange={(e) => handelCheckbox(e, 'all')}
                                                    id="checkbox-all"
                                                    type="checkbox"
                                                    className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                                                    checked={selectedProducts?.length === products?.length}
                                                />
                                                <label
                                                    htmlFor="checkbox"
                                                    className="sr-only"
                                                >
                                                    Checkbox
                                                </label>
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            ID
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            Image
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            Title
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            Price
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            Description
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                                        >
                                            Actions
                                        </th>

                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {products && products.map((item, index) => (
                                        <tr key={item?.id}>
                                            <td className="py-3 pl-4" role="button">
                                                <div className="flex items-center h-5">
                                                    <input
                                                        onChange={(e) => handelCheckbox(e, item)}
                                                        type="checkbox"
                                                        className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                                                        checked={item?.selected}
                                                    />
                                                    <label
                                                        htmlFor="checkbox"
                                                        className="sr-only"
                                                    >
                                                        Checkbox
                                                    </label>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-800 ">
                                                {++index}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                <img src={`${IMAGE_URL}/${item?.image}`} width="50" className='rounded' />
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                {item?.title}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                ${item?.price}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 ">
                                                {item?.description}
                                            </td>

                                            <td className="flex justify-end px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                <div className='flex gap-3'>
                                                    <button
                                                        onClick={() => handelEdit(item)}
                                                        className="hover:text-sky-400"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handelDelete(item)}
                                                        className="hover:text-red"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                        <Pagination current={currentPage} last={totalCount} pageChange={handelPagination} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductTable
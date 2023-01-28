import React, { useState } from 'react'
import { AiOutlineFilter, AiOutlinePlus } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAddProductMutation, useDeleteProductMutation, useUpdateProductMutation } from '../../app/features/product/productApiSlice';
import Loader from '../Loader';
import ModalWrapper from '../Modal/ModalWrapper';


const initialState = {
    image: "",
    title: "",
    price: 0.00,
    description: ""
}

const ProductTable = ({ data }) => {
    const [product, setProduct] = useState(initialState);
    const [products, setProducts] = useState(data);
    const [deletedIds, setDeletedIds] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const [addProduct, { isLoading: addLoading }] = useAddProductMutation();
    const [updateProduct, { isLoading: updateLoading }] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

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
            // setDeletedIds(prevState => [...prevState, product?.id])
        }).catch(error => {
            toast.error(error?.data?.message)
        })
    }

    const submitForm = (e) => {
        e.preventDefault();

        if (!isEdit) {
            addProduct(product).unwrap().then(res => {
                setProducts(prevState => [
                    ...prevState,
                    {
                        id: data?.length + 1,
                        title: product?.title,
                        price: product?.price,
                        description: product?.description,
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
            updateProduct(product).unwrap().then(res => {
                let newProduct = {
                    id: product?.id,
                    title: product?.title,
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
                    <div className="flex justify-between py-3 pl-2">
                        <div className="relative max-w-xs">
                            <label htmlFor="hs-table-search" className="sr-only">
                                Search
                            </label>
                            <input
                                type="text"
                                name="hs-table-search"
                                id="hs-table-search"
                                className="block w-full p-3 pl-10 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                placeholder="Search..."
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <svg
                                    className="h-3.5 w-3.5 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <div className="relative">
                                <button className="relative z-0 inline-flex text-sm rounded-md shadow-sm focus:ring-accent-500 focus:border-accent-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1">
                                    <span className="relative inline-flex items-center px-3 py-3 space-x-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md sm:py-2">
                                        <div>
                                            <AiOutlineFilter />
                                        </div>
                                        <div className="hidden sm:block">
                                            Filters
                                        </div>
                                    </span>
                                </button>
                            </div>
                            <div className="relative" onClick={() => {
                                setIsEdit(false)
                                setOpenModal(true)
                            }}>
                                <button className="relative z-0 inline-flex text-sm rounded-md shadow-sm focus:ring-accent-500 focus:border-accent-500 bg-sky-100 hover:bg-sky-50 focus:z-10 focus:outline-none focus:ring-1">
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
                                                    id="checkbox-all"
                                                    type="checkbox"
                                                    className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
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
                                        <tr key={item?.id} className={`${deletedIds.includes(item?.id) && 'hidden'}`}>
                                            <td className="py-3 pl-4" role="button">
                                                <div className="flex items-center h-5">
                                                    <input
                                                        type="checkbox"
                                                        className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
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
                                                {item?.title}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                ${item?.price}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 ">
                                                {item?.description}
                                            </td>

                                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductTable
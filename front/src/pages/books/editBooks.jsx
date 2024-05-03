import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Label, Select } from 'flowbite-react';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from "@apollo/client";
import { ALl_CATEGORY } from "../../../requests/categories";
import { ALL_AUTHORS_QUERY } from "../../../requests/author";
import { ONE_BOOK_QUERY, UPDATE_BOOK } from "../../../requests/book";
import { imgForUrl } from "../../../requests/cloud";

export default function newBooks() {
    const [updateBook] = useMutation(UPDATE_BOOK);

    const { loading: loadingCategory, error: errorCategory, data: dataCateogry } = useQuery(ALl_CATEGORY);
    const { loading, error, data } = useQuery(ALL_AUTHORS_QUERY);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [categories, setCategories] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [authors, setAuthors] = useState([]);
    const [books, setBooks] = useState({});
    const navigate = useNavigate();
    const { id } = useParams()

    const { loading: loadingBook, error: errorBook, data: dataBook } = useQuery(ONE_BOOK_QUERY, {
        variables: { id: parseFloat(id) }
    });

    const [formData, setFormData] = useState({
        title: '',
        quantity_available: '',
        description: '',
        author_id: '',
        category_id: ''
    });


    useEffect(() => {
        const fetchBooks = async () => {
            try {

                if (id) {
                    if (!loadingBook && !errorBook && dataBook && dataBook.book) {
                        setBooks(dataBook.book);
                    }
                } else if (dataBook && dataBook.books) {
                    setBooks(data.books);
                }
            } catch (error) {
                console.error("Error searching for books:", error);
            }
        };

        fetchBooks();
    }, [dataBook, id]);


    useEffect(() => {
        const fectCategory = async () => {
            try {
                if (dataCateogry && dataCateogry.categories) {
                    setCategories(dataCateogry.categories);
                }
            } catch (error) {
                console.error("Error searching for books:", error);
            }
        };

        fectCategory();
    }, [dataCateogry]);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                if (data && data.author) {
                    setAuthors(data.author);
                }
            } catch (error) {
                console.error("Error searching for books:", error);
            }
        };

        fetchAuthors();
    }, [data]);

    const handleChange = (e) => {
        setBooks({
            ...books,
            [e.target.id]: e.target.value,
        });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];

        if (file) {
            return setImageUrl(file);
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        const hasToken = localStorage.getItem('token');

        try {
            setIsSubmitting(true);

            const formDataObject = new FormData();
            formDataObject.append('img', imageUrl);

            const img = await imgForUrl(formDataObject);

            const idString = id.toString();

            const inputData = {
                title: books.title,
                quantity_available: parseInt(books.quantity_available),
                description: books.description,
                category_id: parseInt(books.category.id),
                author_id: parseInt(books.author.id),
                img: img
            };

            await updateBook({
                variables: {
                    id: idString,
                    input: inputData,
                },
            });

            notifySucess();
            navigate('/books/allbooks');

        } catch (error) {

            console.error('Error calling API:', error.message);
            notifyFail();
        } finally {
            setIsSubmitting(false);
        }
    };


    const notifySucess = () => {
        toast.success("Succss edit", {
            position: "bottom-right",
            autoClose: 1000,
        });
    };

    const notifyFail = () => {
        toast.error("Edit fail", {
            position: "bottom-right",
            autoClose: 1000,
        });
    };

    return (
        <div className="flex items-center justify-center mt-10">
            <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">Edit book</h5>

                    <div className="mb-6">
                        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title of book</label>
                        <input type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Harry Potter" required onChange={handleChange} value={books.title} />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="quantity_available" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity of stock</label>
                        <input type="number" id="quantity_available" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="20" required onChange={handleChange} value={books.quantity_available} />
                    </div>

                    <div className="">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Choose the books cover</label>
                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" onChange={handleFileChange} />
                    </div>

                    <label htmlFor="description" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Description</label>
                    <textarea id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." style={{ marginTop: "0px" }} required onChange={handleChange} value={books.description}></textarea>

                    <div className="max-w-md">
                        <div className="mb-2 block">
                            <Label htmlFor="category_id" value="Select the category" />
                        </div>
                        <Select id="category_id" required onChange={handleChange} value={books.category_id}>
                            <option value="" disabled>Choose the category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.category_name}</option>
                            ))}
                        </Select>

                    </div>

                    <div className="max-w-md">
                        <div className="mb-2 block">
                            <Label htmlFor="author_id" value="Select the author" />
                        </div>
                        <Select id="author_id" required onChange={handleChange} value={books.author_id}>
                            <option value="" disabled>Choose the author</option>
                            {authors.map((authors) => (
                                <option key={authors.id} value={authors.id} >{authors.name}</option>
                            ))}
                        </Select>
                    </div>

                    <button type="submit" className="w-full text-white bg-amber-600 hover:bg-amber-800  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Edit the book</button>
                </form>
            </div>
        </div>
    );
}
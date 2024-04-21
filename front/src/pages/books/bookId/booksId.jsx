import { insertReview, allReview } from "../../../../requests/review";
import GrupoButton from "../../../components/buttonGruop";
import { oneBook } from "../../../../requests/book";
import Typography from '@mui/material/Typography';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Pagination } from 'flowbite-react';
import Rating from '@mui/material/Rating';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Review from "./reviewCard"
import * as React from 'react';

export default function haha() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const onPageChange = (page) => setCurrentPage(page);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const adminData = localStorage.getItem('user');
    const adminObject = JSON.parse(adminData);
    const [review, setReview] = useState([]);
    const [books, setBooks] = useState([]);
    const { id } = useParams()

    const [formData, setFormData] = useState({
        comment: '',
        rating: '1',
        user_id: adminObject.id,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await oneBook(id);
                setBooks(response[0]);
            } catch (error) {
                console.error("Error search book:", error);
            }
        };

        fetchBooks();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const hasToken = localStorage.getItem('token');
        try {
            await insertReview(id, formData, {
                headers: {
                    'Authorization': `Bearer ${hasToken}`,
                },
            });

            setIsSubmitting(true);
            notifySucess(`/Books/${id}`);

        } catch (error) {
            console.error('Error calling API:', error.message);
            notifyFail(error.message);
        }
    };

    const notifySucess = (redirectUrl) => {
        toast.success("Comment Post", {
            position: "bottom-right",
            autoClose: 1000,
            onClose: () => {
                window.location.href = redirectUrl;
            },
        });
    };

    const notifyFail = (error) => {
        toast.error(error.message, {
            position: "bottom-right",
            autoClose: 1000,

        });

    };

    const handleRatingChange = (event, newValue) => {
        setFormData({
            ...formData,
            rating: newValue.toString(),
        });
    };

    useEffect(() => {
        const fectReview = async () => {
            try {
                const response = await allReview(id);
                setReview(response);
                setTotalPages(Math.ceil(response.length / 3));

            } catch (error) {
                console.error("Error search book:", error);
            }
        };

        fectReview();
    }, []);

    const indexOfLastAuthor = currentPage * 3;
    const indexOfFirstAuthor = indexOfLastAuthor - 3;
    const currentReview = review.slice(indexOfFirstAuthor, indexOfLastAuthor);

    return (
        <div className="flex justify-center mt-5">
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-2 gap-1">
                < div className="" >
                    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" >
                        <div className="flex justify-center">
                            <img class="rounded-t-lg" src={books.img} alt="" />
                        </div>
                        <div class="p-5">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{books.title}</h5>
                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 break-all">{books.description}</p>

                            <GrupoButton
                                id={id}
                                urlLink={`/books/${id}/edit`}
                                quantity={books.quantity_available}
                            />
                        </div>
                    </div>
                </div >

                <div>
                    <form onSubmit={handleSubmit}>
                        <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">

                            <h5 className="flex justify-center ml-1 text-2xl text-gray-500 dark:text-gray-400 text-black mt-2 mb-2">Comment</h5>

                            <Box
                                sx={{
                                    '& > legend': { mt: 2 },
                                    '.MuiRating-root': { fontSize: '1.5rem', mt: 0.5, ml: 1 },
                                }}
                            >
                                <div className="flex">
                                    <Typography component="legend"
                                        className="text-black text-start  "> <label htmlFor="rating" for='rating' className="text-2xl ml-1"> Rating:</label></Typography>
                                    <div className="flex justify-start">
                                        <Rating
                                            name="simple-controlled"
                                            value={parseInt(formData.rating)}
                                            max={5}
                                            id="rating"
                                            onChange={handleRatingChange}
                                        />
                                    </div>
                                </div>

                            </Box>
                            <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800 border-t">

                                <label for="comment" class="sr-only" htmlFor="comment">Your comment</label>

                                <textarea
                                    id="comment"
                                    rows="4"
                                    className="w-full px-0 text-sm text-gray-500 bg-gray-100 border-0 focus:ring-0 text-black placeholder-gray-400 rounded-md "
                                    placeholder="Write a comment..."
                                    onChange={handleChange}
                                ></textarea>

                            </div>
                            <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600 text-center">
                                <button type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-amber-600 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-amber-800 w-full" disabled={isSubmitting}>
                                    <p className="mx-auto">Post comment</p>
                                </button>
                            </div>
                        </div>
                    </form>

                    {currentReview.map((reviews) => (
                        <Review
                            key={reviews.id}
                            id={reviews.user_id}
                            comment={reviews.comment}
                            rating={reviews.rating}
                            idUrl={id}
                            idReview={reviews.id}
                        />
                    ))}
                    {totalPages != 1 && <div className="flex justify-center mt-4">
                        {review.length !== 0 ? <div>
                            {totalPages != 1 && <div className="flex justify-center mt-4">
                                <Pagination
                                    layout="pagination"
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={onPageChange}
                                    previousLabel="Back"
                                    nextLabel="Next"
                                    showIcons
                                />
                            </div>}
                        </div> : <div className="hidden"></div>}
                    </div>}
                </div>
            </div >
        </div>

    );
}

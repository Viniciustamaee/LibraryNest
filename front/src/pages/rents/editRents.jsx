import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import "./rents.css"
import { useMutation, useQuery } from "@apollo/client";
import { ONE_RENT_DATA, UPDATE_RENTS } from "../../../requests/rent";
import { ONE_BOOK_QUERY } from "../../../requests/book";

export default function EditRent() {
    const [originalDueDate, setOriginalDueDate] = useState('');


    const [rent, setRent] = useState({ due_date: '', book: '' });
    const [book, setBook] = useState({ title: '', id: '' });

    const User = localStorage.getItem('user');
    const userData = JSON.parse(User);

    const navigate = useNavigate();
    const { id } = useParams();

    const { loading, error, data, refetch } = useQuery(ONE_RENT_DATA, {
        variables: { id }
    });

    const { loading: loadingBook, error: errorBook, data: dataBook, refetch: refetchBook } = useQuery(ONE_BOOK_QUERY, {
        variables: { id: parseFloat(rent.book.id) }
    });


    useEffect(() => {
        const fetchRent = async () => {
            try {
                if (data && data.rentOne) {
                    const rentData = data.rentOne;
                    setRent(rentData);
                    setOriginalDueDate(rentData.due_date);

                    if (dataBook && dataBook.book) {
                        const bookData = dataBook.book;
                        setBook({
                            title: bookData.title,
                            id: bookData.id
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching rent data:", error);
            }
        };

        fetchRent();

    }, [data, dataBook]);

    const [updateRentMutation, { loading: updatingRent }] = useMutation(UPDATE_RENTS);



    const handleSubmit = async (event) => {
        const hasToken = localStorage.getItem('token');
        event.preventDefault();
        try {
            if (rent.due_date < originalDueDate) {
                return notifyFail('Due date cannot be earlier than the original due date')
            }

            const { data } = await updateRentMutation({
                variables: {
                    id: id,
                    input: {
                        user_id: parseInt(userData.id),
                        book_id: parseFloat(book.id),
                        rented_date: rent.rented_date,
                        due_date: rent.due_date
                    }
                }
            });

            if (data && data.updateRent) {
                notifySucess();
                navigate(`/rents/allrents`);
            } else {
                notifyFail("Edit failed");
            }
        } catch (error) {
            notifyFail("Edit fail")
            console.error('Error updating rent:', error);
        }
    };

    const notifySucess = () => {
        toast.success("Succss edit", {
            position: "bottom-right",
            autoClose: 1000,
        });
    };

    const notifyFail = (msg) => {
        toast.error(msg, {
            position: "bottom-right",
            autoClose: 1000,
        });
    };

    return (
        <div>
            {userData.admin == 1 ? <div className="flex items-center justify-center mt-10">
                <form onSubmit={handleSubmit} className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">Edit rents</h5>
                    <div className="mb-6">
                        <label htmlFor="book_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Book Title</label>
                        <input
                            type="text"
                            id="book_id"
                            name="book_id"
                            disabled
                            className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={book.title}
                            onChange={(e) => setBook({ ...book, title: e.target.value })} />
                    </div>

                    <div className="mb-6 ">
                        <label htmlFor="due_date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white cursor-pointer">Due date</label>
                        <input type="date"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-text  "
                            value={rent.due_date.slice(0, 10)} onChange={(e) => setRent({ ...rent, due_date: e.target.value })}
                            id='pointer'
                        />
                    </div>

                    <button type="submit" className="w-full text-white bg-amber-600 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit rents</button>
                </form>
            </div> : (
                <div className="mt-20 text-xl text-center flex justify-center flex-col" style={{ height: "65vh" }}>
                    <h1 className="text-4xl">You don't have Permission for enter this page ✋</h1>
                </div>
            )}
        </div>

    );
}
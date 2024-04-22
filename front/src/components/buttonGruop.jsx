import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useParams, useNavigate } from 'react-router-dom';
import { insertRent } from "../../requests/rent";
import { deleteBook } from "../../requests/book";
import { Button, Modal } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import { toast } from 'react-toastify';


export default function GrupoButton({ urlLink, quantity }) {
    const [openModal, setOpenModal] = useState(false);
    const adminData = localStorage.getItem('user');
    const adminObject = JSON.parse(adminData);
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { id } = useParams();

    const [userData, setUserData] = useState('');
    const [todayDate, setTodayDate] = useState(new Date());

    const [rentedDate, setRentedDate] = useState('');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        const userDataFromStorage = localStorage.getItem('user');

        if (userDataFromStorage) {
            const parsedUserData = JSON.parse(userDataFromStorage);
            setUserData(parsedUserData);
        }

        setRentedDate(todayDate.toISOString().split('T')[0]);
        const dateFuture = tenDays();
        setDueDate(dateFuture.toISOString().split('T')[0]);
    }, [todayDate]);

    const tenDays = () => {
        const dateFuture = new Date(todayDate);
        dateFuture.setDate(dateFuture.getDate() + 7);
        return dateFuture;
    };

    const dataForInsert = {
        rented_date: rentedDate,
        due_date: dueDate,
        user_id: userData.id,
        book_id: parseInt(id)
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const hasToken = localStorage.getItem('token');

        try {
            await insertRent(dataForInsert, {
                withCredentials: true,
            }, {
                headers: {
                    'Authorization': `Bearer ${hasToken}`,
                },
            });

            notifySucess("Rent made");

        } catch (error) {
            notifyFail()
            console.error('Error calling API:', error.message);
        }
    };

    const deleteBooks = async (e) => {
        e.preventDefault();
        const hasToken = localStorage.getItem('token');

        try {
            await deleteBook(id, {
                headers: {
                    'Authorization': `Bearer ${hasToken}`,
                },
            });


            notifySucess('Book delete with success');
            navigate(`/books`)
        } catch (error) {
            console.error('Error calling API:', error.message);
            setIsSubmitting(true);
            notifyFail(error.message)
        }
    };

    const notifySucess = (msg) => {
        toast.success(msg, {
            position: "bottom-right",
            autoClose: 1000,

        });
    };

    const notifyFail = (error) => {
        toast.error("Quantity is empty" || error, {
            position: "bottom-right",
            autoClose: 1000,

        });

    };

    return (
        <>
            <div className="flex justify-center">
                <div class="inline-flex rounded-md shadow-lg flex" role="group">
                    {adminObject.admin == 1 ? <Link to={`${urlLink}`}> <button type="button" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-400 rounded-s-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" disabled={isSubmitting}>
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="square" stroke-linejoin="round" stroke-width="2" d="M7 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h1m4-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm7.4 1.6a2 2 0 0 1 0 2.7l-6 6-3.4.7.7-3.4 6-6a2 2 0 0 1 2.7 0Z" />
                        </svg>
                        Edit
                    </button></Link> : <></>}

                    {adminObject.admin == 1 ? <button
                        type="button"
                        class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b  border-l border-r border-gray-400 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                        onClick={handleSubmit} disabled={isSubmitting}
                    >
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19V4c0-.6.4-1 1-1h12c.6 0 1 .4 1 1v13H7a2 2 0 0 0-2 2Zm0 0c0 1.1.9 2 2 2h12M9 3v14m7 0v4" />
                        </svg>
                        Rents
                    </button> :
                        <button
                            type="button"
                            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b  border-l border-r border-gray-400 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white  rounded-lg"
                            onClick={quantity === 0 ? notifyFail : handleSubmit}
                        >
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19V4c0-.6.4-1 1-1h12c.6 0 1 .4 1 1v13H7a2 2 0 0 0-2 2Zm0 0c0 1.1.9 2 2 2h12M9 3v14m7 0v4" />
                            </svg>
                            Rents
                        </button>}

                    {adminObject.admin == 0 ? <button type="button" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border  border-gray-400 rounded-e-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white hidden" onClick={() => setOpenModal(true)} >
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                        </svg>
                        Delete
                    </button> : <button type="button" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border  border-gray-400 rounded-e-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white " onClick={() => setOpenModal(true)} >
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                        </svg>
                        Delete
                        <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                            <Modal.Body className='mt-10'>
                                <div className="text-center">
                                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                        Are you sure you want to delete this product?
                                    </h3>
                                    <div className="flex justify-center gap-4">
                                        <Button color="failure" onClick={deleteBooks}>
                                            {"Yes, I'm sure"}
                                        </Button>
                                        <Button color="gray" onClick={(e) => { e.stopPropagation(); setOpenModal(false); }}>
                                            No, cancel
                                        </Button>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </button>

                    }
                </div>
            </div>
        </>
    )
}
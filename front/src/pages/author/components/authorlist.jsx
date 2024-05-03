import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Button, Modal } from 'flowbite-react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_AUTHOR_MUTATION } from "../../../../requests/author";

export default function AuthorList({ nameAuthor, id }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const hasToken = localStorage.getItem('token');
    const adminData = localStorage.getItem('user');
    const adminObject = JSON.parse(adminData);
    const navigate = useNavigate();

    const [deleteAuthorMutation] = useMutation(DELETE_AUTHOR_MUTATION);


    const deleteAuthor = async () => {
        try {
            await deleteAuthorMutation({
                variables: { id: parseInt(id, 10) },
                context: {
                    headers: {
                        'Authorization': `Bearer ${hasToken}`,
                    },
                },
            });

            notifySuccess();
        } catch (error) {
            console.error('Error calling API:', error.message);
            notifyFail();
        }
    };



    const notifySuccess = () => {
        toast.success("Author deleted", {
            position: "bottom-right",
            autoClose: 1000,
            onClose: () => {
                navigate(0)
            }
        });
    };

    const notifyFail = () => {
        toast.error("Error deleting author", {
            position: "bottom-right",
            autoClose: 1000,
        });
    };

    return (
        <>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {nameAuthor}
                </th>
                {adminObject.admin == '1' && (
                    <td>
                        <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer p-5" href={`/author/${id}/edit`}>Edit</a>
                        <a className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer p-5" onClick={() => setOpenModal(true)}>Delete</a>
                        <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                            <Modal.Header />
                            <Modal.Body>
                                <div className="text-center">
                                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                        Are you sure you want to delete this author?
                                    </h3>
                                    <div className="flex justify-center gap-4">
                                        <Button color="failure" onClick={deleteAuthor}>
                                            {"Yes, I'm sure"}
                                        </Button>
                                        <Button color="gray" onClick={() => setOpenModal(false)}>
                                            No, cancel
                                        </Button>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </td>
                )}
            </tr>
        </>
    );
}

import { oneAuthor, updateAuthor } from "../../../requests/author";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';

export default function EditAuthor() {
    const { id } = useParams()

    const [authors, setAuthors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await oneAuthor(id);
                setAuthors(response[0]);
            } catch (error) {
                console.error("Error search book:", error);
            }
        };

        fetchAuthors();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const hasToken = localStorage.getItem('token');

        try {
            await updateAuthor(id, authors, {
                headers: {
                    'Authorization': `Bearer ${hasToken}`,
                },
            });

            navigate('/author')
            notifySuccess();

        } catch (error) {
            console.error('Error calling API:', error.message);
            notifyFail();
            console.error('Server response:', error.response.data);
        }
    };

    const notifySuccess = () => {
        toast.success("Author insert with Sucess", {
            position: "bottom-right",
            autoClose: 1000,
        });
    };

    const notifyFail = () => {
        toast.error("Change the name", {
            position: "bottom-right",
            autoClose: 1000,
        });
    };

    return (
        <>
            <div className="flex items-center justify-center " style={{ height: "60vh" }}>
                <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">Edit author</h5>
                        <div className="mb-6">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Edit Name </label>
                            <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="J. K. Rowling" required onChange={(e) => setAuthors({ ...authors, name: e.target.value })} value={authors.name} />
                        </div>

                        <button type="submit" className="w-full text-white bg-amber-600 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Save the Edit</button >
                    </form>
                </div>
            </div >
        </>
    )
}
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Perfil() {
    const [userData, setUserData] = useState('');
    const { id } = useParams();

    useEffect(() => {
        const userDataFromStorage = localStorage.getItem('user');

        if (userDataFromStorage) {
            const parsedUserData = JSON.parse(userDataFromStorage);
            setUserData(parsedUserData);
        }
    }, []);

    return (
        <>
            <div className="flex justify-center mt-5">
                <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
                    <img class="rounded-lg h-96 w-auto " src={userData.img} alt="" />

                    <div class="p-5">
                        <div className="emailAndUsername">
                            <h5 class=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">{userData.username}</h5>
                            <h5 class='text-center mb-5 text-gray-400 dark:text-gray-300'>
                                {userData.email}
                            </h5>
                        </div>

                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center mb-5 break-all">{userData.description}</p>

                        <div className="flex justify-center">
                            <div class="inline-flex rounded-md shadow-lg flex" role="group">
                                <Link to={`/user/perfil/${id}/edit`}>
                                    <button type="button" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-400 rounded-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="square" stroke-linejoin="round" stroke-width="2" d="M7 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h1m4-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm7.4 1.6a2 2 0 0 1 0 2.7l-6 6-3.4.7.7-3.4 6-6a2 2 0 0 1 2.7 0Z" />
                                        </svg>
                                        Edit
                                    </button>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        </>
    );
}


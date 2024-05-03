import React, { useEffect, useState } from "react";
import RentsList from './rentsTable/rentsList'
import RentsHead from './rentsTable/rentsHead'
import { Pagination } from 'flowbite-react';
import { ALL_RENTS } from "../../../requests/rent";
import { useQuery } from "@apollo/client";
import { ALL_USER } from "../../../requests/user";
import { ALL_BOOKS_QUERY } from "../../../requests/book";

export default function allRentsAdmin() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const User = localStorage.getItem('user');
    const [books, setBooks] = useState([]);
    const [rents, setRents] = useState([]);
    const [user, setUser] = useState([]);
    const userData = JSON.parse(User);

    const { loading, error, data, refetch } = useQuery(ALL_RENTS);
    const { loading: loadingUser, error: errorUser, data: dataUser, refetch: refetchUser } = useQuery(ALL_USER);
    const { loading: loadingBook, error: errorBook, data: dataBook, refetch: refetchBook } = useQuery(ALL_BOOKS_QUERY);


    const onPageChange = (page) => setCurrentPage(page);

    useEffect(() => {
        const fetchRents = async () => {
            try {
                if (data && data.rents) {
                    setRents(data.rents);
                }
            } catch (error) {
                console.error("Error searching for books:", error);
            }
        };

        fetchRents();
    }, [data]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (dataUser && dataUser.users) {
                    setUser(dataUser.users);
                }
            } catch (error) {
                console.error("Error searching for users:", error);
            }
        };

        fetchUser();
    }, [dataUser]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                if (dataBook && dataBook.books) {
                    setBooks(dataBook.books);
                }
            } catch (error) {
                console.error("Error searching for users:", error);
            }
        };

        fetchBooks();
    }, [dataBook]);


    function getStandardFormattedDateTime(dateTimeString) {
        const datePart = dateTimeString.split('T')[0];
        return datePart.split('-').reverse().join('-');
    }

    const indexOfLastAuthor = currentPage * 5;
    const indexOfFirstAuthor = indexOfLastAuthor - 5;
    const currentRents = rents.slice(indexOfFirstAuthor, indexOfLastAuthor);
    return (
        <>
            {userData.admin == 1 ? <div>
                {rents.length == 0 ? (<div>
                    <div className="mt-20 text-xl text-center flex justify-center flex-col" style={{ height: "65vh" }}>
                        <h1 className="text-4xl">Don't have Rents yet</h1>
                        <p className="">Rent some books</p>
                    </div>
                </div>) : <div>
                    <div className="flex items-center justify-center mt-20" >
                        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <RentsHead />
                                {currentRents.map((rents) => (
                                    <RentsList
                                        key={rents.id}
                                        rented_date={getStandardFormattedDateTime(rents.rented_date)}
                                        due_date={getStandardFormattedDateTime(rents.due_date)}
                                        user_id={user.find(user => user.id == rents.user.id)?.username || "N/A"}
                                        books_id={books.find(book => book.id == rents.book.id)?.title || "N/A"}
                                        id={rents.id} />
                                ))}
                            </table>
                        </div>
                    </div>
                    <div className="flex justify-center mt-4">
                        <Pagination
                            layout="pagination"
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={onPageChange}
                            previousLabel="Back"
                            nextLabel="Next"
                            showIcons
                        />
                    </div>
                </div>}
            </div> : (
                <div className="mt-20 text-xl text-center flex justify-center flex-col" style={{ height: "65vh" }}>
                    <h1 className="text-4xl">You don't have Permission for enter this page ✋</h1>
                </div>
            )}

        </>
    )
}
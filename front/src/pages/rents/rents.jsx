import React, { useEffect, useState } from "react";
import RentsList from './rentsTable/rentsList'
import RentsHead from './rentsTable/rentsHead'
import { useParams } from "react-router-dom";
import { Pagination } from 'flowbite-react';
import { format } from 'date-fns';
import { ALL_BOOKS_QUERY } from "../../../requests/book";
import { ALL_USER } from "../../../requests/user";
import { useQuery } from "@apollo/client";
import { ONE_RENT } from "../../../requests/rent";

export default function Rents() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [rents, setRents] = useState([]);
    const [books, setBooks] = useState([]);
    const [user, setUser] = useState([]);
    const User = localStorage.getItem('user');
    const userData = JSON.parse(User);

    const onPageChange = (page) => setCurrentPage(page);
    const { id } = useParams()

    const { loading: loadingUser, error: errorUser, data: dataUser, refetch: refetchUser } = useQuery(ALL_USER);
    const { loading: loadingBook, error: errorBook, data: dataBook, refetch: refetchBook } = useQuery(ALL_BOOKS_QUERY);
    const { loading, error, data } = useQuery(ONE_RENT, {
        variables: { id: id }
    });


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
        const fetchRents = async () => {
            try {
                if (data && data.rent) {
                    setRents(Array.isArray(data.rent) ? data.rent : [data.rent]);
                } else {
                    setRents([]);
                }
            } catch (error) {
                console.error("Erro ao buscar aluguel:", error);
            }
        };

        fetchRents();
    }, [data]);


    function getStandardFormattedDateTime(dateTimeString) {
        const datePart = dateTimeString.split('T')[0];
        return datePart.split('-').reverse().join('-');
    }


    const indexOfLastAuthor = currentPage * 5;
    const indexOfFirstAuthor = indexOfLastAuthor - 5;
    const currentRents = rents.slice(indexOfFirstAuthor, indexOfLastAuthor);


    return (
        <>
            {userData.id == id ? <div>
                {rents.length == 0 ? (
                    <div className="mt-20 text-xl text-center flex justify-center flex-col" style={{ height: "65vh" }}>
                        <h1 className="text-4xl">You don't have Rents yet</h1>
                        <p className="">Rent some books</p>
                    </div>) :
                    <div className="flex items-center justify-center mt-20" >
                        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <RentsHead />
                                {currentRents.map((rent) => (
                                    <RentsList
                                        key={rent.id}
                                        rented_date={getStandardFormattedDateTime(rent.rented_date)}
                                        due_date={getStandardFormattedDateTime(rent.due_date)}
                                        user_id={user.find(user => user.id == rent.user.id)?.username || "N/A"}
                                        books_id={books.find(book => book.id == rent.book.id)?.title || "N/A"}
                                        id={rent.id}
                                    />
                                ))}

                            </table>
                        </div>
                    </div>}
                {rents.length != 0 ? <div>
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
            </div> : <div className="mt-20 text-xl text-center flex justify-center flex-col" style={{ height: "65vh" }}>
                <h1 className="text-4xl">You don't have Permission for enter this page ✋</h1>
            </div>}
        </>
    )
}

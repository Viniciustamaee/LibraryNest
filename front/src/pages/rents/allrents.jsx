import { allBooksCover } from "../../../requests/book";
import React, { useEffect, useState } from "react";
import { allRents } from "../../../requests/rent";
import { allUsers } from "../../../requests/user";
import RentsList from './rentsTable/rentsList'
import RentsHead from './rentsTable/rentsHead'
import { Pagination } from 'flowbite-react';

export default function allRentsAdmin() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const User = localStorage.getItem('user');
    const [books, setBooks] = useState([]);
    const [rents, setRents] = useState([]);
    const [user, setUser] = useState([]);
    const userData = JSON.parse(User);

    const onPageChange = (page) => setCurrentPage(page);

    useEffect(() => {
        const fetchRents = async () => {
            try {
                const response = await allRents();
                setRents(response);
                setTotalPages(Math.ceil(response.length / 5));
            } catch (error) {
                console.error("Erro search rents:", error);
            }
        };

        fetchRents();
    }, []);

    useEffect(() => {
        const fetchRents = async () => {
            try {
                const response = await allUsers();
                setUser(response);
            } catch (error) {
                console.error("Erro search users:", error);
            }
        };

        fetchRents();
    }, []);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await allBooksCover();
                setBooks(response);
            } catch (error) {
                console.error("Erro search book:", error);
            }
        };

        fetchBooks();
    }, []);


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
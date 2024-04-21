import React, { useEffect, useState } from "react";
import { allBooksCover } from "../../../requests/book";
import BooksCover from "./components/bookCover";

export default function AllBooks() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await allBooksCover();
                setBooks(response);
            } catch (error) {
                console.error("Error search book:", error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <>
            {books.length == 0 && (
                <div className="mt-20 text-xl text-center flex justify-center flex-col" style={{ height: "60vh" }}>
                    <h1 className="text-4xl">We don't have book yet</h1>
                    <p className="">Wait the admin, insert some books...</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-1 p-5 gap-4">

                {books.map((book) => (
                    <BooksCover
                        key={book.id}
                        className='h-auto max-w-full rounded-lg'
                        title={book.title}
                        img={book.img}
                        id={book.id}
                        quantity={book.quantity_available}
                        description={book.description}
                    />
                ))}
            </div>
        </>
    )
}
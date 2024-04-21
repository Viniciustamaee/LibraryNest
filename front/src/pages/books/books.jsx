import { allBooksCover } from "../../../requests/book";
import BooksCover from "../books/components/bookCover";
import CardBooks from "../books/components/cardBooks";
import React, { useEffect, useState } from "react";


export default function About() {
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
        <div>
            {books.length == 0 ? <><div className="mt-20 text-xl text-center flex justify-center flex-col" style={{ height: "65vh" }}>
                <h1 className="text-4xl">We don't have book yet</h1>
                <p className="">Wait the admin, insert some books...</p>
            </div></> : <div>
                <div className="flex text-center justify-center ">
                    {books.length == 0 ? <h1 className="ml-5 mr-5 text-3xl hidden">Famous Books</h1> : <h1 className="ml-5 mr-5 mt-4 text-3xl" style={{ color: '#fca311' }}>Famous Books</h1>}
                </div>
                <div className="flex justify-center">
                    {<div className="grid md:grid-cols-1 xl:grid-cols-3 gap-1 ">
                        {books.slice(0, 3).map((book) => (
                            <CardBooks
                                key={book.id}
                                className='h-auto max-w-full rounded-lg'
                                title={book.title}
                                img={book.img}
                                id={book.id}
                                quantity={book.quantity_available}
                                description={book.description}
                            />
                        ))}
                    </div>}
                </div>
                <div className="flex pt-10 text-center	justify-center ">
                    {books.length == 0 ? <h1 className="ml-5 mr-5 text-3xl mb-2 hidden" >Books</h1> : <h1 className="ml-5 mr-5 text-3xl mb-2" style={{ color: '#fca311' }}>Books</h1>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-1 flex justify-center ">
                    {books.slice(0, 4).map((book) => (
                        <BooksCover
                            key={book.id}
                            className='h-auto max-w-full rounded-lg'
                            title={book.title}
                            img={book.img}
                            id={book.id}
                            quantity={book.quantity_available}

                        />

                    ))}
                </div>
            </div>}
        </div>
    )
}
import { useQuery } from "@apollo/client";
import { ALL_BOOKS_QUERY } from "../../../requests/book";
import BooksCover from "../books/components/bookCover";
import CardBooks from "../books/components/cardBooks";
import React, { useEffect, useState } from "react";

export default function About() {
    const [books, setBooks] = useState([]);
    const { loading, error, data } = useQuery(ALL_BOOKS_QUERY);


    useEffect(() => {
        const fetchBooks = async () => {
            try {
                if (data && data.books) {
                    setBooks(data.books);
                }
            } catch (error) {
                console.error("Error searching for books:", error);
            }
        };

        fetchBooks();
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;


    return (
        <div>
            {books.length == 0 ? (
                <div className="mt-20 text-xl text-center flex justify-center flex-col" style={{ height: "65vh" }}>
                    <h1 className="text-4xl">We don't have any books yet</h1>
                    <p className="">Wait for the admin to insert some books...</p>
                </div>
            ) : (
                <div>
                    <div className="flex text-center justify-center">
                        <h1 className="ml-5 mr-5 mt-4 text-3xl" style={{ color: '#fca311' }}>Famous Books</h1>
                    </div>
                    <div className="flex justify-center">
                        <div className="grid md:grid-cols-1 xl:grid-cols-3 gap-1">
                            {books.slice(0, 3).map((book) => (
                                <CardBooks
                                    key={book.id}
                                    className='h-auto max-w-full rounded-lg'
                                    title={book.title}
                                    id={book.id}
                                    img={book.img}
                                    quantity={book.quantity_available}
                                    description={book.description}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex pt-10 text-center justify-center">
                        <h1 className="ml-5 mr-5 text-3xl mb-2" style={{ color: '#fca311' }}>Books</h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-1 flex justify-center">
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
                </div>
            )}
        </div>
    );
}

import React, { useEffect, useState } from "react";
import { ALL_BOOKS_QUERY } from "../../../requests/book";
import BooksCover from "./components/bookCover";
import { useQuery } from "@apollo/client";
import { ONE_BOOK_QUERY } from "../../../requests/book";
import { useParams } from "react-router-dom";

export default function AllBooks() {
    const [books, setBooks] = useState([]);
    const { loading, error, data, refetch } = useQuery(ALL_BOOKS_QUERY);
    const { id } = useParams();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                if (id) {
                    const { loading, error, data } = useQuery(ONE_BOOK_QUERY, {
                        variables: { id: parseFloat(id) }
                    });
                    if (!loading && !error && data && data.book) {
                        setBooks([data.book]);
                    }
                } else if (data && data.books) {
                    setBooks(data.books);
                }
            } catch (error) {
                console.error("Error searching for books:", error);
            }
        };

        fetchBooks();
    }, [data, id]);

    const handleSubmit = async () => {


        await refetch();
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            {books.length == 0 && (
                <div className="mt-20 text-xl text-center flex justify-center flex-col" style={{ height: "60vh" }}>
                    <h1 className="text-4xl ">We don't have book yet</h1>
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
    );
}

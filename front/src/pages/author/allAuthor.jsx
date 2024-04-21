import AuthorHeads from "./components/headTable";
import { allAuthors } from "../../../requests/author";
import AuthorList from "./components/authorlist";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Pagination } from 'flowbite-react';

export default function AllAuthors() {
    const [authors, setAuthors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const onPageChange = (page) => setCurrentPage(page);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await allAuthors();
                setAuthors(response);
                setTotalPages(Math.ceil(response.length / 5));
            } catch (error) {
                console.error("Erro ao buscar os livros:", error);
            }
        };

        fetchAuthors();
    }, []);

    const indexOfLastAuthor = currentPage * 5;
    const indexOfFirstAuthor = indexOfLastAuthor - 5;
    const currentAuthors = authors.slice(indexOfFirstAuthor, indexOfLastAuthor);

    return (
        <>
            {authors.length !== 0 ? (
                <div className="mt-20">
                    <div className="flex justify-center content-center">
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                                <AuthorHeads />
                                {currentAuthors.map((author) => (
                                    <AuthorList
                                        key={author.id}
                                        nameAuthor={author.name}
                                        id={author.id}

                                    />
                                ))}
                            </table>
                            <Link to={'/author/new'}>
                                <div className="flex justify-center items-center text-white  bg-amber-600 hover:bg-amber-800 pb-1 ">
                                    <h1 className="p-1">New author</h1>
                                </div>
                            </Link>
                        </div>

                    </div>

                </div>
            ) : (
                <div className="mt-20 text-xl text-center flex justify-center flex-col" style={{ height: "65vh" }}>
                    <h1 className="text-4xl">We don't have Author yet</h1>
                    <p className="">Wait the admin, insert some author...</p>
                </div>
            )}
            {authors.length !== 0 ? <div>
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

        </>
    );
}

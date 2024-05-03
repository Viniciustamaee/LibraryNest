import { ALL_AUTHORS_QUERY, ONE_AUTHOR_QUERY, UPDATE_AUTHOR_MUTATION } from "../../../requests/author";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';

export default function EditAuthor() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { loading, error, data } = useQuery(ONE_AUTHOR_QUERY, {
        variables: { id: parseInt(id) } 
    });

    const [updateAuthor] = useMutation(UPDATE_AUTHOR_MUTATION);

    const [author, setAuthor] = useState({});

    useEffect(() => {
        if (!loading && data && data.authorOne) {
            setAuthor(data.authorOne);
        }
    }, [loading, data]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const hasToken = localStorage.getItem('token');

        try {
            await updateAuthor({
                variables: {
                    id: parseInt(author.id),
                    updateAuthorInput: {
                        name: author.name
                    }
                },
                context: {
                    headers: {
                        'Authorization': `Bearer ${hasToken}`,
                    },
                },
                refetchQueries: [{ query: ALL_AUTHORS_QUERY }] 

            });

            navigate('/author');
            notifySuccess();

        } catch (error) {
            console.error('Erro ao chamar a API:', error.message);
            notifyFail();
            console.error('Resposta do servidor:', error.response.data);
        }
    };

    const notifySuccess = () => {
        toast.success("Autor atualizado com sucesso", {
            position: "bottom-right",
            autoClose: 1000,
        });
    };

    const notifyFail = () => {
        toast.error("Falha ao atualizar autor", {
            position: "bottom-right",
            autoClose: 1000,
        });
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="flex items-center justify-center" style={{ height: "60vh" }}>
            <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">Editar autor</h5>
                    <div className="mb-6">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Editar Nome</label>
                        <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="J. K. Rowling" required onChange={(e) => setAuthor({ ...author, name: e.target.value })} value={author.name || ''} />
                    </div>
                    <button type="submit" className="w-full text-white bg-amber-600 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Salvar Edição</button>
                </form>
            </div>
        </div>
    );
}

import { Link } from "react-router-dom";

export default function booksCover({ title, img, id, quantity, bookId, rentId }) {

    const adminData = localStorage.getItem('user');

    return (
        <>
            {adminData == null ? <Link to={`/login`}>
                <div className="flex justify-center " >
                    <div class="h-full w-60 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 " >
                        <a href="#" className="flex justify-center" style={{ height: "400px" }} >
                            <img className="rounded-t-lg object-cover" src={img} />
                        </a>
                        <div class="p-4">
                            <h4 className="text-center font-bold">{title}</h4>
                            <a href="#" className="flex justify-evenly">
                                <div className="">
                                    <h3 className="text-center text-gray-500">Status:</h3>
                                    <h5 className={`mb-1 text-lg font-bold tracking-tight ${(quantity > 0 ? 'text-green-500' : 'text-red-500')} dark:text-white`}>
                                        {quantity > 0 ? 'Disponivel' : 'Indisponivel'}
                                    </h5>
                                </div>
                                <div className="">
                                    <h3 className="text-center text-gray-500">{typeof quantity === 'undefined' ? '' : 'Quantity'}</h3>
                                    <h5 class="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white text-center">{typeof quantity === 'undefined' ? '' : quantity}</h5>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </Link> : <Link to={`/books/${id}`}>
                <div className="flex justify-center" >
                    <div class="h-full w-60 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 " >
                        <a href="#" className="flex justify-center" style={{ height: "400px" }} >
                            <img className="rounded-t-lg " src={img} style={{ objectFit: "cover" }} />
                        </a>
                        <div class="p-4">
                            <h4 className="text-center font-bold">{title}</h4>
                            <a href="#" className="flex justify-evenly">
                                <div className="">
                                    <h3 className="text-center text-gray-500">Status:</h3>
                                    <h5 className={`mb-1 text-lg font-bold tracking-tight ${(quantity > 0 ? 'text-green-500' : 'text-red-500')} dark:text-white`}>
                                        {quantity > 0 ? 'Available' : 'Unavailable'}
                                    </h5>
                                </div>
                                <div className="">
                                    <h3 className="text-center text-gray-500">{typeof quantity === 'undefined' ? '' : 'Quantity'}</h3>
                                    <h5 class="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white text-center">{typeof quantity === 'undefined' ? '' : quantity}</h5>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </Link>}
        </>
    )
}
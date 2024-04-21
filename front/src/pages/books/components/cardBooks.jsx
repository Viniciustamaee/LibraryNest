import { Link } from "react-router-dom";

export default function CardBooks({ title, img, id, quantity, description }) {
    const adminData = localStorage.getItem('user');

    return (
        <div>
            {adminData == null ? <Link to={`/login`}>
                <div className="">
                    <a href="#" class="flex flex-col bg-black rounded-lg shadow-lg md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 m-3  " style={{ backgroundColor: "#cccccc" }}
                    >
                        <img className="object-cover w-full rounded-t-lg h-48 md:h-80 md:w-48 md:rounded-none md:rounded-s-lg " src={img} alt="" />

                        <div className="flex flex-col p-2 leading-normal justify-between" id='text'>
                            <div className="flex flex-col justify-between p-2 leading-normal">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" >{title}</h5>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 break-all">{description}</p>
                            </div>

                            <div className="flex items-end">
                                <button type="button" className="text-white bg-gradient-to-r  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-5 bg-amber-600 hover:bg-amber-800" >
                                    More info
                                </button>
                                <h5 className="mb-2 font-medium text-black ">Quantity: {quantity}</h5>
                            </div>
                        </div>
                    </a>
                </div>
            </Link > : <Link to={`/books/${id}`}>
                <div className="">
                    <a href="#" class="flex flex-col bg-black rounded-lg shadow-lg md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 m-3  " style={{ backgroundColor: "#cccccc" }}
                    >
                        <img className="object-cover w-full rounded-t-lg h-48 md:h-80 md:w-48 md:rounded-none md:rounded-s-lg" src={img} alt="" />

                        <div className="flex flex-col p-2 leading-normal justify-between" id='text'>
                            <div className="flex flex-col justify-between p-2 leading-normal text-center">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" >{title}</h5>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 break-all">{description}</p>
                            </div>

                            <div className="flex items-end">
                                <button type="button" className="text-white bg-gradient-to-r  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-5 bg-amber-600 hover:bg-amber-800" >
                                    More info
                                </button>
                                <h5 className="mb-2 font-medium text-black ">Quantity: {quantity}</h5>
                            </div>
                        </div>
                    </a>
                </div>
            </Link >}
        </div >
    )
}
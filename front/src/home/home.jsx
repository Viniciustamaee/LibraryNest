export default function Home() {
    return (
        <>
            <div className="grid xl:grid-cols-2 gap-2 sm:grid-cols-1 h-screen items-center">
                <div className="text-center">
                    <h1 className="text-2xl">Wellcome to <span className="text-red-600">Story Arc Library</span></h1>
                    <p className="text-md">You can find the bester books herer, <a href="" className="hover:text-red-600">click here </a>for more information</p>
                    <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2" style={{ width: "450px" }}>Make an account</button>
                </div>

                <div className="flex xl:justify-start sm:justify-center">
                    <img src="https://images.unsplash.com/photo-1524578271613-d550eacf6090?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="h-96 rounded-lg" />
                </div>
            </div >
        </>

    )
}
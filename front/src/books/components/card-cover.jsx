
export default function CardCover({ }) {
    return (
        <>
            <div className="flex justify-center mb-5" >
                <div class="h-full w-60 bg-red-600 border border-red-600 rounded-lg shadow   " >
                    <a href="" className="flex justify-center" >
                        <img className="rounded-t-lg object-cover" src='https://res.cloudinary.com/dtuxy5k7v/image/upload/v1710790056/missingbook_liglqd.png' />
                    </a>
                    <div class="p-4">
                        <h4 className="text-center font-bold"></h4>
                        <a href="#" className="flex justify-center">
                            <h3 className="text-center text-white ">Name of book</h3>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}
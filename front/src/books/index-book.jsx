import CardDescription from "./components/card-description";
import IconAuthor from "../authors/components/Icon-author";
import CardCover from "./components/card-cover";

export default function Books() {
    return (
        <>
            <div className='flex '>
                <h1 className="text-xl ml-3 mt-3">Most view</h1>
                <a href="/allbook" className="hover:text-red-600 p-5 pl-4 text-sm">See more</a>
            </div>
            <div className="flex flex-row justify-center grid xl:grid-cols-5  md:grid-cols-3 sm:grid-cols-1 ">
                <CardCover />
                <CardCover />
                <CardCover />
                <CardCover />
                <CardCover />
            </div>

            <CardDescription />

            <div className='flex '>
                <h1 className="text-xl ml-3 mt-3">Authors</h1>
                <a href="/allbooks" className="hover:text-red-600 p-5 pl-4 text-sm">See more</a>
            </div>
            <div className=" flex flex-row justify-center grid xl:grid-cols-5  md:grid-cols-3 sm:grid-cols-1    ">
                <IconAuthor />
                <IconAuthor />
                <IconAuthor />
                <IconAuthor />
                <IconAuthor />

            </div>



        </>
    )
}
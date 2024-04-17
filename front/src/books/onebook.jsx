import DeleteButton from "../components/delete-button";
import EditButton from "../components/edit-button";
import RentButton from "../components/rent-button";
import RatingStart from "../books/components/rating-star";
import ReviewCard from "./components/review/card-review";

export default function OneBook() {
    return (
        <>
            <div className="grid xl:grid-cols-2 gap-2 sm:grid-cols-1 m-5 items-center justify-center">
                <div className="text-center flex flex-col items-center justify-center">
                    <h1 className="text-2xl"><span className="text-red-600">Nome do livro</span></h1>
                    <p className="text-md text-center mb-20">Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi illum repellat dicta ipsa fugit fuga molestiae beatae tempore autem est consequuntur delectus, dignissimos sit optio magni accusantium ullam nemo iste?</p>
                    <div className="flex mb-5">
                        <DeleteButton />
                        <EditButton />
                        <RentButton />
                    </div>
                    <RatingStart />
                </div>

                <div className="flex justify-center m-4">
                    <img src="https://images.unsplash.com/photo-1524578271613-d550eacf6090?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Imagem do Livro" className="h-96 rounded-lg" />
                </div>
            </div>
            <ReviewCard />
        </>
    )
}
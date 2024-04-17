import InputText from "../components/input-text";
import CardCover from "./components/card-cover";

export default function AllBook() {
    return (
        <>
            <div className="flex justify-center m-5">
                <InputText
                    icon={true}
                    placeholder={'search a book'}
                />
            </div>
            <div className="flex flex-row justify-center grid xl:grid-cols-5  md:grid-cols-3 sm:grid-cols-1 ">
                <CardCover />
                <CardCover />
                <CardCover />
                <CardCover />
                <CardCover />
                <CardCover />
                <CardCover />
                <CardCover />
                <CardCover />
                <CardCover />
                <CardCover />
            </div>
        </>
    )
}
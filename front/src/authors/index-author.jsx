import InputText from "../components/input-text";
import IconAuthor from "./components/Icon-author";

export default function Authors() {
    return (
        <>
            <div className="flex justify-center mt-4">
                <InputText
                    icon={true}
                    placeholder={'Search Author'}
                />
            </div>
            <div className=" flex flex-row justify-center grid xl:grid-cols-5  md:grid-cols-3 sm:grid-cols-1 m-5">
                <IconAuthor />
                <IconAuthor />
                <IconAuthor />
                <IconAuthor />
                <IconAuthor />
                <IconAuthor />
                <IconAuthor />
                <IconAuthor />
                <IconAuthor />
                <IconAuthor />
                <IconAuthor />
                <IconAuthor />
            </div>
        </>
    )
}
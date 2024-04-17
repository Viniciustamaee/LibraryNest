import TableHead from "./components/table-head";
import TableList from "./components/table-list";


export default function Rents() {
    return (
        <>
            <div className="flex items-center justify-center" style={{ height: "80vh" }}>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <TableHead />
                        <TableList />
                    </table>
                </div>
            </div>

        </>
    )
}
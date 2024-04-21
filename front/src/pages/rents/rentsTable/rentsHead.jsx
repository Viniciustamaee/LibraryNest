export default function rentsHead() {
    return (
        <>
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        User
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Rented date
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Due date
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Book
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
        </>
    )
}
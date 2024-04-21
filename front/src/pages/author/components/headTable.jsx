export default function authorHeads() {
    const adminData = localStorage.getItem('user');
    const adminObject = JSON.parse(adminData);

    return (
        <>
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Name
                    </th>
                    <th scope="col" class="px-6 py-3 w-max" >
                        Action
                    </th>
                </tr>
            </thead>
        </>
    )
}
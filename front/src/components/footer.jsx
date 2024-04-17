export default function Footer() {
    return (
        <footer class="bg-red-700 rounded-lg shadow m-4 ">
            <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between text-white">
                <span class="text-sm sm:text-center dark:text-gray-400 text-white">© 2023 <a href="https://flowbite.com/" class="hover:underline text-white">Flowbite™</a>. All Rights Reserved.
                </span>
                <ul class="flex flex-wrap items-center mt-3 text-sm font-medium dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="#" class="hover:underline me-4 md:me-6 text-white">About</a>
                    </li>
                    <li>
                        <a href="#" class="hover:underline me-4 md:me-6 text-white">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" class="hover:underline me-4 md:me-6 text-white">Licensing</a>
                    </li>
                    <li>
                        <a href="#" class="hover:underline text-white">Contact</a>
                    </li>
                </ul>
            </div>
        </footer>

    )
}
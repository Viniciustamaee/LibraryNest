import { Avatar, Dropdown, Navbar } from "flowbite-react";
export default function NavBar() {
    return (
        <>
            <Navbar fluid rounded className="bg-red-700">
                <Navbar.Brand href="/" className="ml-3">
                    <svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2a1 1 0 0 0 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z" clip-rule="evenodd" />
                    </svg>

                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white m-2">Story Arc Library</span>
                </Navbar.Brand>
                <div className="flex md:order-2 mr-3" >
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar alt="User settings" img="https://res.cloudinary.com/dtuxy5k7v/image/upload/v1710514781/vector-flat-illustration-grayscale-avatar-600nw-2281862025_grjznc.jpg" rounded />
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">Bonnie Green</span>
                            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                        </Dropdown.Header>
                        <a href="/user/1"><Dropdown.Item>Perfil</Dropdown.Item></a>
                        <a href="/rent/1"><Dropdown.Item>Rents</Dropdown.Item></a>
                        <Dropdown.Divider />
                        <Dropdown.Item>Sign out</Dropdown.Item>
                    </Dropdown>
                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse >
                    <Navbar.Link href="/" className="text-white">
                        Home
                    </Navbar.Link>
                    <Navbar.Link href="/book" className="text-white">Books</Navbar.Link>
                    <Navbar.Link href="/author" className="text-white">Authors</Navbar.Link>
                    <Navbar.Link href="/rent/1" className="text-white">Rents</Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
} 
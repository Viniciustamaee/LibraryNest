import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { updateUser, oneUser } from '../../../requests/user';
import { useParams, useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import { toast } from 'react-toastify';

export default function EditPerfil() {
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [showPassword, setShowPassword] = React.useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await oneUser(id);
                setUser(response[0]);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, [id]);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageUrl(file);
        }
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const userChange = (e) => {
        if (e.target.id === 'passwordConfirm') {
            setPasswordConfirm(e.target.value);
        } else {
            setUser({
                ...user,
                [e.target.id]: e.target.value,
            });
        }
    };


    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !containsNumber(user.password) ||
            !containsSpecialCharacter(user.password) ||
            user.password.length < 5 ||
            !containsUppercaseLetter(user.password)
        ) {
            notifyFail("The password is very weak. Try a more complex password.");
            return;
        }


        try {
            const formDataObject = new FormData();
            formDataObject.append('email', user.email);
            formDataObject.append('username', user.username);
            formDataObject.append('password', user.password);
            formDataObject.append('description', user.description);
            formDataObject.append('img', imageUrl);

            if (user.password !== passwordConfirm) {
                notifyFail("Passwords do not match");
                return;
            }

            console.log(user.username)


            await updateUser(id, formDataObject);
            navigate('/login');
            notifySuccess();
            logout()

        } catch (error) {
            notifyFail("There is already a user with that name, please change it");
            console.error('Error calling API:', error.message);
        }
    };

    const notifySuccess = () => {
        toast.success("User edited successfully", {
            position: "bottom-right",
            autoClose: 1000,
        });
    };

    const notifyFail = (mensagem) => {
        toast.error(mensagem, {
            position: "bottom-right",
            autoClose: 1000,
        });
    };

    const containsNumber = (password) => {
        const numbers = password.match(/\d/g);
        return numbers ? numbers.length : 0;
    };

    const containsSpecialCharacter = (password) => {
        const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/g;
        const matches = password.match(specialCharacters);
        return matches ? matches.length : 0;
    };

    const containsUppercaseLetter = (password) => {
        return /[A-Z]/.test(password);
    };

    return (
        <div className="flex items-center justify-center mt-10">
            <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">Edit Profile</h5>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" id='email'>Email address</label>
                        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900  bg-slate-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com"  onChange={userChange} value={user.email} disabled />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                        <input type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Admin" required onChange={userChange} value={user.username} />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <div className='relative'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                onChange={userChange}
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                required
                            />
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                tabindex="-1"
                                style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </div>
                    </div>

                    <div className='mb-6'>
                        <label htmlFor="passwordConfirm" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm your password</label>
                        <div className='relative'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="passwordConfirm"
                                onChange={userChange}
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                required
                            />
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                tabindex="-1"
                                style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </div>
                    </div>


                    <div className='text-sm	bg-gray-200 rounded-lg drop-shadow-lg' id='Suggestion'>
                        <h1 className='text-black text-center text-lg'>Suggestions Password</h1>
                        {user.password && user.password.length < 5 ? <p className='text-red-500 p-2'>Password must contain at least 5 characters</p> : <p className='text-green-500 p-2'>Password has at least 5 characters</p>}
                        {user.password && containsNumber(user.password) < 2 ? (
                            <p className="text-red-500 p-2">Password must contain at least 2 numbers</p>
                        ) : (
                            <p className="text-green-500 p-2">Password contains at least 2 numbers</p>
                        )}
                        {user.password && containsSpecialCharacter(user.password) < 2 ? (
                            <p className="text-red-500 p-2">Password must contain at least 2 special characters</p>
                        ) : (
                            <p className="text-green-500 p-2">Password contains at least 2 special characters</p>
                        )}
                        {user.password && !containsUppercaseLetter(user.password) ? (
                            <p className="text-red-500 p-2">Password must contain at least one uppercase letter</p>
                        ) : (
                            <p className="text-green-500 p-2">Password contains at least one uppercase letter</p>
                        )}
                    </div>
                    <div className="">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Edit your picture</label>
                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" onChange={handleFileChange} />
                    </div>
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                    <textarea id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." onChange={userChange} value={user.description} style={{ marginTop: "10px" }}></textarea>
                    <button type="submit" className="w-full text-white bg-amber-600 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit Account</button>
                </form>
            </div>
        </div>
    );
}

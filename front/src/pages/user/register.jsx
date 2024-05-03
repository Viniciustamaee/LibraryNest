import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import { INSERT_USER } from '../../../requests/user';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { imgForUrl } from '../../../requests/cloud';

const Register = () => {
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [showPassword, setShowPassword] = React.useState(false);
    const [insertUserMutation] = useMutation(INSERT_USER);

    const navigate = useNavigate();

    const [imageUrl, setImageUrl] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        passwordConfirm: '',
        description: ''

    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];

        if (file) {
            setImageUrl(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !containsNumber(formData.password) ||
            !containsSpecialCharacter(formData.password) ||
            formData.password.length < 5 ||
            !containsUppercaseLetter(formData.password)
        ) {
            notifyFail("The password is very weak. Try a more complex password.");
            return;
        }







        try {


            const formDataObject = new FormData();
            formDataObject.append('img', imageUrl);

            const img = await imgForUrl(formDataObject)

            await insertUserMutation({
                variables: {
                    data: {
                        email: formData.email,
                        username: formData.username,
                        password: formData.password,
                        description: formData.description,
                        img: img
                    },
                }
            })

            notifySucess();
            navigate('/login');

        } catch (error) {
            notifyFail("Username and Email already exists");
            console.error('Error calling API:', error);
        }
    };


    root
    const notifySucess = () => {
        toast.success("Create user", {
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
        <>
            <div className="flex items-center justify-center h-4/5 mt-1 mb-5 mt-5">
                <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">Register</h5>
                        <div className="mb-6">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required onChange={handleChange} />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                            <input type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Admin" required onChange={handleChange} />
                        </div>

                        <div className=''>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <div className='relative'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
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



                        <div className=''>
                            <label htmlFor="passwordConfirm" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <div className='relative'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="passwordConfirm"
                                    onChange={handleChange}
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

                        <div className='text-sm	bg-gray-200 rounded-lg drop-shadow-lg'>
                            <h1 className='text-black text-center text-lg'>Suggestions Password</h1>
                            {formData.password.length < 5 ? <p className='text-red-500 p-2'>Password must contain 5 character</p> : <p className='text-green-500 p-2'>Password must contain 5 character</p>}
                            {containsNumber(formData.password) < 2 ? (
                                <p className="text-red-500 p-2">Password must contain at least 2 numbers</p>
                            ) : (
                                <p className="text-green-500 p-2">Password contains at least 2 numbers</p>
                            )}
                            {containsSpecialCharacter(formData.password) < 2 ? (
                                <p className="text-red-500 p-2">Password must contain at least 2 special characters</p>
                            ) : (
                                <p className="text-green-500 p-2">Password must contains at least 2 special characters</p>
                            )}
                            {!containsUppercaseLetter(formData.password) ? (
                                <p className="text-red-500 p-2">Password must contain at least one uppercase letter</p>
                            ) : (
                                <p className="text-green-500 p-2">Password contains at least one uppercase letter</p>
                            )}
                        </div>

                        <div className="">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Choose your profile picture</label>
                            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" onChange={handleFileChange} />
                        </div>

                        <label htmlFor="description" className="block  text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                        <textarea id="description" rows="4" className=" p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." onChange={handleChange} style={{ marginTop: "10px" }}></textarea>

                        <button type="submit" className="w-full text-white bg-amber-600  hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Create Account</button>
                    </form>
                </div >
            </div >

        </>
    );
};

export default Register;

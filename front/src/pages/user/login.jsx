import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import { LOGIN_MUTATION } from '../../../requests/user';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useState } from 'react';
import * as React from 'react';
import { useMutation } from '@apollo/client';


const Login = () => {
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [loginMutation] = useMutation(LOGIN_MUTATION);

    const [showPassword, setShowPassword] = React.useState(false);
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const response = await loginMutation({
                variables: {

                    username: formData.username,
                    password: formData.password,


                },
            });



            setIsSubmitting(true);

            localStorage.setItem('token', response.data.login.accessToken);
            localStorage.setItem('user', JSON.stringify(response.data.login.user));

            config.headers['Authorization'] = `Bearer ${response.data.login.accessToken}`;


            notifySucess();
            navigate('/books')

        } catch (error) {
            console.error('Erro ao chamar a API:', error.message);
            notifyFail()
        }
    };

    const notifySucess = () => {
        toast.success("Logged in", {
            position: "bottom-right",
            autoClose: 500,
        });
    };

    const notifyFail = () => {
        toast.error("Username or Password Incorrect!", {
            position: "bottom-right",
            autoClose: 1000,
        });
    };

    return (
        <>

            <div className="flex items-center justify-center" style={{ height: "70vh" }} >
                <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700" >
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">Sign in Library</h5>
                        <div className="mb-6">
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username address</label>
                            <input type="text" id="username" value={formData.username} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ricardo Blue" required />
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
                                    style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </div>
                        </div>




                        <button className="w-full text-white bg-amber-600 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"  >
                            Login to your account
                        </button>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered? <a href="/register" className="text-amber-600 hover:underline dark:text-blue-500">Create account</a>
                        </div>
                    </form>
                </div >
            </div >

        </>
    );
};

export default Login;

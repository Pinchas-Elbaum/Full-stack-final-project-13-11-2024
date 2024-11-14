import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../providers/UserProvider';
import { SnackbarContext } from '../providers/SnakeBarProvider';
import axios from 'axios';

interface IUserLogin{
    name: string;
    password: string;
}

const Login = () => {

    const { setuser } = useContext(UserContext);
    const { message, isOpen, showSnackbar, hideSnackbar } = useContext(SnackbarContext)!

    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const submitHeandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const userLogin: IUserLogin = {
            name: nameRef.current!.value,
            password: passwordRef.current!.value
        };

        nameRef.current!.value = "";
        passwordRef.current!.value = "";

        axios.post("http://localhost:3300/auth/login", userLogin)
            .then((res) => {
                setuser(res.data);
                showSnackbar('User logged in successfully!!');
                setTimeout(() => {
                    hideSnackbar();
                    navigate('/home');
                }, 2000);
            })
            .catch((err) => {
                console.log(err);
                showSnackbar('Error!!');
                setTimeout(() => {
                    hideSnackbar();
                }, 2000);
            });
    }

    return (
        <div>

            <form onSubmit={submitHeandler}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" ref={nameRef} required />
                <label htmlFor="age">Password</label>
                <input type="text" id="password" ref={passwordRef} required />
                <button type="submit">Login</button>
            </form>


            {isOpen && (
                <div className="snackbar">
                    {message}
                </div>
            )}
        </div>
    )
}

export default Login

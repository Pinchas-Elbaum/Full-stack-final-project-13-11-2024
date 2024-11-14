import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../providers/UserProvider';
import { SnackbarContext } from '../providers/SnakeBarProvider';
import axios from 'axios';
import { IUserLogin } from '../types/Types';



const Login = () => {

    const { user, setuser } = useContext(UserContext);
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
                setuser({ name: res.data.name, organization: res.data.organization, organizationId: res.data.organizationId, bugdet: res.data.budget ,id: res.data.id });
                showSnackbar('User logged in successfully!!');
                setTimeout(() => {
                    hideSnackbar();
                    navigate('/currentWeaponQuantity');
                }, 2000);            })

            .catch((err) => {
                console.log(err);
                showSnackbar('Error!!');
                setTimeout(() => {
                    hideSnackbar();
                }, 2000);
            }
           
        );

        
    }

    return (
        <div>
            <h2>{"Welcome " + user.name}</h2>
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

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import logo from '../../logo.svg'
import style from './login.module.css'
import { Link } from 'react-router-dom'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { callAuth } from '../../AuthProvider/Auth'

const Login = () => {

    const auth = callAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const updatePassword = (e) => {
        setPassword(e.target.value)
    }

    const updateEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleLogin = (e) => {
        e.preventDefault();
        NotificationManager.info("Processing", "Login");

        if(email.length === 0) {
            NotificationManager.error('Email cannot be empty', 'Login', 5000)
            return false;
        }

        if(password.length === 0) {
            NotificationManager('Password cannot be empty', 'Login', 5000)
            return false;
        }

        const data = {
            email: email,
            password: password
        }

        axios.post("https://www.auth.grandapihub.org.ng/api/auth/login", data)
            .then((res) => {
                if(res.data.status === "success") {
                    NotificationManager.success("Success", "Login", 5000);
                    auth.login(email);
                } else {
                    NotificationManager.error(res.data.error, "Login", 5000);
                }
            })
            .catch((err) => {
                console.log(err);
                NotificationManager.error("Error while logging in", "Login", 5000);
            })
    }

    useEffect(() => {
      return () => {
        document.title = "Login | My Auth Model"
      };
    }, []);

    return (
        <>
            <NotificationContainer />
            <section className="hero is-primary is-fullheight">
                <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                    <div className="column is-5-tablet is-5-desktop is-4-widescreen">
                        <form action="" className="box" onSubmit={handleLogin}>
                            <div className={style.textCenter}>
                                <img src={logo} width="75" height="75" alt="" />
                            </div>
                            <div className="field">
                                <label htmlFor="email" className="label">Email</label>
                                <div className="control has-icons-left">
                                    <input type="email" name="email" id="email" onChange={updateEmail} value={email} placeholder="e.g. bobsmith@gmail.com" className="input" />
                                    <span className="icon is-small is-left">
                                        <i className="fa fa-envelope"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="password" className="label">Password</label>
                                <div className="control has-icons-left">
                                    <input type="password" value={password} onChange={updatePassword} name="password" id="password" placeholder="*******" className="input" />
                                    <span className="icon is-small is-left">
                                        <i className="fa fa-lock"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="field">
                                <button className={`button is-success ${style.w100}`}>
                                    Login
                                </button>
                            </div>
                            <div className="field">
                                <p className={style.monoText}>
                                    Need an account? &nbsp; 
                                    <Link to="/register">
                                        Sign up
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </section>
        </>
    )
}

export default Login;
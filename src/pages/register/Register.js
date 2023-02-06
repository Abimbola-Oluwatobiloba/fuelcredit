import React, { useEffect, useState } from 'react'
import logo from '../../logo.svg'
import style from './register.module.css'
import { Link } from 'react-router-dom'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import axios from 'axios'

const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const updatePassword = (e) => {
        setPassword(e.target.value);
    }

    const updateName = (e) => {
        setName(e.target.value);
    }

    const updateEmail = (e) => {
        setEmail(e.target.value);

        if(e.target.value.length > 10) {
            axios.post("https://www.auth.grandapihub.org.ng/api/auth/register/validate/email", {email: e.target.value})
            .then((res) => {
                if (res.data.status === "success") {
                    NotificationManager.success("Email is okay", "Register", 1000);
                } else {
                    NotificationManager.error(res.data.error, "Register", 1000);
                }
            })
            .catch((err) => {
                console.log(err);
                NotificationManager.error("Error validating email", "Register", 1000);
            })
        }
    }

    const handleRegister = (e) => {
        e.preventDefault();
        NotificationManager.info("Processing", "Register");

        if (name.length === 0) {
            NotificationManager.error("Name cannot be empty")
            return false;
        }

        if (email.length === 0) {
            NotificationManager.error("Email cannot be empty")
            return false;
        }

        if (password.length === 0) {
            NotificationManager.error("Password cannot be empty")
            return false;
        }

        const data = {
            email: email,
            password: password,
            name: name
        }

        axios.post("https://www.auth.grandapihub.org.ng/api/auth/register", data)
            .then((res) => {
                if (res.data.status === "success") {
                    NotificationManager.success("Success", "Register", 2500);
                    setTimeout(() => {
                        window.location.href = "/login";
                    }, 5000);
                } else {
                    NotificationManager.error(res.data.error, "Register", 5000);
                }
            })
            .catch((err) => {
                console.log(err);
                NotificationManager.error("Error while registering", "Register", 5000);
            })
    }

    useEffect(() => {
        return () => {
            document.title = "Register | My Auth Model"
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
                                <form action="" className="box" onSubmit={handleRegister}>
                                    <div className={style.textCenter}>
                                        <img src={logo} width="75" height="75" alt="" />
                                    </div>

                                    <div className="field">
                                        <label htmlFor="name" className="label">Name</label>
                                        <div className="control has-icons-left">
                                            <input type="text" name="name" id="name" onChange={updateName} value={name} placeholder="John Doe" className="input" />
                                            <span className="icon is-small is-left">
                                                <i className="fa fa-user"></i>
                                            </span>
                                        </div>
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
                                        <button type='submit' className={`button is-success ${style.w100}`}>
                                            Register
                                        </button>
                                    </div>
                                    <div className="field">
                                        <p className={style.monoText}>
                                            Already have an account? &nbsp;
                                            <Link to="/login">
                                                Login
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

export default Register;
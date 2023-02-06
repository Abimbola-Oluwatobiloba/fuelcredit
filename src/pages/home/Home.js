import React, { useEffect, useState } from 'react'
import logo from '../../logo.svg'
import { Link } from 'react-router-dom'
import { callAuth } from '../../AuthProvider/Auth';
import style from './home.module.css';

const Home = () => {

    const auth = callAuth();

    const handleLogout = () => {
        auth.logout();
    }

    const [menuVisible, setMenuVisible] = useState(false);

    const toogleMenu = () => {
        if (menuVisible) {
            setMenuVisible(false);
        } else {
            setMenuVisible(true);
        }
    }

    useEffect(() => {
        return () => {
            setMenuVisible(false)
        };
    }, [])
    return (
        <>
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link to="/" className="navbar-item">
                        <img src={logo} width="30" height="30" alt="" />
                        <span>
                            <strong>
                                My Auth Model
                            </strong>
                        </span>
                    </Link>

                    <button className="navbar-burger" onClick={toogleMenu}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </button>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <Link to="/" className="navbar-item">
                            Home
                        </Link>

                        <Link to="" className="navbar-item">
                            Documentation
                        </Link>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className={auth.isLoggedIn ? `d-none` : `buttons`}>
                                <Link to="/register" className="button is-primary">
                                    <strong>Sign up</strong>
                                </Link>
                                <Link to="/login" className="button is-light">
                                    Log in
                                </Link>
                            </div>
                            <div className={!auth.isLoggedIn ? `d-none` : `buttons`}>
                                <button onClick={handleLogout} className="button is-light">
                                    Log out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <section className={menuVisible ? `${style.mobileMenu}` : "d-none"}>
                <ul className={style.mobileNavBox}>
                    <li>
                        <Link to="/" className={style.navLink}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <button className={style.navLink} onClick={handleLogout}>
                            Logout
                        </button>
                    </li>
                </ul>
            </section>
            <section>
                <div className="container is-fluid">
                    <div className="notification is-info">
                        <strong>
                            {auth.userData.email}
                        </strong> is logged in
                    </div>

                    <div className="box">
                        <article className="media">
                            <div className="media-left">
                                <figure className="image is-64x64">
                                    <span className='fa fa-user-circle fa-3x'></span>
                                </figure>
                            </div>
                            <div className="media-content">
                                <div className="content">
                                    <p>
                                        <strong>
                                            {auth.userData.name}
                                        </strong>
                                        <br />

                                        {(auth.userData.is_activated === "0") ? "Email address not verified" : "Email address verified"}
                                    </p>
                                    <pre>
                                        Password is encrypted
                                    </pre>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home
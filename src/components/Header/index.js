import React from "react";
import './style.css';
import logo from './Header-logo.png';
import perfil from './Header-perfil.png';

export default ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                      <img src={logo}/>          
                 </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src={perfil} />
                </a>
            </div>
        </header>
    )
}
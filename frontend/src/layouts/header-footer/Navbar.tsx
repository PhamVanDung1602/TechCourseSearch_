/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand col-3" href="http://localhost:3000">
                    <img src="images/DP.png" alt="Logo" width="178" height="50" className="d-inline-block align-top" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Khóa học</a> 
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Cộng đồng</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Quy định</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Liên hệ</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <i className="fas fa-user"></i> Login/Sign up
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar
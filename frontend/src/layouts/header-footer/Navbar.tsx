/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import LoginForm from "../user/LoginForm";
import RegisterForm from "../user/RegisterForm";
import FooterForm from "../user/components/FooterForm";

function Navbar() {
    const [modalOpened, setModalOpened] = useState(false);

    const [showLogin, setShowLogin] = useState(true);

    const toggleForm = () => {
        setShowLogin(!showLogin);
    };

    const closeModal = () => {
        setModalOpened(false);
        setShowLogin(false);
    }

    const openModal = (modalType: string) => {
        if (modalType === "login") {
            setShowLogin(true);
        }
        setModalOpened(true);
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
                            <a className="nav-link" href="#">KHÓA HỌC</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">CỘNG ĐỒNG</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">QUY ĐỊNH</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">LIÊN HỆ</a>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-link" onClick={() => openModal("login")}>
                                <i className="fas fa-user"></i> LOGIN/SIGN UP
                            </Link>
                            <Modal show={modalOpened} onHide={closeModal}>
                                <ModalHeader closeButton>
                                    <ModalTitle>
                                        <h5 className="h1 fw-bold mx-md-4 mt-4">
                                            {showLogin ? "Đăng nhập" : "Đăng ký"}
                                        </h5>
                                    </ModalTitle>
                                </ModalHeader>
                                <ModalBody>
                                    <div className="text-center">
                                        {showLogin ? <LoginForm /> : <RegisterForm />}
                                        <p>
                                            {showLogin ? "Not a member? " : "Had an account? "}
                                            <Link
                                                to=""
                                                style={{ textDecoration: "none" }}
                                                onClick={toggleForm}
                                            >
                                                {showLogin ? "Register" : "Login"}
                                            </Link>
                                        </p>
                                        <FooterForm />
                                    </div>
                                </ModalBody>
                            </Modal>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar
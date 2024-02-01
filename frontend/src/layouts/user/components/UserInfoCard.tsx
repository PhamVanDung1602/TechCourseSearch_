import { useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import { Link, Route } from "react-router-dom";
import ActivateNewAccount from "../ActivationForm";

function UserInfoCard() {
    //show modal
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const openModal1 = () => {
        setShowModal1(true);
    }
    const closeModal1 = () => {
        setShowModal1(false);
    }
    const openModal2 = () => {
        setShowModal2(true);
    }
    const closeModal2 = () => {
        setShowModal2(false);
    }

    //handle updating user information
    return (
        <>
            <h2 className="mb-3">Thông tin tài khoản</h2>
            {/* Avatar */}
            <div className="text-center mb-4">
                <div className="position-relative d-inline-block">
                    <div className="avatar-circle">
                        <i className="fas fa-user-circle"></i>
                        <div className="overlay">
                            <label htmlFor="avatarFile" className="overlay-label">Thay đổi ảnh</label>
                        </div>
                    </div>
                    <input type="file" name="avatarFile" id="avatarFile" style={{ display: 'none' }} />
                </div>
            </div>

            {/* User information */}
            <div className="table-container">
                <table className="table table-striped custom-table">
                    <tbody>
                        <tr>
                            <td><span className="fw-lighter fst-italic">Họ tên</span></td>
                        
                        </tr>
                        <tr>
                            <td><span className="fw-light fst-italic">Ngày sinh</span></td>

                        </tr>
                        <tr>
                            <td><span className="fw-light fst-italic">Giới tính</span></td>

                        </tr>
                        <tr>
                            <td><span className="fw-light fst-italic">Số điện thoại</span></td>

                        </tr>
                        <tr>
                            <td><span className="fw-light fst-italic">Địa chỉ</span></td>
        
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Update user infomation */}
            <div className="text-center">
                <button type="button" className="Card Card-button">
                    <Link to="" style={{ textDecoration: 'none', color: 'black' }} onClick={openModal1}>
                        <div className="Card-button-content">
                            <span className="button-text"><strong>CẬP NHẬT</strong></span>
                        </div>
                    </Link>
                    <Modal show={showModal1} onHide={closeModal1}>
                        <ModalHeader closeButton>
                            <ModalTitle>
                                <h3 className="mx-md-4 mt-4">
                                    Chỉnh sửa thông tin tài khoản
                                </h3>
                            </ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            <div className="container h-100">
                                <div className="row d-flex justify-content-center align-items-center h-100">
                                    <div className="col-lg-12 col-xl-11">
                                        <div className="row justify-content-center">
                                            <form className="mx-1 mx-md-4">
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="text" style={{ borderRadius: '20px' }} id="form3Example1c" className="form-control" placeholder="Họ tên của bạn" />
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <div className="row">
                                                            <div className="col-4">
                                                                <select className="form-select" id="day" name="day">
                                                                    <option value="">Ngày</option>
                                                                    {Array.from({ length: 31 }, (_, index) => (
                                                                        <option key={index + 1} value={index + 1}>{index + 1}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div className="col-4">
                                                                <select className="form-select" id="month" name="month">
                                                                    <option value="">Tháng</option>
                                                                    {Array.from({ length: 12 }, (_, index) => (
                                                                        <option key={index + 1} value={index + 1}>{index + 1}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div className="col-4">
                                                                <select className="form-select" id="year" name="year" >
                                                                    <option value="">Năm</option>
                                                                    {Array.from({ length: 100 }, (_, index) => {
                                                                        const year = new Date().getFullYear() - index;
                                                                        return <option key={year} value={year}>{year}</option>;
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <select className="form-select" id="gender" name="gender">
                                                            <option value="">Chọn giới tính</option>
                                                            <option value="Nam">Nam</option>
                                                            <option value="Nữ">Nữ</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="text" style={{ borderRadius: '20px' }} id="form3Example1c" className="form-control" placeholder="Số điện thoại" />
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="text" style={{ borderRadius: '20px' }} id="form3Example1c" className="form-control" placeholder="Địa chỉ" />
                                                    </div>
                                                </div>

                                                <div className="text-center">
                                                    <button type="submit" className="btn btn-primary" style={{ borderRadius: '20px', width: '50%' }}>Cập nhật tài khoản</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                    </Modal>
                </button>
            </div>

            <hr className="mt-4" style={{ width: "80%", margin: "auto", textAlign: "center" }} />

            <h2 className="mt-4">Thông tin đăng nhập</h2>
            {/* Email, username, password */}
            <div className="table-container">
                <table className="table table-striped custom-table">
                    <tbody>
                        <tr>
                            <td><span className="fw-light fst-italic">Email</span></td>

                        </tr>
                        <tr>
                            <td><span className="fw-light fst-italic">Tên đăng nhập</span></td>

                        </tr>
                        <tr>
                            <td><span className="fw-light fst-italic">Mật khẩu</span></td>

                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Change new password*/}
            <div className="text-center">
                <button type="button" className="Card Card-button">
                    <Link to="" style={{ textDecoration: 'none', color: 'black' }} onClick={openModal2}>
                        <div className="Card-button-content">
                            <span className="button-text"><strong>CẬP NHẬT</strong></span>
                        </div>
                    </Link>
                    <Modal show={showModal2} onHide={closeModal2}>
                        <ModalHeader closeButton>
                            <ModalTitle>
                                <h3 className="mx-md-4 mt-4">
                                    Chỉnh sửa thông tin tài khoản
                                </h3>
                            </ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            <div className="container h-100">
                                <div className="row d-flex justify-content-center align-items-center h-100">
                                    <div className="col-lg-12 col-xl-11">
                                        <div className="row justify-content-center">
                                            <form className="mx-1 mx-md-4">
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            style={{ borderRadius: '20px' }}
                                                            type="password"
                                                            id="password"
                                                            className="form-control"
                                                            placeholder="Mật khẩu cũ"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            style={{ borderRadius: '20px' }}
                                                            type="password"
                                                            id="password"
                                                            className="form-control"
                                                            placeholder="Mật khẩu mới"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            style={{ borderRadius: '20px' }}
                                                            type="password"
                                                            id="password"
                                                            className="form-control"
                                                            placeholder="Nhập lại mật khẩu mới"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="text-center">
                                                    <button type="submit" className="btn btn-primary" style={{ borderRadius: '20px', width: '50%' }}>Cập nhật mật khẩu</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                    </Modal>
                </button>
            </div>
        </>
    );
}

export default UserInfoCard
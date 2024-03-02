import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import { Link} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import RequireUser from "../../../context/components/RequireUser";
interface JwtPayload {
    fullName: string;
    sub: string;
    isUser: boolean;
}

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

    //handle attach fullname, email
    const token = localStorage.getItem('token');
    // decode token
    const decodedToken = jwtDecode(token ?? '') as JwtPayload;
    // get info
    const email = decodedToken.sub;
    
    //handle update info
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [address, setAddress] = useState('');

    //CHECK PASSWORD---------
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const checkPhoneNumber = (phoneNumber: string) => {
        if (phoneNumber === "") {
            setPhoneNumber("");
            return true;
        }
        const phoneNumberRegex = /^0[0-9]{9}$/;
        if (!phoneNumberRegex.test(phoneNumber)) {
            setPhoneNumberError("Số điện thoại phải bắt đầu bằng chữ số 0 và có 10 chữ số");
            return true;
        } else {
            setPhoneNumberError("") // valid
            return false;
        }
    }

    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //check password
        setPhoneNumber(e.target.value);

        //check error
        setPhoneNumberError('');

        //check conditions
        checkPhoneNumber(e.target.value);
    }
    //-----------------------

    useEffect(() => {
        // Gửi yêu cầu GET để lấy thông tin người dùng khi component được tạo
        fetch(`http://localhost:8080/user-info/getUserInfo?email=${email}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    const {fullName, day, month, year, address, phoneNumber, gender} = data;
                    setFullName(fullName);
                    setDay(day);
                    setMonth(month);
                    setYear(year);
                    setAddress(address);
                    setPhoneNumber(phoneNumber);
                    setGender(gender);
                }
            });
    }, []);
   
    const handleUpdateInfo = async (e: React.FormEvent) => {
        setPhoneNumberError('');

        //avoid clicking continously
        e.preventDefault();

        if (
            !fullName &&
            !day &&
            !month &&
            !year &&
            !gender &&
            !phoneNumber &&
            !address
        ) {
            console.log('Không có thông tin để cập nhật');
            return;
        }

        try {
            const url1 = `http://localhost:8080/user-info/updateUserFullName?email=${email}`;
            const url2 = `http://localhost:8080/user-info/updateUserDetails?email=${email}`;

            const headers = {
                'Content-Type': 'application/json',
              };
            const response1 = await fetch(url1, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    fullName: fullName,
                }),
            });

            const response2 = await fetch(url2, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    day: day,
                    month: month,
                    year: year,
                    gender: gender,
                    phoneNumber: phoneNumber,
                    address: address,
                }),
            });

            if (response1.ok && response2.ok) {
                console.log('Cập nhật thông tin thành công!');
                window.location.reload();
            } else {
                console.log(response1.text());
                alert('Không cập nhật được thông tin người dùng');
            }
        } catch (error) {
            alert("Đã xảy ra lỗi trong quá trình cập nhật thông tin người dùng");
        }

    }


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
                            <td>
                                {fullName ? (
                                    <span className="fw-lighter fst-italic">{fullName}</span>
                                ) : (
                                    <span className="fw-lighter fst-italic">Chưa cập nhật</span>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td><span className="fw-light fst-italic">Ngày sinh</span></td>
                            <td>
                                {day && month && year ? (
                                    <span className="fw-lighter fst-italic">{day}/{month}/{year}</span>
                                ) : (
                                    <span className="fw-lighter fst-italic">Chưa cập nhật</span>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td><span className="fw-light fst-italic">Giới tính</span></td>
                            <td>
                                {gender ? (
                                    <span className="fw-lighter fst-italic">{gender}</span>
                                ) : (
                                    <span className="fw-lighter fst-italic">Chưa cập nhật</span>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td><span className="fw-light fst-italic">Số điện thoại</span></td>
                            <td>
                                {phoneNumber ? (
                                    <span className="fw-lighter fst-italic">{phoneNumber}</span>
                                ) : (
                                    <span className="fw-lighter fst-italic">Chưa cập nhật</span>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td><span className="fw-light fst-italic">Địa chỉ</span></td>
                            <td>
                                {address ? (
                                    <span className="fw-lighter fst-italic">{address}</span>
                                ) : (
                                    <span className="fw-lighter fst-italic">Chưa cập nhật</span>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Update user infomation */}
            <div className="text-center">
                <button type="button" className="Card Card-button">
                    <Link to="/account/info" style={{ textDecoration: 'none', color: 'black' }} onClick={openModal1}>
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
                                                        <input type="text"
                                                            style={{ borderRadius: '20px' }}
                                                            id="fullName"
                                                            className="form-control"
                                                            placeholder="Họ tên của bạn"
                                                            onChange={(e) => setFullName(e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <div className="row">
                                                            <div className="col-4">
                                                                <select className="form-select" id="day" name="day" onChange={(e) => setDay(e.target.value)}>
                                                                    <option value="">Ngày</option>
                                                                    {Array.from({ length: 31 }, (_, index) => (
                                                                        <option key={index + 1} value={index + 1}>{index + 1}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div className="col-4">
                                                                <select className="form-select" id="month" name="month" onChange={(e) => setMonth(e.target.value)}>
                                                                    <option value="">Tháng</option>
                                                                    {Array.from({ length: 12 }, (_, index) => (
                                                                        <option key={index + 1} value={index + 1}>{index + 1}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div className="col-4">
                                                                <select className="form-select" id="year" name="year" onChange={(e) => setYear(e.target.value)} >
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
                                                        <select className="form-select" id="gender" name="gender" onChange={(e) => setGender(e.target.value)}>
                                                            <option value="">Chọn giới tính</option>
                                                            <option value="Nam">Nam</option>
                                                            <option value="Nữ">Nữ</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="text" style={{ borderRadius: '20px' }} id="phoneNumber" className="form-control" placeholder="Số điện thoại"
                                                        onChange={handlePhoneNumberChange} />
                                                        <div className="error-message">{phoneNumberError}</div>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="text" style={{ borderRadius: '20px' }} id="address" className="form-control" placeholder="Địa chỉ"
                                                        onChange={(e) => setAddress(e.target.value)} />
                                                    </div>
                                                </div>

                                                <div className="text-center">
                                                    <button type="submit" className="btn btn-primary" style={{ borderRadius: '20px', width: '50%' }} onClick={handleUpdateInfo}>Cập nhật tài khoản</button>
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
            {/* Email, password */}
            <div className="table-container">
                <table className="table table-striped custom-table">
                    <tbody>
                        <tr>
                            <td><span className="fw-light fst-italic">Email</span></td>
                            <td><span className="fw-lighter fst-italic">{email}</span></td>
                        </tr>
                        <tr>
                            <td><span className="fw-light fst-italic">Mật khẩu</span></td>
                            <td><span className="fw-lighter fst-italic">*************</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Change new password*/}
            <div className="text-center">
                <button type="button" className="Card Card-button">
                    <Link to="/account/info" style={{ textDecoration: 'none', color: 'black' }} onClick={openModal2}>
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


const UserInfoCard_User = RequireUser(UserInfoCard);

export default UserInfoCard_User
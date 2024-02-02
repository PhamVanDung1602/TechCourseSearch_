/* eslint-disable jsx-a11y/img-redundant-alt */
import { ChangeEvent, useState } from "react";

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    //error message variable
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [repeatPasswordError, setRepeatPasswordError] = useState("");


    //CHECK USERNAME---------
    const handleUsernameExisted = async (username: string) => {
        //endpoint
        const url = `http://localhost:8080/user/search/existsByUsername?username=${username}`;
        console.log(url);

        //call api
        try {
            const response = await fetch(url);
            const data = await response.text();

            if (data === "true") {
                setUsernameError("Tên đăng nhập đã tồn tại!");
                return true;
            }
        } catch (error) {
            console.error("Lỗi khi kiểm tra tên đăng nhập", error);
            return false;
        }
    }

    const handleUsernameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        // change value
        setUsername(e.target.value);

        //check Error
        setUsernameError('');

        //check the existence
        return handleUsernameExisted(e.target.value);
    }
    //-----------------------

    //CHECK EMAIL------------
    const handleEmailExisted = async (email: string) => {
        //endpoint
        const url = `http://localhost:8080/user/search/existsByEmail?email=${email}`;

        //call api
        try {
            const response = await fetch(url);
            const data = await response.text();

            if (data === "true") {
                setEmailError("Email đã tồn tại!");
                return true
            }
        } catch (error) {
            console.error("Lỗi khi kiểm tra email", error);
            return false;
        }
    }

    const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        //check value
        setEmail(e.target.value);

        //check error
        setEmailError('');

        //check the existence
        handleEmailExisted(e.target.value);
    }
    //-----------------------

    //CHECK PASSWORD---------
    const checkPassword = (password: string) => {
        if (password === "") {
            setPasswordError("");
            return true;
        }
        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError("Mật khẩu phải có ít nhất 8 ký tự và ít nhất 1 ký tự đặc biệt");
            return true;
        } else {
            setPasswordError("") // valid
            return false;
        }
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        //check password
        setPassword(e.target.value);

        //check error
        setPasswordError('');

        //check conditions
        checkPassword(e.target.value);
    }
    //-----------------------

    //CHECK REPEAT PASSWORD--
    const checkRepeatPassword = (repeatPassword: string) => {
        if (repeatPassword !== password) {
            setRepeatPasswordError("Mật khẩu không trùng khớp!");
            return true;
        } else {
            setRepeatPasswordError(""); //match
            return false;
        }
    }

    const handleRepeatPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        // check repeat password
        setRepeatPassword(e.target.value);

        //check error 
        setRepeatPasswordError(" ");

        //check the resemblance
        checkRepeatPassword(e.target.value);
    }
    //-----------------------

    //SUBMIT-----------------

    const handleSubmit = async (e: React.FormEvent) => {
        //clear any previous error
        setUsernameError('');
        setEmailError('');
        setPasswordError('');
        setRepeatPasswordError('');

        //avoid clicking continously
        e.preventDefault();

        //check condition and attach the result to the variable
        const isUsernameValid = !await handleUsernameExisted(username);
        const isPasswordValid = !checkPassword(password);
        const isEmailValid = !await handleEmailExisted(email);
        const isRepeatPasswordValid = !checkRepeatPassword(repeatPassword);

        // Check if any field is empty
        if (!username || !email || !password || !repeatPassword) {
            alert('Vui lòng điền đầy đủ thông tin');
        }

        //check all conditions 
        if (isUsernameValid && isPasswordValid && isEmailValid && isRepeatPasswordValid) {
            try {
                const url = 'http://localhost:8080/account/register';
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            username: username,
                            email: email,
                            password: password
                        }
                    )
                })
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    const { email, activationCode } = data
                    window.location.href = `/activate/${email}/${activationCode}`;
                } else {
                    alert("Đã xảy ra lỗi trong quá trình đăng ký");
                }
            } catch (error) {
                alert("Đã xảy ra lỗi trong quá trình đăng ký");
            }
        }
    }
    //-----------------------
    return (
        <>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="row justify-content-center">
                            <form className="mx-1 mx-md-4">
                                <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                    <div className="form-outline flex-fill mb-0">
                                        <input
                                            type="text"
                                            id="username"
                                            className="form-control"
                                            placeholder="Username"
                                            value={username}
                                            onChange={handleUsernameChange} />
                                        <div className="error-message">{usernameError}</div>
                                    </div>
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                    <div className="form-outline flex-fill mb-0">
                                        <input
                                            type="email"
                                            id="email"
                                            className="form-control"
                                            placeholder="Email"
                                            value={email}
                                            onChange={handleEmailChange} />
                                        <div className="error-message">{emailError}</div>
                                    </div>
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                    <div className="form-outline flex-fill mb-0">
                                        <input
                                            type="password"
                                            id="password"
                                            className="form-control"
                                            placeholder="Password"
                                            value={password}
                                            onChange={handlePasswordChange} />
                                        <div className="error-message">{passwordError}</div>
                                    </div>
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                    <div className="form-outline flex-fill mb-0">
                                        <input
                                            type="password"
                                            id="repeatPassword"
                                            className="form-control"
                                            placeholder="Repeat your password"
                                            value={repeatPassword}
                                            onChange={handleRepeatPasswordChange} />
                                        <div className="error-message">{repeatPasswordError}</div>
                                    </div>
                                </div>

                                <div className="text-center form-outline mb-4">
                                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                                    <label className="form-check-label" htmlFor="form2Example3">
                                        I agree all statements in <a href="#!" style={{ textDecoration: 'none' }}>Terms of service</a>
                                    </label>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary" style={{ width: '50%' }} onClick={handleSubmit}>
                                        Register
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}
export default RegisterForm
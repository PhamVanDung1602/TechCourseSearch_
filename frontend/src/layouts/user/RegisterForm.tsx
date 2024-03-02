/* eslint-disable jsx-a11y/img-redundant-alt */
import { ChangeEvent, useContext,useState } from "react";
import { LoginState } from "../../context/LoginState";


function RegisterForm() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    //error message variable
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [repeatPasswordError, setRepeatPasswordError] = useState("");

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
        setEmailError('');
        setPasswordError('');
        setRepeatPasswordError('');

        //avoid clicking continously
        e.preventDefault();

        //check condition and attach the result to the variable
        const isPasswordValid = !checkPassword(password);
        const isEmailValid = !await handleEmailExisted(email);
        const isRepeatPasswordValid = !checkRepeatPassword(repeatPassword);

        // Check if any field is empty
        if (!email || !password || !repeatPassword) {
            alert('Vui lòng điền đầy đủ thông tin');
        }

        //check all conditions 
        if (isPasswordValid && isEmailValid && isRepeatPasswordValid) {
            try {
                const url = 'http://localhost:8080/account/register';
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            fullName: fullName,
                            email: email,
                            password: password
                        }
                    )
                })
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    const { email, activationCode } = data
                    setEmail(email);
                    setActivationCode(activationCode);
                    handleShowForm();
                    //handleUserData();
                } else
                    alert("Đã xảy ra lỗi trong quá trình đăng ký");
            } catch (error) {
                alert("Đã xảy ra lỗi trong quá trình đăng ký");
            }
        }

    }
    //-----------------------

    //----SAVE TO REDUX STORE--------
    /*const dispatch = useDispatch();
    const handleUserData = () => {
        const trimmedFullName = fullName.toString().trim();
        const trimmedEmail = email.trim();

        // send action to update Redux store with values from registration form
        dispatch(setUserData({ fullName: trimmedFullName, email: trimmedEmail }));
    };*/
    //------------------------------

    //----HANDLE ACTIVATE ACCOUNT--------
    const [showForm, setShowForm] = useState(false);
    const [activationCodeInput, setActivationCodeInput] = useState("");
    const [activationCode, setActivationCode] = useState("");
    const { updateLoginStatus } = useContext(LoginState);
    const handleShowForm = () => {
        setShowForm(true);
    }
    const handleActivateAccount = async (e: React.FormEvent) => {
        //avoid clicking continously
        e.preventDefault();

        try {
            const url = `http://localhost:8080/account/activate?email=${email}&activationCode=${activationCode}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                if (activationCodeInput === activationCode) {
                    const data = await response.json();
                    const { token, message } = data;
                    //save token to localStorage or cookie
                    localStorage.setItem('token', token);
                    
                    console.log(message);
                    updateLoginStatus(true);
                } else {
                    alert("Nhập mã kích hoạt không chính xác, vui lòng kiểm tra lại!");
                }
            } else {
                const errorText = await response.text();
                console.log("Thông báo:", errorText);
            }
        } catch (error) {
            console.log("Đã xảy ra lỗi trong quá trình kích hoạt:", error);
        }
    };

    //------------------------------------

    return (
        <>
            {showForm ? (
                <div className="container">
                    <div className="mt-4">
                        <div>
                            <p>Đăng ký thành công, vui lòng nhập mã kích hoạt để sử dụng tài khoản! </p>
                            <p style={{ color: 'red' }}>Chú ý: Nếu bạn không kích hoạt ngay bây giờ thì tài khoản của bạn vĩnh viễn không sử dụng được!</p>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="centered-input"
                                    id="activationCodeInput"
                                    placeholder="Mã kích hoạt"
                                    value={activationCodeInput}
                                    onChange={(e) => setActivationCodeInput(e.target.value)}
                                />
                            </div>
                            <div className="text-center mt-4">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    style={{ width: '50%' }}
                                    onClick={handleActivateAccount}
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>)
                : (
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
                                                    id="fullName"
                                                    className="form-control"
                                                    placeholder="Full name"
                                                    value={fullName}
                                                    onChange={(e) => setFullName(e.target.value)} />
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
                )}
        </>
    );

}
export default RegisterForm
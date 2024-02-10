import { useState } from "react";

interface LoginFormProps {
    updateNavbarState: (isLoggedIn: boolean) => void;
}
function LoginForm({updateNavbarState}: LoginFormProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = async () => {
        const loginRequest = {
            username: username,
            password: password
        }

        fetch('http://localhost:8080/account/login',
            {
                method:'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(loginRequest)
            }
        ).then (
            (response) => {
                if (response.ok){
                    return response.json();
                } else {
                    throw new Error("Đăng nhập thất bại");
                }
            }
        ).then(
            (data) => {
                //handle login successful
                const {jwt} = data;

                //save token to localStorage or cookie
                localStorage.setItem('token', jwt);

                //navigate to the main page or post-login tasks
                window.location.href = "/";
                updateNavbarState(true);
            }
        ).catch((error) => {
                //handel login error
                console.error('Đăng nhập thất bại', error);
                alert('Đăng nhập thất bại. Vui lòng kiểm tra lại tên đăng nhập hoặc mật khẩu');
                updateNavbarState(false);
            }
            );
    }


    return (
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
                                    value = {username}
                                    onChange = {(e) => setUsername(e.target.value)} />
                                </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                <div className="form-outline flex-fill mb-0">
                                    <input type="password" 
                                    id="password" 
                                    className="form-control" 
                                    placeholder="Password"
                                    value = {password}
                                    onChange = {(e) => setPassword(e.target.value)} />
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col d-flex justify-content-center">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="htmlForm2Example31" defaultChecked={true} />
                                        <label className="form-check-label" htmlFor="htmlForm2Example31"> Remember me </label>
                                    </div>
                                </div>

                                <div className="col">
                                    <a href="#!" style={{ textDecoration: 'none' }}>Forgot password?</a>
                                </div>
                            </div>
                            <div className="text-center">
                                <button type="button" className="btn btn-primary" onClick={handleLogin} style={{ width: '50%' }}>Sign in</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm
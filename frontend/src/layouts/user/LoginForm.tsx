
function LoginForm() {
    return (
        <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-lg-12 col-xl-11">
                    <div className="row justify-content-center">
                        <form className="mx-1 mx-md-4">
                            <div className="d-flex flex-row align-items-center mb-4">
                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                <div className="form-outline flex-fill mb-0">
                                    <input type="text" id="form3Example1c" className="form-control" placeholder="Username" />
                                </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                <div className="form-outline flex-fill mb-0">
                                    <input type="password" id="form3Example4c" className="form-control" placeholder="Password" />
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
                                <button type="submit" className="btn btn-primary" style={{ width: '50%' }}>Sign in</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm
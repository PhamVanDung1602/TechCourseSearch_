/* eslint-disable jsx-a11y/img-redundant-alt */

function RegisterForm() {
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
                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                <div className="form-outline flex-fill mb-0">
                                    <input type="email" id="form3Example3c" className="form-control" placeholder="Email" />
                                </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                <div className="form-outline flex-fill mb-0">
                                    <input type="password" id="form3Example4c" className="form-control" placeholder="Password" />
                                </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                <div className="form-outline flex-fill mb-0">
                                    <input type="password" id="form3Example4cd" className="form-control" placeholder="Repeat your password" />
                                </div>
                            </div>

                            <div className="text-center form-outline mb-4">
                                <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                                <label className="form-check-label" htmlFor="form2Example3">
                                    I agree all statements in <a href="#!" style={{ textDecoration: 'none' }}>Terms of service</a>
                                </label>
                            </div>

                            <div className="text-center">
                                <button type="button" className="btn btn-primary" style={{ width: '50%' }}>Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm
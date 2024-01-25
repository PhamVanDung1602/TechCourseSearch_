
function Footer() {
    return (
        <div className="container" style={{ fontSize: '16px'}}>
            <footer className="py-5">
                <hr className="bold-hr" style={{ width: '100%', color: 'black' }} />
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <h5 style={{ marginRight: '180px' }}>DP</h5>
                        <ul>
                            <p className="text-start"><strong>Tên công ty:</strong><span> DP Company</span> <br />
                                <strong>Đại diện:</strong> <span className="nowrap">John Doe</span> <br />
                                <strong>Mã ĐKKD:</strong> <span className="nowrap">ABC123</span> <br />
                                <strong>Ngày cấp:</strong> <span className="nowrap">01/01/2023</span> <br />
                                <strong>Nơi cấp:</strong> <span className="nowrap">Hà Nội</span> <br />
                                <strong>Địa chỉ:</strong> <span className="nowrap">123 đường ABC, Hà Nội</span> <br />
                                <strong>Email:</strong> <span className="nowrap">example@example.com</span>
                            </p>
                        </ul>
                    </div>

                    <div className="col-4 col-md-4 mb-3">
                        <ul className="nav" style={{ marginLeft: '150px' }}>
                            <li className="mx-2 mb-3"><i className="fab fa-twitter"></i></li>
                            <li className="mx-2 mb-3"><i className="fab fa-facebook"></i></li>
                            <li className="mx-2 mb-3"><i className="fab fa-instagram"></i></li>
                            <li className="mx-2 mb-3"><i className="fab fa-youtube"></i></li>
                        </ul>
                    </div>

                    <div className="col-md-3 offset-md-1 mb-3">
                        <form>
                            <h5>Nhận thông báo từ chúng tôi</h5>
                            <p>Thông báo hàng tháng những gì mới nhất từ chúng tôi</p>
                            <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                                <label className="visually-hidden">Địa chỉ email</label>
                                <input id="newsletter1" type="text" className="form-control" placeholder="Email address" />
                                <button className="btn btn-primary" style={{ width: '150px' }} type="button">Đăng ký</button>
                            </div>
                        </form>
                    </div>

                    <div className="py-2 border-top">
                        <p>&copy; 2023 Company, Inc. All rights reserved.</p>
                    </div>
                </div>
            </footer >
        </div >
    );
}

export default Footer
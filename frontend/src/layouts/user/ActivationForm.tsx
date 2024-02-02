import { useState } from "react";
import { useParams } from "react-router-dom";


function ActivationForm() {
    const { email, activationCode } = useParams();

    const handleActivateAccount = async () => {
        try {
            const url = `http://localhost:8080/account/activate?email=${email}&activationCode=${activationCode}`;
            const response = await fetch(url, {
                method: 'GET'
            });

            if (response.ok) {
                if (activationCodeInput === activationCode) {
                    alert("Kích hoạt thành công, vui lòng nhập thông tin cần thiết!")
                    window.location.href = "/account";
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

    const [activationCodeInput, setActivationCodeInput] = useState("");

    return (
        <div>
            <div className="d-flex justify-content-center">
                <input
                    type="text"
                    id="activationCodeInput"
                    className="centered-input"
                    placeholder="Mã kích hoạt"
                    style={{ width: '50%' }}
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
    );
}


export default ActivationForm;


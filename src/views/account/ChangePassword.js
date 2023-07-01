import "../../styles/ChangePassword.scss";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useContext } from "react"
import { useAuthContext } from '../../context/authContext';


const ChangePassword = ({ title }) => {
    const navigate = useNavigate();
    const { makeAuthRequest, dispatch, authData } = useAuthContext();
    const [authErrorMsg, setAuthErrorMsg] = useState("");
    const [matKhauCu, setMatKhauCu] = useState("");
    const [matKhauMoi, setMatKhauMoi] = useState("");
    const [nhapLaiMatKhauMoi, setNhapLaiMatKhauMoi] = useState("");

    const [hoTen, setHoTen] = useState("");
    const [email, setEmail] = useState("");
    const [taiKhoan, setTaiKhoan] = useState("");
    const [soDienThoai, setSoDienThoai] = useState("");
    const [diaChi, setDiaChi] = useState("");
    const [tinhTrang, setTinhTrang] = useState("");
    const [thungRac, setThungRac] = useState("");


    const data = {
        hoTen: hoTen,
        email: email,
        taiKhoan: taiKhoan,
        matKhau: matKhauMoi,
        soDienThoai: soDienThoai,
        diaChi: diaChi,
        tinhTrang: tinhTrang,
        thungRac: thungRac,
    };

    useState(() => {
        axios.get(`http://localhost:8080/api/v1/KhachHang/taiKhoan?taiKhoan=` + authData.info?.taiKhoan).then((res) => {
            setHoTen(res.data.hoTen);
            setEmail(res.data.email);
            setTaiKhoan(res.data.taiKhoan);
            setSoDienThoai(res.data.soDienThoai);
            setDiaChi(res.data.diaChi);
            setTinhTrang(res.data.tinhTrang);
            setThungRac(res.data.thungRac);
        });
    });

    function submitForm(e) {
        e.preventDefault();
        if (matKhauCu != (authData.info?.matKhau)) {
            setAuthErrorMsg("Mật khẩu cũ không đúng");
        }
        else if (matKhauMoi != nhapLaiMatKhauMoi) {
            setAuthErrorMsg("Nhập lại mật khẩu mới không khớp");
        }
        else {
            axios.put(`http://localhost:8080/api/v1/KhachHang/${authData.info?.id}`, data).then(navigate("/account"));
        }
    }

    return (
        <main className='bg-secondary'>
            <div className='container'>
                <div className='sc-login'>
                    <div className="login-content px-5 py-4">
                        <div className="login-title fs-20">Đổi Mật Khẩu</div>
                        <form>
                            <div className='form-element'>
                                <label htmlFor='username' className="form-label">Mật Khẩu Cũ: </label>
                                <input className="form-control" type="text" id="username" onChange={(e) => setMatKhauCu(e.target.value)} value={matKhauCu} required />
                            </div>
                            <div className='form-element'>
                                <label className='form-label' htmlFor='password'>Mật Khẩu Mới:</label>
                                <input className="form-control" type="password" id="password" onChange={(e) => setMatKhauMoi(e.target.value)} value={matKhauMoi} required />
                            </div>
                            <div className='form-element'>
                                <label className='form-label' htmlFor='password'>Nhập Lại Mật Khẩu Mới:</label>
                                <input className="form-control" type="password" id="password" onChange={(e) => setNhapLaiMatKhauMoi(e.target.value)} value={nhapLaiMatKhauMoi} required />
                            </div>
                            <button type="submit" className="btn-login fs-16" onClick={submitForm}>Đổi Mật Khẩu</button>
                            <div className='login-error-msg text-center my-3'>
                                <p className='text-danger'>
                                    {authErrorMsg}
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ChangePassword;

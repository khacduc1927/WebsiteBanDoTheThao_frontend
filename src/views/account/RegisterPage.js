import React, { useState, useEffect } from 'react';
import "../../styles/LoginPage.scss";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [authErrorMsg, setAuthErrorMsg] = useState("");
    const [hoTen, setHoTen] = useState("");
    const [email, setEmail] = useState("");
    const [taiKhoan, setTaiKhoan] = useState("");
    const [matKhau, setMatKhau] = useState("");
    const [rpmatkhau, setRPMatKhau] = useState("");

    const data = {
        hoTen: hoTen,
        email: email,
        taiKhoan: taiKhoan,
        matKhau: matKhau,
        tinhTrang: 1,
        thungRac: 0
    };

    function submitForm(e) {
        if (matKhau == rpmatkhau) {
            e.preventDefault();
            axios.post("http://localhost:8080/api/v1/KhachHang", data).then(navigate("/login"));
        }
        else {
            setAuthErrorMsg("Mật khẩu nhập lại không đúng");
        }
    }
    console.log(authErrorMsg);

    return (
        <main className='bg-secondary'>
            <div className='container'>
                <div className='sc-login'>
                    <div className="login-content px-5 py-4">
                        <div className="login-title fs-20">Đăng Ký</div>
                        <form onSubmit={submitForm}>
                            <div className='form-element'>
                                <label htmlFor='name' className="form-label">Họ Tên: </label>
                                <input className="form-control" type="text" id="name" onChange={(e) => setHoTen(e.target.value)} required />
                            </div>
                            <div className='form-element'>
                                <label htmlFor='username' className="form-label">Tài Khoản: </label>
                                <input className="form-control" type="text" id="username" onChange={(e) => setTaiKhoan(e.target.value)} required />
                            </div>
                            <div className='form-element'>
                                <label htmlFor='username' className="form-label">Email: </label>
                                <input className="form-control" type="text" id="username" onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className='form-element'>
                                <label className='form-label' htmlFor='password'>Mật Khẩu:</label>
                                <input className="form-control" type="password" id="password" onChange={(e) => setMatKhau(e.target.value)} required />
                            </div>
                            <div className='form-element'>
                                <label className='form-label' htmlFor='rppassword'>Nhâp Lại Mật Khẩu:</label>
                                <input className="form-control" type="password" id="rppassword" onChange={(e) => setRPMatKhau(e.target.value)} required />
                            </div>
                            <button type="submit" className="btn-login fs-16">Đăng Ký</button>
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
    )
}

export default RegisterPage
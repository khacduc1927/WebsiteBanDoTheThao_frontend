import "../../styles/ChangeInformation.scss";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useContext } from "react"
import { AuthContext } from "../../context/authContext";


const ChangeInformation = ({ title }) => {
    const { authData } = useContext(AuthContext);
    const [hoTen, setHoTen] = useState("");
    const [email, setEmail] = useState("");
    const [taiKhoan, setTaiKhoan] = useState("");
    const [matKhau, setMatKhau] = useState("");
    const [soDienThoai, setSoDienThoai] = useState("");
    const [diaChi, setDiaChi] = useState("");
    const [tinhTrang, setTinhTrang] = useState("");
    const [thungRac, setThungRac] = useState("");


    const data = {
        hoTen: hoTen,
        email: email,
        taiKhoan: taiKhoan,
        matKhau: matKhau,
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
            setMatKhau(res.data.matKhau);
            setTinhTrang(res.data.tinhTrang);
            setThungRac(res.data.thungRac);
        });
    });

    const userEdits = [
        {
            id: 1,
            label: "Họ Và Tên",
            type: "text",
            placeholder: "Họ và tên",
            value: hoTen,
            onChange: (e) => setHoTen(e.target.value),
        },
        {
            id: 2,
            label: "Email",
            type: "mail",
            placeholder: "@gmail.com",
            value: email,
            onChange: (e) => setEmail(e.target.value),
        },
        {
            id: 3,
            label: "Số Điện Thoại",
            type: "text",
            placeholder: "Số điện thoại",
            value: soDienThoai,
            onChange: (e) => setSoDienThoai(e.target.value),
        },
        {
            id: 4,
            label: "Địa Chỉ",
            type: "text",
            placeholder: "Địa chỉ",
            value: diaChi,
            onChange: (e) => setDiaChi(e.target.value),
        },
    ];

    const navigate = useNavigate();

    function submitForm(e) {
        e.preventDefault();
        axios.put(`http://localhost:8080/api/v1/KhachHang/${authData.info?.id}`, data).then(navigate("/account"));

    }

    return (
        <div className="new">
            <div className="newContainer">
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form>
                            {userEdits.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input type={input.type} placeholder={input.placeholder} value={input.value} onChange={input.onChange} />
                                </div>
                            ))}
                            <div><button type="submit" onClick={submitForm}>Chỉnh Sửa</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangeInformation;

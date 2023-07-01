import { useContext } from "react"
import { AuthContext } from "../../context/authContext";
import "../../styles/AccountPage.scss";
import { Link } from "react-router-dom";


const AccountPage = () => {
  const { authData } = useContext(AuthContext);
  console.log(authData);

  return (
    <main className="bg-secondary">
      <div className="container">
        <div className="sc-wrapper">
          <div className="account-details bg-white grid">
            <div className="account-details-left">
              <div style={{ textAlign: "center", marginBottom: 30 }}>
                <label>THÔNG TIN TÀI KHOẢN</label>
              </div>
              <div className="info-elem">
                <span className="info-elem-label">Full Name:</span>
                <span className="info-elem-value">{`${authData.info?.hoTen}`}</span>
              </div>
              <div className="info-elem">
                <span className="info-elem-label">Username</span>
                <span className="info-elem-value">{authData.info?.taiKhoan}</span>
              </div>
              <div className="info-elem">
                <span className="info-elem-label">Email</span>
                <span className="info-elem-value">{authData.info?.email}</span>
              </div>
              <div className="info-elem">
                <span className="info-elem-label">Số Điện Thoại</span>
                <span className="info-elem-value">{authData.info?.soDienThoai}</span>
              </div>
              <div className="info-elem">
                <span className="info-elem-label">Địa Chỉ</span>
                <span className="info-elem-value">{authData.info?.diaChi}</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <button type="button" className='my-2 fw-6' style={{ backgroundColor: 'blue', width: 200, height: 50, marginTop: 50, marginRight: 100 }}>
            <Link to={"/changeinformation"} className='nav-link no-wrap'>Chỉnh sửa thông tin</Link>
          </button>
          <button type="button" className='my-2 fw-6' style={{ backgroundColor: 'blue', width: 200, height: 50, marginTop: 50, marginLeft: 100 }}>
            <Link to={"/changepassword"} className='nav-link no-wrap'>Đổi Mật Khẩu</Link>
          </button></div>
      </div>
    </main>
  )
}

export default AccountPage
import axios from "../api/axios";
import { actionType } from "../constants";

export const makeAuthRequest = async (dispatch, loginData) => {
    dispatch({ type: actionType.AUTH_REQUEST });
    try {
        const username = loginData.username;
        const password = loginData.password;
        const { data } = await axios.get("http://localhost:8080/api/v1/KhachHang/taiKhoan?taiKhoan=" + username);
        if (password == data.matKhau) {
            dispatch({
                type: actionType.AUTH_SUCCESS, payload: data
            });
        }
        else {
            dispatch({
                type: actionType.AUTH_ERROR,
                payload: "Sai tên đăng nhập hoặc mật khẩu!"
            });
        }
    } catch (error) {
        if (!error?.response) {
            dispatch({
                type: actionType.AUTH_ERROR,
                payload: "No server response!"
            });
        }

        if (error.response?.status === 400) {
            dispatch({
                type: actionType.AUTH_ERROR,
                payload: "Missing username or password!"
            });
        }

        if (error.response?.status === 401) {
            console.log("hello");
            dispatch({
                type: actionType.AUTH_ERROR,
                payload: "Unauthorized!"
            });
        }
    }
}

export const logout = (dispatch) => {
    dispatch({ type: actionType.LOGOUT });
}

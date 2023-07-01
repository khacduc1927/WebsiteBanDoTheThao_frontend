import { actionType, route } from "../constants";
import axios from "../api/axios";

export const getAllProducts = async (dispatch) => {
    dispatch({
        type: actionType.GET_PRODUCTS_REQUEST
    });

    try {
        const { data } = await axios.get("http://localhost:8080/api/v1/SanPham");
        dispatch({
            type: actionType.GET_PRODUCTS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: actionType.GET_PRODUCTS_FAIL,
            payload: error.message
        });
    }
}

export const getSingleProduct = async (dispatch, id) => {
    dispatch({
        type: actionType.GET_SINGLE_PRODUCT_REQUEST
    });

    try {
        const { data } = await axios.get("http://localhost:8080/api/v1/SanPham/" + id);
        dispatch({
            type: actionType.GET_SINGLE_PRODUCT_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: actionType.GET_SINGLE_PRODUCT_FAIL,
            payload: error.message
        });
    }
}
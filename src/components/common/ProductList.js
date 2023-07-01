import React, { useEffect } from 'react';
import "../../styles/ProductList.scss";
import { AiOutlineStar } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { route } from "../../constants";
import { useFilterContext } from '../../context/filterContext';

const ProductList = ({ products }) => {

    const { grid_view } = useFilterContext();

    return (
        <div className="products">
            <div className="container">
                <div className={`product-list ${grid_view ? 'gridview' : 'listview'}`}>
                    {
                        products?.map(product => {
                            return (
                                <Link to={`${route.SINGLE_PRODUCT}${product?.id}`} className='product-item' key={product?.id}>
                                    <div className='product-item-img'>
                                        <img src={product?.hinhAnh} alt={product?.tenSanPham} className="img-cover" />
                                        <div className='product-discount'>{0}<span>%</span></div>
                                    </div>
                                    <div className='product-item-body'>
                                        <span className="product-category">{product?.maDanhMuc}</span>
                                        <span className='product-title'>{product?.tenSanPham}</span>

                                        <div className='product-price'>
                                            <span className='fw-6 fs-16'>{product?.giaBan}đ &nbsp;</span>
                                            <span className='text-dark'>Mã Nhãn Hiệu: {product?.maNhanHieu}</span>
                                        </div>

                                        <div className='product-item-bottom fs-12 flex align-center'>
                                            <div><span className='fw-6'>Số Lượng:</span> {product?.soLuong}</div>
                                            <div className='product-rating flex align-center'>Đánh Giá: 5<AiOutlineStar /></div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </div>

    )
}

export default ProductList
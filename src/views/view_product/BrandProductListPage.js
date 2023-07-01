import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { ProductList, Title } from '../../components/common';
import axios from "axios";

const BrandProductListPage = () => {
    const { brandKey } = useParams();

    const [brand, setBrand] = useState([]);

    function loadBrand() {
        axios.get("http://localhost:8080/api/v1/NhanHieu/" + brandKey).then((res) => {
            setBrand(res.data);
        });
    }

    useEffect(() => {
        loadBrand();
    });

    const [brandProduct, setBrandsProduct] = useState([]);

    function loadBrandProduct() {
        axios.get("http://localhost:8080/api/v1/SanPham/NhanHieu/" + brandKey).then((res) => {
            setBrandsProduct(res.data);
        });
    }

    useEffect(() => {
        loadBrandProduct();
    });

    return (

        <main className='bg-secondary'>
            <div className='container'>
                <div className='sc-wrapper py-5'>
                    <Title title={brand.tenNhanHieu} />
                    <ProductList products={brandProduct} />
                </div>
            </div>
        </main>
    )
}

export default BrandProductListPage
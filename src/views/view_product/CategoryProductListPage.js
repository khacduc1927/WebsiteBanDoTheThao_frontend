import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { ProductList, Title } from '../../components/common';
import axios from "axios";

const CategoryProductListPage = () => {
  const { categoryKey } = useParams();

  const [category, setCategory] = useState([]);

  function loadCategory() {
    axios.get("http://localhost:8080/api/v1/DanhMuc/" + categoryKey).then((res) => {
      setCategory(res.data);
    });
  }

  useEffect(() => {
    loadCategory();
  });

  const [categoryProduct, setCategorysProduct] = useState([]);

  function loadCategoryProduct() {
    axios.get("http://localhost:8080/api/v1/SanPham/DanhMuc/" + categoryKey).then((res) => {
      setCategorysProduct(res.data);
    });
  }

  useEffect(() => {
    loadCategoryProduct();
  });

  return (
    <main className='bg-secondary'>
      <div className='container'>
        <div className='sc-wrapper py-5'>
          <Title title={category.tenDanhMuc} />
          <ProductList products={categoryProduct} />
        </div>
      </div>
    </main>
  )
}

export default CategoryProductListPage
import React, { useState, useEffect } from 'react';
import { useBasketContext } from '../../context/basketContext';
import "../../styles/BasketPage.scss";
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { FaHourglassEnd } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import images from '../../utils/images';
import { useFilterContext } from '../../context/filterContext';
import { formatPrice } from '../../utils/helpers';
import { Link } from "react-router-dom";


const BasketPage = () => {
  const { basket, clearBasket, dispatch, addQtyItem, minusQtyItem, removeFromBasket, totalAmount, itemsCount } = useBasketContext();
  const { setSelectAll, selectAll, dispatch: filterDispatch } = useFilterContext();

  // let tempCheckList = Array.from({ length: basket.length }, (_, idx) => {
  //   return {
  //     "checkIdx": idx,
  //     "checkedStatus": false
  //   }
  // });

  // const [singleCheckList, setSingleCheckList] = useState(tempCheckList);

  // const selectAllHandler = (event) => {
  //   if(event.target.checked){
  //     setSelectAll(filterDispatch, true);
  //   } else {
  //     setSelectAll(filterDispatch, false);
  //   }
  // }

  // useEffect(() => {
  //   if(selectAll){
  //     console.log(tempCheckList);
  //     setSingleCheckList((prevCheckList) => {
  //       let newCheckList = prevCheckList.map((singleItem) => {
  //         if(!singleItem.checkedStatus) singleItem.checkedStatus = true;
  //         return singleItem;
  //       });
  //       return newCheckList;
  //     });
  //   } 

  //   if(!selectAll) {
  //     setSingleCheckList((prevCheckList) => {
  //       let newCheckList = prevCheckList.map((singleItem) => {
  //         if(singleItem.checkedStatus) singleItem.checkedStatus = false;
  //         return singleItem;
  //       });
  //       return newCheckList;
  //     });
  //   }
  // }, [selectAll]);

  // const handleSingleCheck = (event, idx) => {
  //   setSingleCheckList((prevCheckList) => {
  //     let newCheckList = prevCheckList.map((singleItem, singleItemIdx) => {
  //       if(singleItemIdx === idx){
  //         if(event.target.checked){
  //           singleItem.checkedStatus = true;
  //         } else {
  //           singleItem.checkedStatus = false;
  //         }
  //       }
  //       return singleItem;
  //     });
  //     return newCheckList;
  //   });
  // }

  // console.log(singleCheckList);

  // useEffect(() => {
  //   let checkedItemsCount = singleCheckList.filter((item) => {
  //     if(item.checkedStatus) return true;
  //     return false;
  //   }).length;

  //   if(checkedItemsCount < singleCheckList.length){
  //     console.log(checkedItemsCount, singleCheckList.length);
  //     setSelectAll(filterDispatch, false);
  //   } else if(checkedItemsCount === singleCheckList.length){
  //     setSelectAll(filterDispatch, true);
  //   }
  // }, [singleCheckList]);


  // setting check list initially
  useEffect(() => {
  }, [basket]);

  if (basket.length === 0) {
    return (
      <main className='bg-secondary'>
        <div className='container'>
          <div className="sc-wrapper py-4 flex align-center justify-center">
            <FaHourglassEnd />
            <h3 className='mx-2'>Không có sản phẩm nào trong giỏ hàng.</h3>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className='bg-secondary'>
      <div className='container'>
        <div className='sc-wrapper'>
          <div className='basket grid'>
            {/* basket left */}
            <div className='basket-l py-4'>
              <div className='basket-top bg-white py-3 px-4'>
                <h2>Giỏ Hàng <span className='text-primary'>({itemsCount})</span></h2>

                <div className='flex align-center justify-between'>
                  {/* <div className='checkbox-item flex py-3'>
                    <div className='checkbox-icon flex align-center'>
                      <input type = "checkbox" className='form-control' id = "allcheck" onChange ={(event) => selectAllHandler(event) } />  
                    </div>
                    <p className='form-text'>Select all items</p>
                  </div> */}
                  <button type="button" className='fw-7 fs-16 text-primary' onClick={() => clearBasket(dispatch)}>Xóa Giỏ Hàng</button>
                </div>
              </div>

              <div className='basket-list bg-white my-3'>
                {
                  basket.map((basketItem, idx) => {
                    return (
                      <div className='basket-list-item grid px-3 py-3' key={basketItem.id}>
                        <div className='checkbox-item py-3'>
                          {/* <div className='checkbox-icon'>
                            <input type = "checkbox" className='form-control' name = {`product-check-${idx}`} onChange = {(event) => handleSingleCheck(event, idx)} checked = {singleCheckList[idx].checkedStatus}  />  
                          </div> */}
                        </div>

                        <div className='basket-list-item-info grid'>
                          <div className='item-info-img'>
                            <img src={basketItem?.hinhAnh} alt={basketItem?.tenSanPham} className="img-cover" />
                          </div>
                          <div className='item-info-details py-2'>
                            <div className='item-info-details-top'>
                              <h4>{basketItem?.tenSanPham}</h4>
                              <button type="button" className='remove-btn' onClick={() => removeFromBasket(dispatch, basketItem?.id)}>
                                <BsTrash />
                              </button>
                            </div>
                            <div className='flex align-center flex-wrap py-1'>
                              <span className='fs-13 text-dark'>Mã Nhãn Hiệu: {basketItem?.maNhanHieu}</span>
                              <span className='mx-3 fs-13 text-dark'>Mã Danh Mục: {basketItem?.maDanhMuc}</span>
                            </div>
                            <div className='flex align-center justify-between'>
                              <span className='fw-7 fs-17 text-yellow'>{formatPrice(basketItem?.giaBan)}</span>
                              <div className='quantity'>
                                <div className='quantity-toggle flex'>
                                  <button className={`qty-dec flex align-center justify-center ${basketItem?.quantity === 1 ? 'active' : ""}`} onClick={() => minusQtyItem(dispatch, basketItem?.id)}>
                                    <AiOutlineMinus size={14} />
                                  </button>
                                  <div className='qty-value flex align-center justify-center fs-14 mx-2'>{basketItem?.quantity}</div>
                                  <button className={`qty-inc flex align-center justify-center ${basketItem?.quantity === basketItem?.stock ? 'active' : ""}`} onClick={() => addQtyItem(dispatch, basketItem?.id)}>
                                    <AiOutlinePlus size={14} />
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className='fs-14'>
                              <span className='fw-6'>Tổng Cộng: </span>
                              {formatPrice(basketItem?.totalPrice)}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            {/* basket right */}
            <div className='basket-r py-4'>
              <div className='summary bg-white py-3 px-4'>
                <h2>Thanh Toán</h2>
                <div className='flex align-center justify-between my-2'>
                  <p className='fw-6'>Tổng cộng:</p>
                  <p className='fw-6 fs-24'><span className='fw-7 text-yellow'>VNĐ</span> {formatPrice(totalAmount)}</p>
                </div>
                <button type="button" className='checkout-btn my-2 fw-6'>                                    <Link to={"/confirm"} className='nav-link no-wrap'>Thanh Toán</Link>
                </button>
              </div>

              <div className='payment-methods py-4 bg-white px-4'>
                <h3>Phương Thức Thanh Toán</h3>
                <div className='flex align-center justify-start payment-methods-list py-3'>
                  <div className='payment-item'>
                    <img src={images.visa} alt="" />

                  </div>
                  <div className='payment-item'>
                    <img src={images.ucb} alt="" />
                  </div>
                  <div className='payment-item'>
                    <img src={images.mastercard} alt="" />
                  </div>
                  <div className='payment-item'>
                    <img src={images.americanexpress} alt="" />
                  </div>
                </div>
                <h3 className='py-2'>Bảo vệ người dùng</h3>
                <p className='fs-14'>Được hoàn lại toàn bộ tiền nếu mặt hàng không như mô tả hoặc nếu không được giao</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default BasketPage
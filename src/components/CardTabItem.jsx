import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeQuantity } from '../store/cart';
import { RiDeleteBin6Line } from "react-icons/ri";


const CartTabItem = (props) => {
    const { productId, quantity } = props.data;
    const [detail, setDetail] = useState([]);
    const dispatch = useDispatch();
    const products = useSelector(store => store.product.products)

    useEffect(() => {
        const findDetail = products.filter(prdt => prdt.id === productId)[0];
        setDetail(findDetail)
    }, [productId]);

    const handleMinusQty = () => {
        if (quantity > 1) {
            dispatch(changeQuantity({
                productId: productId,
                quantity: quantity - 1 < 1 ? 0 : quantity - 1
            }))
        }

    }
    const handlePlusQty = () => {
        dispatch(changeQuantity({
            productId: productId,
            quantity: quantity + 1
        }))
    }

    const handleDeteleItem = () => {
        dispatch(changeQuantity({
            productId: productId,
            quantity: 0
        }))
    }



    return (
        <div className='w-full h-[150px] mx-auto border-b-2 flex justify-between items-center'>
            {detail.name ? <div className='flex justify-start items-start w-[80%]'>
                <img src={`https://api.timbu.cloud/images/${detail.photos[0].url}`} className='object-contain size-20' />
                <div className='font-lato w-[50%] flex flex-col items-center'>
                    <p className='text-sm w-full text-center mb-2'>{detail.name}</p>
                    <p>{quantity} x <span className='text-[#00000087] font-[300]'>${detail.current_price[0].USD[0]}</span></p>

                    <div className='rounded-l-sm w-[70%] md:w-[50%] flex justify-evenly h-[30px] md:h-[35px] items-center gap-1 font-lato bg-[#00000018] hover:cursor-pointer hover:opacity-80 font-[100] mt-3'>
                        <span className={`md:text-[25px] text-[20px]`} onClick={handleMinusQty}>-</span>
                        <span className='md:text-[16px] text-sm'>{quantity}</span>
                        <span className='md:text-[20px] text-[18px]' onClick={handlePlusQty}>+</span>
                    </div>
                </div>

            </div> : ''}

            <div className=''>
                <RiDeleteBin6Line className='size-6' onClick={handleDeteleItem} />
            </div>
        </div>
    )
}

export default CartTabItem
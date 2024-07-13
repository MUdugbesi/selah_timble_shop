import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

const CardCheckout = (props) => {

    const { productId, quantity } = props.data;
    const [detail, setDetail] = useState([]);
    const products = useSelector(store => store.product.products)

    useEffect(() => {
        const findDetail = products.filter(prdt => prdt.id === productId)[0];
        setDetail(findDetail)
    }, [productId]);

    return (
        <>
            {detail.name ? < div className='font-lato' >
                <p className='text-[#0000006a] mb-2'>{detail.name} <span className='ml-1'>x{quantity}</span></p>
                <p className='mb-2 text-[16px] font-bold'>${detail.current_price[0].USD[0]}</p>
            </div > : ''}
        </>
    )
}

export default CardCheckout
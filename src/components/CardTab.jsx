import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleStatusBar, emptyCart } from '../store/cart';
import CartTabItem from './CardTabItem';
import { Link } from 'react-router-dom';


const CardTabs = () => {
    const carts = useSelector(store => store.cart.items);
    const products = useSelector(store => store.product.products)
    const statusTab = useSelector(store => store.cart.statusTab);
    const dispatch = useDispatch();
    const [totalQty, setTotalQty] = useState(0);
    const [totalSum, setTotalSum] = useState(0)


    useEffect(() => {
        const { totalQty, totalSum } = carts.reduce((acc, cart) => {
            const product = products.find(prd => prd.id === cart.productId);
            const price = product.current_price[0].USD[0] || 0;
            acc.totalQty += cart.quantity;
            acc.totalSum += price * cart.quantity;
            return acc;
        }, { totalQty: 0, totalSum: 0 });

        setTotalQty(totalQty);
        setTotalSum(totalSum.toFixed(2));
    }, [carts, products]);



    const handleCloseTab = () => {
        dispatch(toggleStatusBar())
    }

    const handleEmptyCart = () => {
        dispatch(emptyCart())
    }



    return (
        <>
            <div className={`fixed top-0 right-0 bg-[#fff] w-full md:w-[500px] h-[100vh] overflow-x-hidden flex flex-col pb-3 z-20 ${!statusTab ? 'hidden' : 'flex'}`}>
                <div className='flex font-lato w-[70%] mx-auto justify-between mt-[60px]'>
                    <h2 className='tracking-[4px] font-[400]'>{totalQty} ITEMS IN CART</h2>
                    <span onClick={handleCloseTab} className='hover:cursor-pointer active:text-[red]'>Close</span>
                </div>


                <div className='flex flex-col w-[70%] mx-auto gap-5'>
                    {carts.map((cart, key) => {
                        return (
                            <CartTabItem data={cart} key={key} />
                        )
                    })}
                </div>

                <p className='font-lato text-center text-sm mt-[50px] text-[#0000008b]'>Subtotal: <span>${totalSum}</span></p>

                <div className={`flex flex-col p-4 gap-4 w-[80%] mx-auto mb-5 mt-4 ${carts.length ? 'flex' : 'hidden'}`}>
                    <button className='bg-[#9b9999b1] text-black text-[12px] w-full h-[60px]' onClick={handleEmptyCart}>EMPTY CART</button>
                    <Link to='/checkout' className='bg-black text-white text-[12px] h-[60px] flex justify-center'><button onClick={handleCloseTab}>CHECKOUT</button></Link>
                </div>
            </div>
        </>
    )
}

export default CardTabs;
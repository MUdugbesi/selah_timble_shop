import React, { useEffect, useState } from 'react';
import { handleSalesApi } from '../api/timbleApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const timbleOrgId = import.meta.env.VITE_TIMBLE_ORG_ID

const Form = () => {
    const navigate = useNavigate()
    const [productsSold, setProductsSold] = useState([
        { product_id: '', amount: '', quantity: '', discount: '', currency_code: '' }
    ])
    const carts = useSelector((store) => store.cart.items);
    const products = useSelector(store => store.product.products)

    useEffect(() => {
        const inCart = carts.map(cart => {
            const product = products.find(prd => prd.id === cart.productId);
            console.log()
            return {
                product_id: cart.productId,
                amount: product.current_price[0].USD[0] || 0,
                quantity: cart.quantity || 0,
                discount: product.current_price[0].USD[0] * cart.quantity > 75 ? 5 : 0,
                currency_code: 'USD'
            };
        });
        setProductsSold(inCart);
    }, [carts, products]);

    useEffect(() => {
        setFormData(prevData => ({ ...prevData, products_sold: productsSold }));
    }, [productsSold]);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        description: '',
        country_code: '+' || null,
        currency_code: 'USD' || null,
        mode_of_payment: '',
        "organization_id": timbleOrgId
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await handleSalesApi(formData);
            if (response.ok) {
                toast.success('Order placed successfully');
                navigate('/')
            } else {
                toast.error('Unsuccessful order - please try again');
            }
        } catch (e) {
            toast.error('Error with order - please try again later');
            throw new Error('Error with order');
        }



    }

    const [hidden, setToggleHidden] = useState(true)
    const handleBankDetails = () => {
        setToggleHidden(!hidden)
    }
    const handleClick = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        handleBankDetails()
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 md:p-10 p-4 md:text-sm text-[10px] '>
                <div className='w-full h-auto flex gap-2'>
                    <input type='text' className='w-[50%] p-2 h-[60px] bg-[#00000016] placeholder:text-[black] placeholder:tracking-[4px] pl-[15px]' placeholder='FIRST NAME' name='first_name' value={formData.first_name} onChange={handleChange} required />
                    <input type='text' className='w-[50%] h-[60px] bg-[#00000016] placeholder:text-[black] placeholder:tracking-[4px] pl-[15px]' placeholder='LAST NAME' name='last_name' value={formData.last_name} onChange={handleChange} required />
                </div>
                <div className='w-full h-auto flex gap-2'>
                    <input type='text' className='input' placeholder='COUNTRY CODE' name='country_code' value={formData.country_code} onChange={handleChange} required />
                    <input type='text' className='input' placeholder='CURRENCY CODE' name='currency_code' value={formData.currency_code} onChange={handleChange} required />

                </div>
                <input type='text' className='input' placeholder='HOUSE ADDRESS' onChange={handleChange} />
                <input type='text' className='input' placeholder='TOWN / CITY' onChange={handleChange} />
                <input type='text' className='input' placeholder='ZIPCODE / POSTCODE' />
                <input type='text' className='input' placeholder='PHONE' name='phone' value={formData.phone} onChange={handleChange} required />
                <input type='email' className='input' placeholder='EMAIL' name='email' value={formData.email} onChange={handleChange} required />

                <p className='mt-[50px] mb-[50px] text-center tracking-[2px] md:tracking-[4px] relative after:content-[""] after:w-[60%] md:after:w-[60%] lg:after:w-[43%] after:absolute after:h-[2px] after:bg-[#00000061]  after:bottom-0 md:after:right-[21%] after:right-[21%] lg:after:right-[29%]'>SHIP TO DIFFERENT ADDRESS?</p>

                <div className='flex flex-col gap-2 justify-start items-start font-lato mb-[30px] border-t-2 border-b-2 pt-10 pb-10 w-[90%] mx-auto'>
                    <div className='flex gap-4 justify-center items-center'>
                        <input type='radio' value='bank transfer' id='bank transfer' name='mode_of_payment' onClick={handleClick} />
                        <h3 className={`${hidden ? 'flex cursor-not-allowed' : ''} tracking-[3px]`}>DIRECT BANK TRANSFER</h3>
                    </div>
                    <p className='text-[10px] md:text-sm w-[90%] mx-auto'>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won't be shipped until the funds have cleared in our account.</p>
                    <div className={`${hidden ? 'hidden' : 'block'}`}>
                        <p>Bank Account: 123456789</p>
                        <p>Bank Name: GTB</p>
                        <p>Account Name: Selah_Marv_Clothing Shop</p>
                    </div>
                    <div className='flex gap-4 justify-center items-center mt-[20px]'>
                        <input type='radio' value='cash' id='cash' name='mode_of_payment' onClick={handleClick} />
                        <h3 className='tracking-[3px]'>CASH ON DELIVERY</h3>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <button type='submit' className='bg-black text-white text-[14px] h-[60px] md:w-[30%] w-[50%] tracking-[3px] mx-auto mt-[20px] mb-[60px] active:text-[#ff0000ad]'>PLACE ORDER</button>
                </div>
            </form >


        </>
    )
}

export default Form
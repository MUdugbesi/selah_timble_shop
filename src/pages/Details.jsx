import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaCartPlus } from 'react-icons/fa6';
import { addTocart } from '../store/cart';
import { MdFavorite, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineFavoriteBorder } from 'react-icons/md';
import { toast } from 'react-toastify';

const Details = () => {
    const { url_slug } = useParams();
    const [detail, setDetail] = useState([null]);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector(store => store.product.products);
    const statusTab = useSelector(store => store.cart.statusTab);
    const [num, setNum] = useState(0);
    const [toggleFav, setToggleFav] = useState(false)

    useEffect(() => {
        const findDetails = products.filter((pd) => pd.url_slug === url_slug);
        if (findDetails.length >= 0) {
            setDetail(findDetails[0]);
            // setNum(findDetails[0].photos.length)
        } else {
            navigate('/')
        }

    }, [])

    const handleMinusQty = () => {
        setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)

    }

    const handlePlusQty = () => {
        setQuantity(quantity + 1)
    }

    const handleAddToCart = () => {
        toast.success(`${detail.name} added to cart`)
        dispatch(addTocart({
            productId: detail.id,
            quantity: quantity
        }))
    }
    const handleFav = () => {
        if (toggleFav === false) {
            toast(`Liked ${detail.name}`, { style: { fontFamily: "monospace" } })
        } else {
            toast(`Unliked ${detail.name}`, { style: { fontFamily: "monospace" } })

        }
        setToggleFav(!toggleFav)
    }

    const handleLeftArrow = () => {
        if (num > 0) {
            setNum(num - 1)
        }
    }
    const handleRightArrow = () => {
        if (detail.name) {
            if (num >= 0 && num <= detail.photos.length - 2) {
                setNum(num + 1)
            } else {
                setNum(0)
            }
        }
    }
    if (detail.name) {
        console.log(detail.photos.length)
    }
    return (
        <div className={`${!statusTab ? 'opacity-100' : 'opacity-50'} h-auto md:min-h-[20vh] pb-[50px] md:mt-[50px]`}>
            <p className='font-ibm-plex-sans text-[13px] flex w-[40%] md:w-[25%] lg:w-[15%] mx-auto justify-evenly font-light mt-[60px] mb-[60px] text-[#0000007a]'>
                <span>Home</span>
                <span>/</span>
                <span>Shop</span>
                <span>/</span>
                <span>Product</span>
            </p>


            {detail.name ? <div className='w-[90%] md:[80%] lg:w-[60%] mx-auto min-h-auto grid grid-cols-1 md:grid-cols-2 mb-[20px] bg-white p-10'>
                <div className='flex justify-between items-center mr-3 w-[100%] md:w-[90%]'>
                    {num > 0 ? <MdKeyboardArrowLeft className='size-6 hover:cursor-pointer active:text-[red]' onClick={handleLeftArrow} /> : ''}
                    <img src={`https://api.timbu.cloud/images/${detail.photos[num].url}`} className='w-[75%] md:w-[85%] h-[389px] mx-auto object-contain object-center bg-transparent' />
                    {num < detail.photos.length - 1 ? <MdKeyboardArrowRight className='size-6 hover:cursor-pointer active:text-[red]' onClick={handleRightArrow} /> : ''}
                </div>
                <div className='p-2'>
                    <p className='text-[60px] font-lato font-[100] opacity-50 pt-5'>${detail.current_price[0].USD[0]}</p>
                    <div className='flex w-full h-[40px] justify-start items-center relative mt-10'>
                        <span className='opacity-50 font-lato font-light text-[14px] mr-6 after:content-[""] after:absolute after:bottom-0 after:left-8 after:bg-text after:h-[90%] after:w-[1px] after:opacity-50 after:z-10 after:rounded-lg'>{!toggleFav ? <MdOutlineFavoriteBorder className='size-5 hover:cursor-pointer' onClick={handleFav} /> : <MdFavorite className='size-5 hover:cursor-pointer text-[red]' onClick={handleFav} />}</span>
                        <span className='uppercase text-sm tracking-wider'>{detail.name}</span>
                    </div>
                    <p className='font-lato text-[12px] font-light leading-5 text-black opacity-50'>{detail.description}</p>
                    <div className='w-[80%] lg:w-[50%] h-auto flex gap-[2px] mt-[50px]'>
                        <div className='border border-text rounded-l-sm md:w-[40%] w-[30%] flex justify-evenly h-[35px] items-center gap-1 font-lato bg-[#00000018] hover:cursor-pointer hover:opacity-80'>
                            <span className='md:text-[25px] text-sm' onClick={handleMinusQty}>-</span>
                            <span className='md:text-[16px] text-sm'>{quantity}</span>
                            <span className='md:text-[20px] text-sm' onClick={handlePlusQty}>+</span>
                        </div>
                        <button className='flex md:w-[60%] h-[35px] font-lato mx-auto gap-3 justify-center items-center text-button p-2 border border-text rounded-r-sm text-sm hover:cursor-pointer hover:opacity-80 active:text-red-600' onClick={handleAddToCart}><FaCartPlus size={18} className='text-button' />Add to Cart</button>
                    </div>
                </div>
            </div> : ''}
        </div>
    )
}

export default Details
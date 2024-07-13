import React, { useEffect, useState } from 'react';
import { ProductCard } from '../components';
import { Link, useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import Pagination from '../components/Pagination';


const Home = () => {
    const products = useSelector(store => store.product.products);
    const [toggleOther, setToggleOther] = useState(false);
    const [filtered, setFiltered] = useOutletContext();
    const statusTab = useSelector(store => store.cart.statusTab);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardPerPage, setCardPerPage] = useState(10);

    const lastCardIndex = currentPage * cardPerPage;
    const firstCardIndex = lastCardIndex - cardPerPage;
    const filteredPerPage = filtered.slice(firstCardIndex, lastCardIndex);

    const handleFilterFunction = (category) => {
        const filteredProducts = products.filter(product =>
            product.categories.some(cat => cat.name === category)
        );
        setFiltered(filteredProducts);
        setCurrentPage(1)
    };


    const handleAll = () => {
        setFiltered(products);
        setCurrentPage(1); // Reset to first page when showing all products
    };

    const handleOthersDisplay = () => {
        setToggleOther(!toggleOther)
    }

    const paginate = (pageNumber) => {
        const startIndex = (pageNumber - 1) * cardPerPage;
        const endIndex = startIndex + cardPerPage;
        return filtered.slice(startIndex, endIndex);
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className={`w-full min-h-[50vh] h-auto ${!statusTab ? 'opacity-100' : 'opacity-50'}`}>
            <div className='w-[50%] md:w-[30%] lg:w-[10%] mx-auto mt-[40px] md:mt-[85px] flex flex-col max-lg:items-center'>
                <h1 className='font-ibm-plex-sans text-[50px] text-justify tracking-[12px] font-[200] animate-pulse'>SHOP</h1>
                <p className='font-ibm-plex-sans text-[13px] flex w-[80%] mx-auto justify-evenly font-light text-[#0000007a]'>
                    <span>Home</span>
                    <span>/</span>
                    <span>Shop</span>
                </p>
            </div>

            <div className='hidden md:flex lg:w-[30%] md:w-[50%] mt-14 mb-14 h-auto mx-auto justify-evenly hover:cursor-pointer font-ibm-plex-sans text-[#000000c3] font-[400] '>
                <p onClick={handleAll} className={`hover:font-[600px] font-[900]`}>ALL</p>
                <p onClick={() => handleFilterFunction('accessories')} className={`hover:font-[600]`}>ACCESSORIES</p>
                <p onClick={() => handleFilterFunction('male')} className={`hover:font-[600]`}>MALE</p>
                <p onClick={() => handleFilterFunction('female')} className={`hover:font-[600]`}>FEMALE</p>
                <p onClick={() => handleFilterFunction('unisex')} className={`hover:font-[600]`}>UNISEX</p>

            </div>
            <div className='w-[60%] flex flex-col md:hidden mt-14 mb-14 h-auto mx-auto justify-center items-center hover:cursor-pointer font-ibm-plex-sans font-[400] text-[#000000c3]'>
                <div className='flex w-[100%] justify-evenly items-center pb-3'>
                    <Link onClick={handleAll} className={`hover:font-[600] font-[900]`}>ALL</Link>
                    <Link onClick={() => handleFilterFunction('male')} className={`hover:font-[600]`}>MALE</Link>
                    <Link onClick={() => handleFilterFunction('female')} className={`hover:font-[600]`}>FEMALE</Link>
                    {!toggleOther ? <MdKeyboardArrowDown width={20} className='hover' onClick={handleOthersDisplay} /> : <MdKeyboardArrowUp width={20} className='hover' onClick={handleOthersDisplay} />}
                </div>
                <div className={`${toggleOther ? 'flex w-[100%] justify-evenly items-center' : 'hidden'}`}>
                    <Link onClick={() => handleFilterFunction('accessories')} className={`hover:font-[600]`}>ACCESSORIES</Link>
                    <Link onClick={() => handleFilterFunction('unisex')} className={`hover:font-[600]`}>UNISEX</Link>
                </div>
            </div>


            <div className={`${filtered.length ? 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-5 lg:gap-10 w-[90%] p-10 md:p-0 lg:w-[80%] md:w-[95%] mx-auto h-auto' : ''}`}>
                {filtered.length ? (
                    paginate(currentPage).map((product, key) => <ProductCard data={product} key={key} />)
                ) :
                    (<div className='flex flex-col border-2 justify-center items-center mx-auto w-[30%] p-5 rounded-lg leading-10 font-lato shadow-md shadow-black'>
                        <p className='text-[red]'>Oops!</p>
                        <p>No Products Available</p>
                        <p onClick={handleAll} className='cursor-pointer hover:opacity-80 hover:text-[#15153c] hover:font-bold'>Show all products </p>
                    </div>
                    )}

            </div>


            <div className='relative h-full mt-[50px] pb-[50px]'>
                <Pagination totalCards={filtered.length} cardPerPage={cardPerPage} currentPage={currentPage} onPageChange={handlePageChange} />

            </div>
        </div>

    )
}

export default Home
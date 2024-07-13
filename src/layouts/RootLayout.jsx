import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from '../components'
import CardTabs from '../components/CardTab';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/products';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RootLayout = () => {
    const dispatch = useDispatch();
    const { products, status } = useSelector(store => store.product);
    const [val, setVal] = useState('');
    const [filtered, setFiltered] = useState([]);


    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts())
                .catch(error => {
                    console.error('Error fetching products:', error.message);
                    toast.error('Failed to fetch products. Please try again later.', {
                       
                        pauseOnHover: true,
                        draggable: true,
                        closeButton: true,
                    });
                });
        }
        setFiltered(products); // Initially set filtered products to all products
    }, [dispatch, status, products]);

    useEffect(() => {
        // Filter products based on search input
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(val.toLowerCase())
        );
        setFiltered(filteredProducts);
    }, [val, products]);

    const handleInputVal = (e) => {
        const inputVal = e.target.value;
        setVal(inputVal);
    };

    const handleClearSearch = () => {
        setVal('');
        setFiltered(products); // Reset filtered products to all products
    };

    const handleSearchFilter = () => {
        const search = []
        products.forEach((product) => {
            const { name } = product;
            if (name) {
                if (name.toLowerCase().includes(`${val}`)) {
                    search.push(product)
                }
            }
        })
        if (search.length && val) {
            setFiltered(search)
        } else {
            setFiltered(products)
        }
    }


    return (
        <>
            <header>
                <Header val={val} handleInputChange={handleInputVal} handleSearchFilter={handleSearchFilter} handleClearSearch={handleClearSearch} />
            </header>
            <main className='md-[50px] md:mb-[200px] min-h-[50vh] h-auto'>
                <Outlet context={[filtered, setFiltered]} />
                <CardTabs />
                <ToastContainer />
            </main>
            <footer className='relative h-auto'>
                <Footer />
            </footer>
        </>
    )
}

export default RootLayout
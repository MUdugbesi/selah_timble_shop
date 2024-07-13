import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from '../components'
import CardTabs from '../components/CardTab';
import { useSelector } from 'react-redux';

const RootLayout = () => {
    const products = useSelector(store => store.product.products);
    const [val, setVal] = useState('');
    const [filtered, setFiltered] = useState(products);


    useEffect(() => {
        const search = []
        products.forEach((product) => {
            const { name } = product;
            console.log(name.toLowerCase())
            if (name) {
                if (name.toLowerCase().includes(`${val}`)) {
                    search.push(product)
                }
            }
        })
        if (search.length && val) {
            setFiltered(search)
        } else if (!search.length && val) {
            setFiltered([])
        } else {
            setFiltered(products)
        }
    }, [val])


    const handleInputVal = (e) => {
        const inputVal = e.target.value;
        setVal(inputVal.toLowerCase())
    }

    const handleClearSearch = () => {
        setVal('');
        setFiltered(products)
    }

    const handleSearchFilter = () => {
        const search = [];
        products.forEach((product) => {
            const { keywords } = product;
            if (keywords) {
                if (keywords.includes(`${val}`)) {
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
            <main className='mb-[200px] min-h-[50vh] h-auto'>
                <Outlet context={[filtered, setFiltered]} />
                <CardTabs />
            </main>
            <footer className='relative h-[auto]'>
                <Footer />
            </footer>
        </>
    )
}

export default RootLayout
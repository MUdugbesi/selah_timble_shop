import React from 'react'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import { Home, Details, Checkout } from './pages';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* root layout */}
          <Route element={<RootLayout />}>
            {/* homepage */}
            <Route index element={<Home />} />
            <Route index path='/:url_slug' element={<Details />} />
            <Route path='/checkout' element={<Checkout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

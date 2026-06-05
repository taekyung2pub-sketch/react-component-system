import * as React from 'react'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import ProductList from '@/pages/ProductList'
import ProductDetail from '@/pages/ProductDetail'
import Community from '@/pages/Community'
import CommunityDetail from '@/pages/CommunityDetail'
import MyPage from '@/pages/MyPage'

// =========================
// ScrollToTop
// =========================

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

// =========================
// App
// =========================

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path="/"              element={<Home />} />
                <Route path="/search"        element={<Search />} />
                <Route path="/products"      element={<ProductList />} />
                <Route path="/products/:id"  element={<ProductDetail />} />
                <Route path="/community"     element={<Community />} />
                <Route path="/community/:id" element={<CommunityDetail />} />
                <Route path="/mypage"        element={<MyPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
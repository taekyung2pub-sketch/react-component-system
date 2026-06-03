import * as React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import ProductList from '@/pages/ProductList'
import ProductDetail from '@/pages/ProductDetail'
import Community from '@/pages/Community'
import CommunityDetail from '@/pages/CommunityDetail'
import MyPage from '@/pages/MyPage'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/"                  element={<Home />} />
                <Route path="/search"            element={<Search />} />
                <Route path="/products"          element={<ProductList />} />
                <Route path="/products/:id"      element={<ProductDetail />} />
                <Route path="/community"         element={<Community />} />
                <Route path="/community/:id"     element={<CommunityDetail />} />
                <Route path="/mypage"            element={<MyPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
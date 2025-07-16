import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import BlogTitle from './pages/BlogTitle'
import WriteArtical from './pages/WriteArtical'
import GenerateImages from './pages/GenerateImages'
import RemoveBg from './pages/RemoveBg'
import RemoveObjext from './pages/RemoveObjext'
import ReviewResume from './pages/ReviewResume'
import Community from './pages/Community'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/ai' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='write-article' element={<WriteArtical />} />
          <Route path='blog-titles' element={<BlogTitle />} />
          <Route path='generate-images' element={<GenerateImages />} />
          <Route path='remove-background' element={<RemoveBg />} />
          <Route path='remove-object' element={<RemoveObjext />} />
          <Route path='review-resume' element={<ReviewResume />} />
          <Route path='community' element={<Community />} />

        </Route>
      </Routes>
    </div>
  )
}

export default App

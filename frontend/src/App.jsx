// import Menu from '../Components/Navbar'
// import Menu from '../Components/Navbar'
// import Sidebar from '../Components/Sidebar'
// import SearchPage from '../Layout/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SearchResultsGrid from '../Pages/SearchPage'
// import axios from 'axios'
import './App.css'
import DownloadSection from '../Pages/DownloadSection'
// import styled from 'styled-components'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchResultsGrid />} />
        <Route path="/download" element={<DownloadSection />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

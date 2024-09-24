// import Menu from '../Components/Navbar'
// import Menu from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
// import SearchPage from '../Layout/Layout'
import SearchResultsGrid from '../Pages/SearchPage'
// import axios from 'axios'
import './App.css'
// import styled from 'styled-components'

function App() {
  return (
    <>
      <Sidebar />
      {/* <Menu /> */}
      <SearchResultsGrid />
    </>
  )
}

export default App

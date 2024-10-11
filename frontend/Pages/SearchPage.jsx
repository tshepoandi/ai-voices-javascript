import styled from 'styled-components'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import { useDispatch } from 'react-redux'
import { setSelectedSong } from '../src/features/songRetriever/SongSlice'

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1rem;
  margin-left: 280px; // Adjust this value to match your sidebar width
  background-color: #f0f0f0; // Light grey background
`

const GridItem = styled.div`
  background-color: black;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

const Thumbnail = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 0.5rem;
`

const Title = styled.h3`
  color: #22c55e;
  font-size: 1rem;
  margin: 0.5rem 0;
`

const Artist = styled.p`
  color: #4ade80;
  font-size: 0.875rem;
  margin: 0;
`

const MenuContainer = styled.div`
  background-color: #000; /* black background */
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const AppName = styled.h1`
  color: #34c759; /* green text */
  font-size: 1.5rem;
  margin: 0;
`

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: center;
  margin: 0 1rem;
`

const SearchForm = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  width: 300px;
`

const SearchBar = styled.input`
  background-color: #000;
  border: 1px solid #fff;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #34c759;
  width: 100%;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #34c759;
  }
  &::placeholder {
    color: #34c759;
    opacity: 0.7;
  }
`

// Remove the SearchButton styled component

const Button = styled.button``

const SearchResultsGrid = () => {
  const [searchData, setSearchData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleDownloadClick = (song) => {
    dispatch(setSelectedSong(song))
    navigate('/download')
  }

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm.trim() === '') {
        setSearchData([])
        return
      }

      try {
        const response = await axios.post(
          'https://ai-voices-javascript.onrender.com/genius/search',
          {
            search: searchTerm,
          },
        )
        setSearchData(response.data)
      } catch (error) {
        console.error('Error fetching data: ', error)
      }
    }

    const debounceTimer = setTimeout(() => {
      fetchData()
    }, 300) // Debounce for 300ms

    return () => clearTimeout(debounceTimer)
  }, [searchTerm])

  return (
    <div>
      <MenuContainer>
        <AppName>atari</AppName>
        <Sidebar />
        <SearchContainer>
          <SearchForm>
            <SearchBar
              type="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleInputChange}
            />
          </SearchForm>
        </SearchContainer>
      </MenuContainer>
      <GridContainer>
        {searchData.map((item) => (
          <GridItem key={item.id}>
            <Thumbnail src={item.thumbnail} alt={item.title} />
            <Title>{item.title}</Title>
            <Artist>{item.artist}</Artist>
            <Button onClick={() => handleDownloadClick(item)}>Download</Button>
          </GridItem>
        ))}
      </GridContainer>
    </div>
  )
}

export default SearchResultsGrid

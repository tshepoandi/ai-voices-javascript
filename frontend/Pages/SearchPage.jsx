import styled from 'styled-components'
import { useState } from 'react'
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
  background-color: #000; /* black background */
  border: 1px solid #fff; /* white line */
  border-radius: 20px; /* fully rounded */
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  font-size: 1rem;
  color: #34c759; /* green text */
  width: 100%;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #34c759;
  }
  &::placeholder {
    color: #34c759; /* green placeholder text */
    opacity: 0.7;
  }
`

const SearchButton = styled.button`
  background-color: transparent; /* transparent background */
  border: none;
  padding: 0.5rem;
  font-size: 1rem;
  color: #34c759; /* green text */
  cursor: pointer;
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  &:hover {
    color: #2aa147; /* darker green on hover */
  }
`

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  background-color: #000;
  padding: 2rem;
  border-radius: 8px;
  color: #34c759;
  font-size: 1.5rem;
`
const Button = styled.button``

const SearchResultsGrid = () => {
  const [searchData, setSearchData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleDownloadClick = (song) => {
    dispatch(setSelectedSong(song))
    navigate('/download')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSearchTerm(inputValue)
    setIsLoading(true)
    try {
      const response = await axios.post(
        'https://ai-voices-javascript.onrender.com/genius/search',
        {
          search: inputValue,
        },
      )
      setSearchData(response.data)
    } catch (error) {
      console.error('Error fetching data: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      {isLoading && (
        <Modal>
          <ModalContent>Loading...</ModalContent>
        </Modal>
      )}
      <MenuContainer>
        <AppName>atari</AppName>
        <Sidebar />
        <SearchContainer>
          <SearchForm onSubmit={handleSubmit}>
            <SearchBar
              type="search"
              placeholder="Search..."
              value={inputValue}
              onChange={handleInputChange}
            />
            <SearchButton type="submit">Search</SearchButton>
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

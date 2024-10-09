import { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

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

const SearchBar = styled.input`
  background-color: #000; /* black background */
  border: 1px solid #fff; /* white line */
  border-radius: 20px; /* fully rounded */
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #34c759; /* green text */
  width: 300px;
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
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #34c759; /* green text */
  cursor: pointer;
  position: absolute;
  right: 5px;
  &:hover {
    color: #2aa147; /* darker green on hover */
  }
`

const Menu = () => {
  const [searchText, setSearchText] = useState('')

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearchText(event.target.value)
  }

  const handleSearchSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('/genius', { searchText })
      console.log('Search response:', response.data)
      // Handle the response as needed
    } catch (error) {
      console.error('Error during search:', error)
      // Handle the error as needed
    }
  }

  return (
    <MenuContainer>
      <AppName>shakira</AppName>
      <SearchContainer>
        <form
          onSubmit={handleSearchSubmit}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <SearchBar
            type="search"
            placeholder="Search..."
            value={searchText}
            onChange={handleSearchChange}
          />
          <SearchButton type="submit">Search</SearchButton>
        </form>
      </SearchContainer>
    </MenuContainer>
  )
}

export default Menu

import styled from 'styled-components'

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
  background-color: #333; /* dark grey background */
  border: none;
  border-radius: 20px 0 0 20px; /* rounded left side */
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #34c759; /* green text */
  width: 300px;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #34c759;
  }
`

const SearchButton = styled.button`
  background-color: #34c759; /* green background */
  border: none;
  border-radius: 0 20px 20px 0; /* rounded right side */
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #000; /* black text */
  cursor: pointer;
  &:hover {
    background-color: #2aa147; /* darker green on hover */
  }
`

const Menu = () => {
  return (
    <MenuContainer>
      <AppName>shakira</AppName>
      <SearchContainer>
        <SearchBar type="search" placeholder="Search..." />
        <SearchButton>Search</SearchButton>
      </SearchContainer>
    </MenuContainer>
  )
}

export default Menu

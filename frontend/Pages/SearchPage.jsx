import styled from 'styled-components'
import mockData from '../MockData/songs.json'

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

const SearchResultsGrid = () => {
  return (
    <GridContainer>
      {mockData.map((item) => (
        <GridItem key={item.id}>
          <Thumbnail src={item.thumbnail} alt={item.title} />
          <Title>{item.title}</Title>
          <Artist>{item.artist}</Artist>
        </GridItem>
      ))}
    </GridContainer>
  )
}

export default SearchResultsGrid

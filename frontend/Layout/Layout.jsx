import React, { useState } from 'react'
import axios from 'axios'
import Menu from '../Components/Navbar'
import SearchResultsGrid from '../Pages/SearchPage'

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async (query) => {
    setSearchQuery(query)
    setLoading(true)
    setError(null)
    try {
      const response = await axios.post(
        'https://ai-voices-javascript.onrender.com/genius/search',
        {
          search: query,
        },
      )
      setSearchResults(response.data)
    } catch (err) {
      setError('Failed to fetch songs. Please try again.')
      console.error('Error fetching songs:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Menu onSearch={handleSearch} />
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!loading && !error && <SearchResultsGrid data={searchResults} />}
    </div>
  )
}

export default SearchPage

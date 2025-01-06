import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import Search from './components/Search'
import Results from './components/Results'

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    console.log(countries)
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data);
        console.log(countries);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
  }, [])

  return (
    <>
      <Search onSearch={setSearch} />
      <Results countries={countries} search={search} />
    </>
  )
}

export default App

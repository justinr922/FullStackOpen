import { useState, useEffect } from 'react'
import axios  from 'axios'


const NewEntryForm = (props) => {
  const onNameChange = props.onNameChange
  const onNumberChange = props.onNumberChange
  const onSubmitForm = props.onSubmitForm
  const newName = props.newName
  const newNumber = props.newNumber

  return (
    <div>
      <h2>Add a new entry</h2>
      <form onSubmit={onSubmitForm}>
        <div>
          name: <input value={newName} onChange={onNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={onNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const SearchFilter = ({ filter, handleFilterChange }) => {
  return (
    <form>
      <div>
        Search: <input value={filter} onChange={handleFilterChange} />
      </div>
    </form>
  )
}

const PhonebookListing = ({ person }) => {
  return (
    <li key={person.name}>{person.name} {person.number}</li>
  )
}

const Phonebook = ({ persons, filter }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {
          persons
            .filter(x => x.name.toLowerCase().includes(filter.toLowerCase()))
            .map(x =>
              <PhonebookListing key={x.name} person={x} />
            )
        }
      </ul>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    // console.log(newName)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    // console.log(newName)
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.map(x => x.name).includes(newName)) {
      alert(`${newName} is already in the Phonebook!`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      axios
        .post('http://localhost:3001/persons', newPerson)
        .then((response) => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
        })
      
    }
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter filter={filter} handleFilterChange={handleFilterChange} />
      <NewEntryForm onNameChange={handleNameChange} onNumberChange={handleNumberChange} onSubmitForm={addPerson} newName={newName} newNumber={newNumber} />
      <Phonebook persons={persons} filter={filter} />
    </div>
  )
}

export default App
import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'


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

const PhonebookListing = ({ person, deletePerson }) => {
  return (
    <li key={person.id}>
      {person.name} {person.number}
      <button onClick={() => deletePerson(person)}>Delete</button>
    </li>
  )
}

const Phonebook = ({ persons, filter, deletePerson }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {
          persons
            .filter(x => x.name.toLowerCase().includes(filter.toLowerCase()))
            .map(x =>
              <PhonebookListing key={x.id} person={x} deletePerson={deletePerson} />
            )
        }
      </ul>
    </div>
  )
}

const Confirmation = ({ confirmation }) => {
  if (confirmation === null) {
    return null
  } else {
    return (
      <div className='confirmation'>
        {confirmation}
      </div>
    )
  }
}

const Error = ({ error }) => {
  if (error === null) {
    return null
  } else {
    return (
      <div className='error'>
        {error}
      </div>
    )
  }
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [confirmation, setConfirmation] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    personService
      .getAll()
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

  const updateNumber = (person) => {
    // console.log(person)
    if (window.confirm(`User ${person.name} already exists in the phonebook. Would you like to replace the existing number for ${person.name}?`)) {
      personService
        .update(person.id, person)
        .then((response) => {
          setPersons(
            persons
              .filter(x => x.id !== person.id)
              .concat(response.data)
          )
          setNewName('')
          setNewNumber('')
          setConfirmation(`Number for user "${person.name}" updated successfully.`)
          setTimeout(() => setConfirmation(null), 5000)
        }
        )
        .catch(error => {
          setError(`No "${person.name}" exists. They must have been removed from the server. No update made.`)
          setTimeout(() => setError(null), 5000)
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }
    const existingPersonSearch = persons.find(x => x.name === newPerson.name)
    if (existingPersonSearch) {
      // console.log(existingPersonSearch)
      updateNumber(
        {
          ...newPerson,
          id: existingPersonSearch.id
        }
      )
    } else {
      personService
        .create(newPerson)
        .then((response) => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setConfirmation(`New user "${response.data.name}" added successfully.`)
          setTimeout(() => setConfirmation(null), 5000)
        })

    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      // console.log(person.id)
      personService
        .deletePerson(person.id)
        .then((response) => {
          // console.log(persons)
          setPersons(persons.filter((x) => x.id !== person.id))
          setConfirmation(`User "${person.name}" successfully deleted.`)
          setTimeout(() => setConfirmation(null), 5000)
        })
        .catch(error => {
          setError(`No "${person.name}" exists. They must have been removed from the server. No delete made.`)
          setTimeout(() => setError(null), 5000)
        })
    }
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <Confirmation confirmation={confirmation} />
      <Error error={error} />
      <h2>Phonebook</h2>
      <SearchFilter filter={filter} handleFilterChange={handleFilterChange} />
      <NewEntryForm onNameChange={handleNameChange} onNumberChange={handleNumberChange} onSubmitForm={addPerson} newName={newName} newNumber={newNumber} />
      <Phonebook persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  )
}

export default App
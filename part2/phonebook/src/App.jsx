import { useState } from 'react'



const NewEntryForm = (props) => {
  const onNameChange = props.onNameChange
  const onNumberChange = props.onNumberChange
  const onSubmitForm = props.onSubmitForm
  const newName = props.newName
  const newNumber = props.newNumber

  return (
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
  )
}



const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '123-5555'
    },
    {
      name:'Jartha',
      number:'456-5555'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <input value={filter} onChange={handleFilterChange}/>
      </form>
      <h2>Add a new entry</h2>
      <NewEntryForm onNameChange={handleNameChange} onNumberChange={handleNumberChange} onSubmitForm={addPerson} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <ul>
        {persons
        .filter(x => x.name.toLowerCase().includes(filter.toLowerCase()))
        .map(x => <li key={x.name}>{x.name} {x.number}</li>)}
      </ul>
    </div>
  )
}

export default App
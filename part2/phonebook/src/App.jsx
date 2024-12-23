import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    // console.log(newName)
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.map(x => x.name).includes(newName)) {
      alert(`${newName} is already in the Phonebook!`)
    } else {
      const newPerson = {
        name: newName
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(x => <li key={x.name}>{x.name}</li>)}
      </ul>
    </div>
  )
}

export default App
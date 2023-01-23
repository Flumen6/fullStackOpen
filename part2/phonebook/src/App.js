import { useState, useEffect } from 'react'
import Filter from "./components/Filter";
import PersonForm from './components/PersonForm';
import Persons from "./components/Persons";
import serv from './serv/serv';

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    serv.getAll()
      .then(res => {
        setPersons(res)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.map(preson => preson.name).includes(newName)) {
      if (window.confirm(`${newName} is already added, do u want to update it?`)) {
        const id = persons.find(person => person.name = newName).id
        serv.update(id, {name: newName, number: newNumber}).then((res) => {
          console.log(res);
          console.log(persons.filter(person => person.id !== res.id));
          setPersons([...persons.filter(person => person.id !== res.id), res])
        })
      }
    } else {
      serv.create({name: newName, number: newNumber})
        .then(res => {
          setPersons([...persons, res])
          setNewName('');
          setNewNumber('');
        })
    }
  }
  const handleDelete = (id) => {
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
      serv.rm(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }
  const handleSearch = (event) => {
    setSearch(event.target.value);
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter fn={handleSearch} value={search}></Filter>

      <h2>add a new</h2>
      <PersonForm fnName={handleNameChange} fnNumber={handleNumberChange} fnSubmit={handleSubmit} name={newName} number={newNumber}/>

      <h2>Numbers</h2>
      <Persons persons={persons} search={search} fn={handleDelete}></Persons>
    </div>
  )
}

export default App
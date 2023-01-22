import Person from "./Person"
const Persons = ({ persons, search }) =>{
    return(
        <ul>
        {
          persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
            .map(person => <Person key={person.name} person={person}></Person>)
        }
      </ul>
    );
}
export default Persons
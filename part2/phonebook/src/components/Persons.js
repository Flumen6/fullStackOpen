import Person from "./Person"
const Persons = ({ persons, search, fn }) =>{
    return(
        <ul>
        {
          persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
            .map(person => <Person key={person.id} person={person} fn={fn}></Person>)
        }
      </ul>
    );
}
export default Persons
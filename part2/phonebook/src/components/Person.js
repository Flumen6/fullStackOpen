const Person = ({ person, fn }) =>{
    return(
        <>
          <li key={person.id}>{person.name} {person.number}</li>
          <button onClick={() => fn(person.id)}>Delete</button>
        </>
    );
}
export default Person
const PersonForm = ({ fnName, fnNumber, fnSubmit, name, number }) =>{
    return(
        <form>
        <div>name: <input onChange={fnName} value={name}/></div>
        <div>number: <input onChange={fnNumber} value={number}/></div>
        <div><button onClick={fnSubmit} type="submit">add</button></div>
      </form>
    );
}
export default PersonForm
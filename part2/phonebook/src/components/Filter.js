const Filter = ({ fn, value }) =>{
    return(
        <div>search: <input onChange={fn} value={value}></input></div>
    );
}
export default Filter
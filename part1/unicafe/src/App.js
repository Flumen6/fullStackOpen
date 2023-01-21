import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(null);
  const [neutral, setNeutral] = useState(null);
  const [bad, setBad] = useState(null);

  const handleGood = () => {
    setGood(prev => prev + 1);
  }
  const handleNeutral = () => {
    setNeutral(prev => prev + 1);
  }
  const handleBad = () => {
    setBad(prev => prev + 1);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button fn={handleGood} text="good"></Button>
      <Button fn={handleNeutral} text="neutral"></Button>
      <Button fn={handleBad} text="bad"></Button>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}
const Statistics = ({good, neutral, bad}) => {
  if(!(good || neutral || bad)){
    return(
      <p>No feedback given</p>
    );
  }
  return(
    <div>
      <h1>statistics</h1>
      <StatisticsLine text="good" value={good}/>
      <StatisticsLine text="neutral" value={neutral}/>
      <StatisticsLine text="bad" value={bad}/>
      <StatisticsLine text="all" value={good + bad + neutral}/>
      <StatisticsLine text="average" value={(good + bad * -1) / (good + bad + neutral)}/>
      <StatisticsLine text="good" value={good / (good + bad + neutral) * 100 + "%"}/>
    </div>
  );
}
const StatisticsLine = ({text, value}) => {
  return(
    <p>{text} {value}</p>
  );
}
const Button = ({fn, text}) => {
  return(
    <button onClick={fn}>{text}</button>
  );
}
export default App

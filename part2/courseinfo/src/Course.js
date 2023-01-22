const Course = ({course}) => {
    return(
      <>
        <Header course = {course.name}/>
        <Content parts = {course.parts}/>
        <Total parts = {course.parts}/>
      </>
    );
  }

  const Header = ({course}) => {
    return(
      <h1>{course}</h1>
    )
  }
  const Content = ({parts}) => {
    return(
      <div>
        {parts.map(part => <Part key={part.name} part={part}/>)}
      </div>
    )
  }
  const Part = ({part}) => {
    return(
      <p>
        {part.name} {part.exercises}
      </p>
    )
  }
  const Total = ({parts}) => {
    return(
      <p><b>Number of exercises {parts.map(part => part.exercises).reduce((a,b) => a + b)}</b></p>
      
    )
  }
export default Course;
const Header = (props) => {
    return <h1>{props.course}</h1>;
  };
  const Part = (props) => {
    return (
      <p>
        {props.part} {props.exercises}
      </p>
    );
  };
  const Content = (props) => {
    const parts = props.parts
    return (
      <div>
        {parts.map((x) => <Part key={x.id} part={x.name} exercises={x.exercises} />)}
      </div>
    );
  };
  
  const Total = (props) => {
    const exercises = props.exercises;
    const total = exercises.reduce((total, x) => {
      return total + x.exercises
    }, 0)
  
    return <p>Number of exercises {total}</p>;
  };
  
  const Course = ({ course }) => {
  
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total exercises={course.parts} />
      </div>
    )
  }

  export default Course
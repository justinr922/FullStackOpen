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
  return (
    <div>
      <Part part={props.parts[0].part} exercises={props.parts[0].exercises} />
      <Part part={props.parts[1].part} exercises={props.parts[1].exercises} />
      <Part part={props.parts[2].part} exercises={props.parts[2].exercises} />
    </div>
  );
};

const Total = (props) => {
  const excersises = props.exercises;
  var total = 0;
  excersises.forEach((e) => {
    total += e.exercises;
  });

  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        part: "Fundamentals of React",
        exercises: 10,
      },
      {
        part: "Using props to pass data",
        exercises: 7,
      },
      {
        part: "State of a component",
        exercises: 14,
      },
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts} />
    </div>
  );
};

export default App;

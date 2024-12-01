import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  );
};
const App = () => {
  const friends = ['you','me']
  return (
    <div>
      <h1>Greetings {friends}</h1>
    </div>
  );
};

export default App;

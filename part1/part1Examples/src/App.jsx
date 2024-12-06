import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import App2 from "./App2";
import App3 from "./App3";

const Hello = ({ age, name }) => {
  const bornYear = () => {
    const yearNow = new Date().getFullYear();
    return yearNow - age;
  };

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()} </p>
    </div>
  );
};

const App = () => {
  // First example
  const name = "Peter";
  const age = 10;

  // Second example
  return (
    <div>
      <div>
      <h1>------------Example 1---------------</h1>

        <h1>Greetings</h1>
        <Hello name="Maya" age={26 + 10} />
        <Hello name={name} age={age} />
      </div>
      <h1>------------Example 2---------------</h1>
      <App2/>
      <h1>------------Example 3---------------</h1>
      <App3/>
    </div>
  );
};

export default App;

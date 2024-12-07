import { useState } from "react";

const FeedbackButton = (props) => {
  const { p_handleClick, p_text } = props;
  return <button onClick={p_handleClick}>{p_text}</button>;
};

const Result = (props) => {
  const { p_text, p_state } = props;
  return (
    <p>
      {p_text} {p_state}
    </p>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);
  const total = good + bad + neutral;
  const average = (good - bad) / (total || 1);

  return (
    <div>
      <h1>Give Feeback</h1>
      <FeedbackButton p_handleClick={handleGoodClick} p_text="Good" />
      <FeedbackButton p_handleClick={handleNeutralClick} p_text="Neutral" />
      <FeedbackButton p_handleClick={handleBadClick} p_text="Bad" />
      <h1>Statistics</h1>
      <Result p_state={good} p_text="Good" />
      <Result p_state={neutral} p_text="Neutral" />
      <Result p_state={bad} p_text="Bad" />
    </div>
  );
};

export default App;

import { useState } from "react";

const FeedbackButton = (props) => {
  const { p_handleClick, p_text } = props;
  return <button onClick={p_handleClick}>{p_text}</button>;
};

const Result = (props) => {
  const { p_text, p_result, p_suffix } = props;
  // console.log(p_result);
  return (
    <tr>
      <td>{p_text}</td><td>{p_result}{p_suffix}</td> 
    </tr>
  );
};

const Statistics = (props) => {
  const { p_good, p_neutral, p_bad, p_total, p_average, p_percentPositive } =
    props;

  if (p_total === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <Result p_result={p_good} p_text="Good" />
          <Result p_result={p_neutral} p_text="Neutral" />
          <Result p_result={p_bad} p_text="Bad" />
          <Result p_result={p_total} p_text="All" />
          <Result p_result={p_average.toFixed(2)} p_text="Average" />
          <Result p_result={p_percentPositive.toFixed(2)} p_text="Positive" p_suffix="%" />
        </tbody>
      </table>
    </div>
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
  const average = (good - bad) / total || 0;
  const percentPositive = (good / total || 0) * 100.0;

  return (
    <div>
      <h1>Give Feedback</h1>
      <FeedbackButton p_handleClick={handleGoodClick} p_text="Good" />
      <FeedbackButton p_handleClick={handleNeutralClick} p_text="Neutral" />
      <FeedbackButton p_handleClick={handleBadClick} p_text="Bad" />
      <Statistics
        p_good={good}
        p_neutral={neutral}
        p_bad={bad}
        p_total={total}
        p_average={average}
        p_percentPositive={percentPositive}
      />
    </div>
  );
};

export default App;

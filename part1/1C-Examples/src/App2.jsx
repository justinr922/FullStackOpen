import { useState } from "react"

const App2 = () => {
    const [counter, setCounter] = useState(0)
    setTimeout(
        () => {setCounter(counter + 1)},
        500
    )
    return (
      <div>{counter}</div>
    )
  }
  
  export default App2
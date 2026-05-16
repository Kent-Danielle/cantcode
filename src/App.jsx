import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <h1>Welcome to React</h1>
      <p>
        Edit <code>src/App.jsx</code> and save to reload.
      </p>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        Count is {count}
      </button>
    </main>
  )
}

export default App
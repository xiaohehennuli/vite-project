import { useEffect, useState } from 'react'
import { Header } from './components/Header'

function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    setCount(1)
  }, [])
  console.log('count', count)
  return (
    <div className="App">
      <Header></Header>
    </div>
  )
}

export default App

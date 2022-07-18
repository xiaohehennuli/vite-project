import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import fib from 'virtual:fib'
import env from 'virtual:env'

function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    setCount(1)
    //  使用虚拟模块
    console.log(`结果: ${fib(10)}`)
    console.log('env', env)
  }, [])
  console.log('count', count)
  return (
    <div className="App">
      <Header></Header>
    </div>
  )
}

export default App

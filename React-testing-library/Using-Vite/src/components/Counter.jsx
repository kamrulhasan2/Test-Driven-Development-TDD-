import React, { useState } from 'react'

const Counter = () => {
    const [count,setCount] = useState(0);
    
    const handleClick = ()=>{
        setCount(count + 1)
    }
  return (
    <div>
        <h1>Counter</h1>
        <p>Current count: {count}</p>
        <button onClick={handleClick}>increment</button>
    </div>
  )
}

export default Counter;
import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'


function App() {
  const [todo, settodo] = useState("")
  const [todos, setTodos] = useState([])

  const handleAdd = () => {
    setTodos([...todos, {todo, isCompleted: "false"}]);
    settodo("")
    console.log(todos);
  }

  const handleChange = (e) => {
    settodo(e.target.value)
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-neutral-700 p-5 rounded-2xl my-8">

        <h1 className='font-bold text-xl'>Your Tasks</h1>

        <div className="add-todos flex items-center gap-2.5 text-white">

          <input type="text" value={todo} placeholder="Add new Task" className="bg-neutral-500 p-1.5 pl-1.5 rounded-xl" onChange={handleChange} />

          <button onClick={handleAdd} className="bg-blue-600 p-2 hover:bg-blue-800 rounded-xl cursor-pointer text-sm font-bold">Add Todo</button>

        </div>

        {todos.map(item => {
          return <div className="flex todo-card my-2.5 gap-2.5 items-center">
            <div className="text">{item.todo}</div>
            <div className="buttons flex gap-1.5 items-center">
              <button className="bg-green-700 p-1 w-16">Edit</button>
              <button className="bg-red-600 p-1 w-16">Delete</button>
            </div>
          </div>
        })}
      </div>
    </>
  )
}

export default App

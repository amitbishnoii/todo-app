import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid'


function App() {
  const [todo, settodo] = useState("")
  const [todos, setTodos] = useState([])

  useEffect(() => {
    let todostring = JSON.parse(localStorage.getItem("tasks"))
    if(todostring) {
      let ts = JSON.parse(localStorage.getItem("tasks"))
      setTodos(ts)
    }
  }, [])

  const savetoLS = () => {
    localStorage.setItem("tasks", JSON.stringify(todos))
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    settodo("")
  }

  const handleChange = (e) => {
    settodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    const id = e.currentTarget.name;
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
    savetoLS()
  };

  const handleDelete = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newtodos = [...todos]
    newtodos.splice(index, 1);
    setTodos(newtodos);
  };

  const handleEdit = (e) => {
    let edittodo = prompt("enter new todo: ")
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let newTodos = [...todos];
    newTodos[index].todo = edittodo
    savetoLS()
    setTodos(newTodos)
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-neutral-700 p-5 rounded-2xl my-8">

        <h1 className='font-bold text-xl'>Your Tasks</h1>

        <div className="add-todos flex items-center gap-2.5 text-white mt-3">

          <input type="text" value={todo} placeholder="Add new Task" className="bg-neutral-500 p-1.5 pl-1.5 rounded-xl w-[240px]" onChange={handleChange} />

          <button onClick={handleAdd} className="bg-blue-600 p-2 hover:bg-blue-400 rounded-xl cursor-pointer text-sm font-bold">Add Todo</button>

        </div>

        {todos.length === 0 && <div className="m-4">Click Add Button to add Tasks</div>}
        {todos.map(item => {
          return <div key={item.id} className="flex todo-card my-2.5 gap-2.5 items-center justify-between w-[30%] mt-6">

            <div className='flex gap-3 items-center'>
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id='' />

              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
            </div>

            <div className="buttons flex gap-2.5 items-center text-sm font-bold">
              <button name={item.id} onClick={handleEdit} className="bg-green-500 p-1 w-16 cursor-pointer transition-all hover:rounded-2xl">Edit</button>
              <button name={item.id} onClick={handleDelete} className="bg-red-500 p-1 w-16 cursor-pointer transition-all hover:rounded-2xl">Delete</button>
            </div>
          </div>
        })}
      </div>
    </>
  )
}

export default App

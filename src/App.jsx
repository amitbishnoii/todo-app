import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { VscClearAll } from "react-icons/vsc";


function App() {
  const [todo, settodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)

  useEffect(() => {
    let todostring = JSON.parse(localStorage.getItem("tasks"))
    if (todostring) {
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

  const clearLS = () => {
    localStorage.removeItem("tasks");
    setTodos([])
  }

  const toggleFinish = () => {
    setshowfinished(!showfinished)
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center  container mx-auto bg-neutral-700 p-5 rounded-2xl my-8 w-min-[60vw] w-1/2">

        <h1 className='font-bold text-xl'>Your Tasks</h1>

        <div className="add-todos flex items-center gap-2.5 text-white mt-3">

          <input type="text" value={todo} placeholder="Add new Task" className="bg-neutral-500 p-1.5 pl-1.5 rounded-xl w-[320px]" onChange={handleChange} />

          <button onClick={handleAdd} disabled={todo.length <= 1} className="bg-blue-600 p-2 hover:bg-blue-400 rounded-xl cursor-pointer text-sm font-bold disabled:bg-blue-950 disabled:cursor-default">Add Todo</button>

        </div>

        <div className="flex items-center gap-2 justify-items-start">
          <button onClick={clearLS} className="flex items-center justify-center my-4 mr-4 bg-white text-black w-10 h-10 cursor-pointer"><VscClearAll size={30}/></button>

          <input onChange={toggleFinish} checked={showfinished} type="checkbox" /> Show Finished
        </div>

        {todos.length === 0 && <div className="my-4">Click Add Button to add Tasks</div>}
        {todos.map(item => {
          return (showfinished || !item.isCompleted) && <div key={item.id} className="flex todo-card my-2.5 gap-2.5 items-center justify-between w-[400px] mt-6">

            <div className='flex gap-3 items-center'>
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id='' />

              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
            </div>

            <div className="buttons flex gap-2.5 items-center text-sm font-bold">
              <button name={item.id} onClick={handleEdit} className="flex items-center justify-center bg-green-500 w-16 h-8 cursor-pointer transition-all hover:rounded-2xl"><FaRegEdit size={24}/></button>
              <button name={item.id} onClick={handleDelete} className="flex items-center justify-center bg-red-500 w-16 h-8 cursor-pointer transition-all hover:rounded-2xl"><MdDelete size={24}/></button>
            </div>
          </div>
        })}
      </div>
    </>
  )
}

export default App

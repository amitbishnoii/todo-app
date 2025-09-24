import './App.css'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <Navbar/>
      <div className="container mx-auto bg-neutral-700 p-5 rounded-2xl my-8">
        <div className="">
          <h1>Your Tasks</h1>
        </div>
      </div>
    </>
  )
}

export default App

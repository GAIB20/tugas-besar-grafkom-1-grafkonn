
import './App.css'

function App() {

  return (
    <div className='flex flex-col h-screen w-screen m-0 bg-white'>
      <div className='flex w-screen h-[10%] p-3 justify-center gap-5 bg-slate-500'>
        <button>
          button 1
        </button>
        <button>
          button 1
        </button>
        <button>
          button 1
        </button>
      </div>
      <div className='flex h-[90%] p-2 gap-4'>
        <div className='flex flex-col w-1/6 p-4 gap-4 bg-slate-700 rounded-lg'>
          <button>
            button 1
          </button>
          <button>
            button 1
          </button>
          <button>
            button 1
          </button>
        </div>
        <div className='bg-slate-400 h-full w-full rounded-lg'>

        </div>
      </div>
    </div>
  )
}

export default App

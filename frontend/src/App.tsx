import './App.css'
import { RouterProvider } from 'react-router'
import router from './layouts/routes/RootRoutes'


function App() {

  return (
    <>
      <div className="text-3xl w-full justify-center items-center">
        ThrottleIQ
      </div>
      <RouterProvider router={router}/>
    </>
  )
}

export default App

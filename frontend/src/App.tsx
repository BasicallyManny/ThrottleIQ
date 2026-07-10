import './App.css'
import { RouterProvider } from 'react-router'
import router from './layouts/routes/RootRoutes'


function App() {

  return (
    <div className="">
      <RouterProvider router={router}/>
    </div>
  )
}

export default App

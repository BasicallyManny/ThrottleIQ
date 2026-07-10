import './App.css'
import { RouterProvider } from 'react-router'
import router from './layouts/routes/RootRoutes'


function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App

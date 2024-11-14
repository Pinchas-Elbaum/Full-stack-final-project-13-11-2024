
import { useNavigate } from 'react-router-dom'
import './App.css'
import Layout from './layout/Layout'
import { AppRoutes } from './routes/AppRoutes'


function App() {
  const navigate = useNavigate()

  return (
    <>
      <Layout children={<AppRoutes />} />
    </>
  )
}

export default App

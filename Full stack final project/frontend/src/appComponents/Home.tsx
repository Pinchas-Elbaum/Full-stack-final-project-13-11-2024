import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
  return (
    <div>
        <button onClick={() => { navigate('/login') }} >Login</button>
        <button onClick={() => { navigate('/register') }} >Register</button>
    </div>
  )
}

export default Home
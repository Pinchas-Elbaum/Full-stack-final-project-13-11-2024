import axios from 'axios'
import { useEffect } from 'react'

const WeaponsShop = () => {
    
    useEffect(() => {
      axios.get('http://localhost:3300/api/missiles').then(res => console.log(res.data));
      console.log('hello');
    }, [])

  return (
    <div>
      
    </div>
  )
}

export default WeaponsShop

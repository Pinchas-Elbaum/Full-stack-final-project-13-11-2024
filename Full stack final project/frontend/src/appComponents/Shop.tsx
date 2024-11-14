import axios from 'axios'
import  { useContext, useEffect, useState } from 'react'
import { IMissiles } from '../types/Types'
import { UserContext } from '../providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import { deleteToken } from '../service/DeleteToken';



const Shop = () => {
    const navigate = useNavigate();
    const {user} = useContext(UserContext);

    const [weponsList, setweponsList] = useState<IMissiles[]>([]);

    const [bugdet, setbugdet] = useState(user.bugdet);

    useEffect(() => {
        axios.get('http://localhost:3300/api/missiles').then(res => setweponsList(res.data));
    },[])

    

    const buyMissile = (missile: IMissiles) =>{
        axios.put(`http://localhost:3300/api/buyMissile/${user.id}`, {name: missile.name, amount: 1}).then(res => console.log(res))
        setbugdet(bugdet! - missile.price)
    }

    const logOut = () => {
        deleteToken();
        navigate('/');
    }
        
    

  return (
    <div>
        <h2>{bugdet}</h2>
        <table>
            <thead>
                <tr>
                    <th>Rocket</th>
                    <th>Intercepts</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {weponsList.map((missile) => (<tr key={missile.name}><td>{missile.name}</td><td>{missile.intercepts}</td><td>{missile.price}</td><td><button onClick={() => {buyMissile(missile)}}>+</button></td></tr>))}                
            </tbody>
        </table> 
        <button onClick={() => {navigate('/')}}>Home</button>  
        <button onClick={() => {logOut()}}>Log out</button>
    </div>
  )
}

export default Shop

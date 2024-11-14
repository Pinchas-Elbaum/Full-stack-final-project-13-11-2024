import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { IMissiles, IUser } from '../types/Types'
import { UserContext } from '../providers/UserProvider';



const Shop = () => {
    const {user} = useContext(UserContext);

    const [bugdet, setbugdet] = useState(user.bugdet);
    const [weponsList, setweponsList] = useState<IMissiles[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3300/api/missiles').then(res => setweponsList(res.data));
    },[])

    

    const buyMissile = (missile: IMissiles) =>{
        axios.put(`http://localhost:3300/api/buyMissile/${user.id}`, {name: missile.name, amount: 1}).then(res => console.log(res));
    }
        
    

  return (
    <div>
        <h2>{user.bugdet}</h2>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Intercepts</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {weponsList.map((missile) => (<tr key={missile.name}><td>{missile.name}</td><td>{missile.intercepts}</td><td>{missile.price}</td><td><button onClick={() => {buyMissile(missile)}}>Buy</button></td></tr>))}                
            </tbody>
        </table>      
    </div>
  )
}

export default Shop

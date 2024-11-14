import  { useContext } from 'react'
import { UserContext } from '../providers/UserProvider';

const CurrentWeaponQuantity = () => {
    const {user} = useContext(UserContext);
    const resorces = ["Weapon 1", "Weapon 2", "Weapon 3", "Weapon 4", "Weapon 5"];

  return (

    <div>
        <h2>Organsation: {user.organization}</h2>
        <h3>Buget: {user.bugdet}</h3>

        <div>
            <h3>Current Weapon Quantity</h3>
            <ul>
                {resorces.map((resource) => (<li key={resource}>{resource}</li>))}
            </ul>
        </div>
    </div>
    
  )
}

export default CurrentWeaponQuantity

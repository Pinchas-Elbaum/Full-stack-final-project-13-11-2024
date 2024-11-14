import  { useContext, useState } from 'react'
import { UserContext } from '../providers/UserProvider';
import { OrganizationContext } from '../providers/OrganizationProvider';
import { useNavigate } from 'react-router-dom';

const CurrentWeaponQuantity = () => {
  const navigat = useNavigate();
    const {user} = useContext(UserContext);
    const {organization} = useContext(OrganizationContext);
    const [resorces] = useState<{name: string, amount: number}[]>(organization.resources||[]);
    const navigate = useNavigate(); 

  return (

    <div>
        <h2>Organsation: {user.organization}</h2>
        <h3>Buget: {user.bugdet}</h3>

        <div>
            <h3>Avilable Ammo</h3>
            <ul>
                {resorces.map((resource) => (<li key={resource.name}>{resource.name} * {resource.amount}</li>))}
            </ul>
            <button onClick={() => { navigate('/Shop') }}>GO TO WEAPON SHOP</button>
        </div>
        <button onClick={() => { navigat('/') }}>Home</button>

    </div>
    
  )
}

export default CurrentWeaponQuantity

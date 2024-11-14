import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { IOrganization } from '../types/Types';
import { UserContext } from './UserProvider';
import axios from 'axios';


interface Props {
    children: ReactNode;
}

interface ContextProps {
    organization: IOrganization;
    setorganization: (organization: IOrganization) => void
}

export const OrganizationContext = createContext<ContextProps>({} as ContextProps);


const OrganizationProvider = ({ children }: Props) => {
    const [organization, setorganization] = useState<IOrganization>({} as IOrganization);
    const {user} = useContext(UserContext);

    useEffect(() => {
        if(user.organizationId){
        axios.get(`http://localhost:3300/api/organizationMissiles/${user.organizationId}`).then(res => setorganization({resources: res.data}));
    }}, [user]);
            

    
    
    return (

        <div>
            <OrganizationContext.Provider value={{ organization, setorganization }}>
                {children}
            </OrganizationContext.Provider>
        </div>
    )
}

export default OrganizationProvider

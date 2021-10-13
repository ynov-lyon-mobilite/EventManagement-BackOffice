import React, {PropsWithChildren, useState} from 'react';

export const UserContext = React.createContext(null);

export default function UserContextProvider({children}: PropsWithChildren<any>){
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{
            user: user,
            setUser: setUser
        }}>
            {children}
        </UserContext.Provider>
    );
}
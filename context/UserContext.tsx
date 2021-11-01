import React, {PropsWithChildren, useEffect, useState} from 'react';
import {CircularProgress} from "@mui/material";

export const UserContext = React.createContext(null);

export default function UserContextProvider({children}: PropsWithChildren<any>){
    const [user, setUser] = useState(null);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            /*setUser({email: 'test@test.com'})*/
            setFetching(false);
        }, 3000)
    }, []);

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            fetching
        }}>
            {fetching ? (
                <div className="h-screen d-flex">
                    <div className="m-auto text-center">
                        <CircularProgress color="primary" size={60}/>
                        <div>Connecting...</div>
                    </div>
                </div>
            ) : children}
        </UserContext.Provider>
    );
}

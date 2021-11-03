import React, {Dispatch, PropsWithChildren, SetStateAction, useEffect, useState} from "react";
import { CircularProgress } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import {FetchCurrentUserQuery} from "../src/__graphql__/__generated__";
import {useLog} from "../hooks/useLog";

export const UserContext = React.createContext<UserContextType>(null);

const FETCH_USER = gql`
  query FetchCurrentUser {
    user_infos {
      displayName
      email
      username
    }
  }
`;

type UserContextType = {
    user: FetchCurrentUserQuery["user_infos"],
    logout: () => void,
    loading: boolean
};

export default function UserContextProvider({
  children,
}: PropsWithChildren<any>) {
  const [user, setUser] = useState<FetchCurrentUserQuery["user_infos"]|null>(null);
  const { loading, error, data } = useQuery<FetchCurrentUserQuery>(FETCH_USER);

  useLog(error);

  useEffect(() => {
      setUser(data.user_infos)
  },[data])

  const logout = () => {
      //TODO : utiliser la mutation de logout
      setUser(null);
  }

  return (
    <UserContext.Provider
      value={{
        user: user,
        logout,
        loading,
      }}
    >
      {loading ? (
        <div className="h-screen d-flex">
          <div className="m-auto text-center">
            <CircularProgress color="primary" size={60} />
            <div>Connecting...</div>
          </div>
        </div>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
}

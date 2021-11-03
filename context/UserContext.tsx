import React, { PropsWithChildren, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useQuery, gql, useMutation } from "@apollo/client";
import {FetchCurrentUserQuery, LoginMutation, LoginMutationVariables} from "../src/__graphql__/__generated__";
import { useLog } from "../hooks/useLog";
import {useRouter} from "next/router";
import Unauthorized from "../components/error/403";
import {storeToken} from "../apollo/apollo-client";

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
const LOGIN_USER = gql`
  mutation Login($password: String!,$email: String!){
    loggedUser:login(password:$password, email: $email){
      user{
        displayName,
        email,
        joinedEvents{
          title
        },
        roles,
        username,
        uuid
      }
      jwt
    }
  }
`;

type UserContextType = {
  user: FetchCurrentUserQuery["user_infos"];
  logout: () => void;
  login: (email: string, password: string) => Promise<any>;
  loading: boolean;
};

export default function UserContextProvider({
  children,
}: PropsWithChildren<any>) {
  const router = useRouter();
  const [user, setUser] = useState<FetchCurrentUserQuery["user_infos"] | null>(null);
  const { loading, error, data, refetch } = useQuery<FetchCurrentUserQuery>(FETCH_USER);
  const [loginUser, { data: loggedUserData }] = useMutation<LoginMutation, LoginMutationVariables>(LOGIN_USER);

  useLog(data);

  useEffect(() => {
    if (data) {
      setUser(data.user_infos);
    }
  }, [data]);

  useEffect(() => {
    if (loggedUserData) {
      setUser(loggedUserData.loggedUser.user);
      storeToken(loggedUserData.loggedUser.jwt);
    }
  }, [loggedUserData]);

  useEffect(() => {
    console.log(loading, data, user);
    if (!user && !loading && !data) {
      router.push({ pathname: "/login" });
    }
  }, [user, loading]);

  async function login(email, password) {
    return loginUser({variables: { password, email: email }})
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jwt-auth');
    refetch();
  };

  return (
    <UserContext.Provider
      value={{
        user: user,
        logout,
        login,
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
      ) : ((user || router.pathname.includes("login")) ? (children) : (
          <Unauthorized/>
      ))}
    </UserContext.Provider>
  );
}

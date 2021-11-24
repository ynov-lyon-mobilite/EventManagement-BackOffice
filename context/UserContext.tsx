import React, { PropsWithChildren, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useQuery, gql, useMutation } from "@apollo/client";
import {
  FetchCurrentUserQuery,
  LoginMutation,
  LoginMutationVariables, UpdateMainUserMutation, UpdateMainUserMutationVariables,
} from "../src/__graphql__/__generated__";
import { useRouter } from "next/router";
import { deleteToken, storeToken } from "../apollo/apollo-client";

export const UserContext = React.createContext<UserContextType>(undefined);

const FETCH_USER = gql`
  query FetchCurrentUser {
    user_infos {
      displayName
      email
      uuid
    }
  }
`;

const LOGIN_USER = gql`
  mutation Login($password: String!, $email: String!) {
    loggedUser: login(password: $password, email: $email) {
      user {
        displayName
        email
        joinedEvents {
          title
        }
        roles
        uuid
      }
      jwt
    }
  }
`;

const UPDATE_MAIN_USER = gql`
  mutation updateMainUser($displayName: String, $email: String, $password: String, $uuid: String!){
    updateUser(displayName: $displayName, email: $email, password: $password, uuid: $uuid){
      uuid
    }
  }
`;

type UserContextType = {
  user: FetchCurrentUserQuery["user_infos"] | null;
  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
  loading: boolean;
  updateUser: (displayName: string, email:string) => Promise<void>;
  updatePassword: (password:string) => Promise<void>
};

export default function UserContextProvider({
  children,
}: PropsWithChildren<any>) {
  const router = useRouter();
  const [user, setUser] = useState<FetchCurrentUserQuery["user_infos"] | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: loggedUser, error } = useQuery<FetchCurrentUserQuery>(FETCH_USER);
  const [updateMainUser] = useMutation<UpdateMainUserMutation, UpdateMainUserMutationVariables>(UPDATE_MAIN_USER);
  const [loginUser] = useMutation<LoginMutation, LoginMutationVariables>(LOGIN_USER);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user]);

  useEffect(() => {
    if (loggedUser) {
      setUser(loggedUser.user_infos);
      setLoading(false);
    }
  }, [loggedUser]);

  useEffect(() => {
    if (!!error) {
      setLoading(false);
    }
  }, [error]);

  const login = async (email: string, password: string) => {
      const { data } = await loginUser({ variables: { email, password } });
      storeToken(data.loggedUser.jwt);
      setUser(data.loggedUser.user);
  };

  const updateUser = async (displayName: string, email:string) => {
      await updateMainUser({ variables: { displayName, email, uuid: user.uuid  } });
      setUser(prev => ({...prev, displayName: displayName, email: email}));
  };

  const updatePassword = async (password:string) => {
    await updateMainUser({ variables: { password, uuid: user.uuid  } });
  };

  const logout = () => {
    deleteToken();
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        updateUser,
        updatePassword
      }}
    >
      {loading ? (
        <div className="h-screen d-flex">
          <div className="m-auto text-center">
            <CircularProgress color="primary" size={60} />
            <div>Connecting...</div>
          </div>
        </div>
      ) : user || router.pathname.includes("login") ? (
        children
      ) : null}
    </UserContext.Provider>
  );
}

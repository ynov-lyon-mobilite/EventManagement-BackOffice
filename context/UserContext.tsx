import React, { PropsWithChildren, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useQuery, gql, ApolloQueryResult } from "@apollo/client";
import { FetchCurrentUserQuery } from "../src/__graphql__/__generated__";
import { useLog } from "../hooks/useLog";
import { useRouter } from "next/router";
import Unauthorized from "../components/error/403";

export const UserContext = React.createContext<UserContextType>(undefined);

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
  user: FetchCurrentUserQuery["user_infos"] | undefined;
  logout: () => void;
  refetch: () => Promise<ApolloQueryResult<FetchCurrentUserQuery>>;
  loading: boolean;
};

export default function UserContextProvider({
  children,
}: PropsWithChildren<any>) {
  const router = useRouter();
  const [user, setUser] = useState<FetchCurrentUserQuery["user_infos"] | null>(
    null
  );
  const { loading, error, data, refetch } = useQuery<FetchCurrentUserQuery>(FETCH_USER,
      {fetchPolicy: 'network-only', notifyOnNetworkStatusChange: true});

  useEffect(() => {
    if (!loading && !!error) {
      router.push("/login");
    }
  }, [loading, error]);

  useEffect(() => {
    if (data) {
      setUser(data.user_infos);
    }
  }, [data]);

  const logout = async () => {
    localStorage.removeItem("jwt-auth");
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        logout,
        refetch,
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
      ) : user || router.pathname.includes("login") ? (
        children
      ) : null}
    </UserContext.Provider>
  );
}

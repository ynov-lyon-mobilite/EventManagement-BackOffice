import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import LoadingButton from "@mui/lab/LoadingButton";
import styles from "../../styles/Login.module.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { useRouter } from "next/router";
import { gql, useMutation } from "@apollo/client";
import {
  LoginMutation,
  LoginMutationVariables,
} from "../../src/__graphql__/__generated__";

import { storeToken } from "../../apollo/apollo-client";

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
        username
        uuid
      }
      jwt
    }
  }
`;

export default function Login() {
  const { user, loading: loadingUser, refetch } = useContext(UserContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser, { data, loading, error }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_USER);

  useEffect(() => {
    if (data) {
      storeToken(data.loggedUser.jwt);
      refetch().then(() => {
        router.push("/");
      });
    }
  }, [data]);

  useEffect(() => {
    if (!loadingUser && user) {
      router.push("/");
    }
  }, [loadingUser, user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    await loginUser({ variables: { email, password } }).catch(console.error);
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleLogin} className={styles.loginSubcontainer}>
        <Card sx={{ minWidth: 275 }} elevation={10}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="text-center"
              color="primary"
            >
              Connexion
            </Typography>
            <div className="mt-2">
              <TextField
                required
                autoFocus
                type="email"
                label="Email"
                variant="outlined"
                className="w-full"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="mt-2">
              <TextField
                required
                type="password"
                label="Mot de passe"
                variant="outlined"
                className="w-full"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            {error && <div className="mt-2 error">{error.message}</div>}
          </CardContent>
          <CardActions className="d-flex justify-center">
            <LoadingButton
              disabled={loading}
              loading={loading}
              type="submit"
              variant="contained"
            >
              Log in
            </LoadingButton>
          </CardActions>
        </Card>
      </form>
    </div>
  );
}

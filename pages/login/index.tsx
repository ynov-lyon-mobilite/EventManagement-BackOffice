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
import {NextSeo} from "next-seo";

export default function Login() {
  const { user, loading: loadingUser, login } = useContext(UserContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loadingUser && user) {
      router.push("/");
    }
  }, [loadingUser, user]);

  const handleLogin = async (e) => {
    setLoading(true);
    setError(null);
    e.preventDefault();
    try{
      await login(email, password);
    }catch(e){
      console.log(e);
      setError(e.message ?? e.toString());
    }
    setLoading(false);
  };

  return (
    <div className={styles.loginContainer}>
      <NextSeo
          title="Yvent - Connexion"
          description="Page de connexion du back-office Yvent"
      />
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
            {error && <div className="mt-2 error">{error}</div>}
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

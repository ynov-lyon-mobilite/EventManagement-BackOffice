import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import LoadingButton from "@mui/lab/LoadingButton";
import styles from "../../styles/Login.module.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const [connecting, setConnecting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setConnecting(true);
    console.log(`login with email : ${email} | password : ${password}`);
    setTimeout(() => {
      setConnecting(false);
      setUser({ email: email });
    }, 2000);
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
                type="email"
                id="outlined-basic"
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
                id="outlined-basic"
                label="Mot de passe"
                variant="outlined"
                className="w-full"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </CardContent>
          <CardActions className="d-flex justify-center">
            <LoadingButton
              disabled={connecting}
              loading={connecting}
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

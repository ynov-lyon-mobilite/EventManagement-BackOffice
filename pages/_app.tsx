import '../styles/globals.css';
import UserContextProvider from "../context/UserContext";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: '#16887F',
        },
        secondary: {
            // This is green.A700 as hex.
            main: '#42AB9E',
            contrastText: '#fff',
        },
    },
});

function MyApp({ Component, pageProps }) {
  return (
      <ThemeProvider theme={theme}>
          <UserContextProvider>
              <Component {...pageProps} />
          </UserContextProvider>
      </ThemeProvider>
  );
}

export default MyApp

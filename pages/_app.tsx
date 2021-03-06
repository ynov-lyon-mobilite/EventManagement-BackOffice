import "../styles/globals.css";
import UserContextProvider from "../context/UserContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ApolloProvider } from "@apollo/client";
import { client } from "../apollo/apollo-client";
import CategoryContextProvider from "../context/CategoryContext";
import EventContextProvider from "../context/EventContext";

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#16887F",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#42AB9E",
      contrastText: "#fff",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <UserContextProvider>
          <EventContextProvider>
            <CategoryContextProvider>
              <Component {...pageProps} />
            </CategoryContextProvider>
          </EventContextProvider>
        </UserContextProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;

import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { useRouter } from "next/router";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../styles/theme";
import { createEmotionCache } from "../src/utils/createEmotionCache";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { RootLayout } from "../src/components/Layout/RootLayout";
import Login from "./login";
import { SessionProvider } from "next-auth/react";
import Register from "./register";
import { Provider } from "react-redux";
import store from "../src/app/store";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  return (
    <CacheProvider value={emotionCache}>
      <Provider store={store}>
        <SessionProvider session={session}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <LocalizationProvider dateAdapter={DateAdapter}>
              {router.pathname === "/login" ? (
                <Login />
              ) : router.pathname === "/register" ? (
                <Register />
              ) : (
                <RootLayout>
                  <Component {...pageProps} />
                </RootLayout>
              )}
            </LocalizationProvider>
          </ThemeProvider>
        </SessionProvider>
      </Provider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

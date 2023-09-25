import "../styles/globals.css";
import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserReducer";
import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";
import ModeChange from "@/components/ModeChange";

const store=configureStore({
  reducer:{
    users:UserReducer
  }
})
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
            <ThemeProvider>
        <div className="z-10 fixed w-full flex justify-end">
          <ModeChange />
        </div>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

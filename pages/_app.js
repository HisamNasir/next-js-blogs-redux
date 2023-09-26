import "../styles/globals.css";
import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";
import ModeChange from "@/components/ModeChange";
import store from "@/redux/store";

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

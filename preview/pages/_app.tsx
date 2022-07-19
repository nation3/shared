import React from "react";
import "../styles/globals.css";
import { Nation3Provider } from "@nation3/utils";

import "react-dom";

function App({ Component, pageProps }: any) {
  return (
    <Nation3Provider>
      <Component {...pageProps} />
    </Nation3Provider>
  );
}

export default App;

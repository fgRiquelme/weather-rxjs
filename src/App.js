import React from "react";
import { Provider } from "react-redux";

import Pages from "./components/Pages";
import store from "./store";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Pages />
    </Provider>
  );
}

export default App;

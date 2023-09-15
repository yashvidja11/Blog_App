import React from "react";

import "./assets/css/tailwind.css";
import Router from "./Router";
import { Provider } from "react-redux";
import store from "./redux/store";
const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        
        <Router />
      </Provider>
    </div>
  );
};

export default App;

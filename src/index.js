import React from "react";
import { Provider } from "react-redux";

import store from "./store";

import Routes from "~/routes/routes";

import { initMomentPtBr } from "~/shared/helpers";

initMomentPtBr();

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default App;

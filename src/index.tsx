import ReactDOM from "react-dom";
import App from "./App";
import "antd/dist/antd.css";
import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import rootReducer from "./store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}> 
      <App /> 
  </Provider>,
  document.getElementById("root")
);

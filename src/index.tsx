import ReactDOM from "react-dom";
import App from "./App";
import "antd/dist/antd.css";
import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import rootReducer from "./store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter} from "react-router-dom";
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}> 
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

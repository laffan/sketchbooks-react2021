import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from './components/App';
import "./scss/main.scss";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter >
        <Switch>
          <Route
            exact
            path={`/`}
            render={r => <App routeProps={r} />}
          />
          <Route
            exact
            path={`/:page`}
            render={r => <App routeProps={r} />}
          />
        </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
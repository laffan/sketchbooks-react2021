import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from './components/App';
import "./scss/main.scss";


const { REACT_APP_ROOT_DIR } = process.env;


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={`${REACT_APP_ROOT_DIR}`}>
        <Switch>
          <Route
            exact
            path={`/sketchbook/:page`}
            render={r => <App routeProps={r} />}
          />
          <Route
            render={r => <App routeProps={r} />}
          />
        </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
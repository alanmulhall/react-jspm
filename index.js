import React from "react";
import { Router, Route, Link } from "react-router";
import HelloWorld from "./hello-world";
import WelcomeWorld from "./welcome-world";
import App from "./app";

// React.render(<HelloWorld/>, document.getElementById("example"));

React.render((
  <Router>
    <Route path="/" component={App}>
        <Route path="hello-world" component={HelloWorld} />
        <Route path="welcome-world" component={WelcomeWorld} />
    </Route>
  </Router>
), document.body)

import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import "./app.css";
import Post from "./components/post";
import PostsList from "./components/posts-list";

import "bootstrap/dist/css/bootstrap.min.css";

const indexRoutes = [
  { path: "/", name: "Home", component: PostsList },
  { path: "/posts/:postId", name: "Post edit page", component: Post }
];

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          {indexRoutes.map((prop, key) => {
            return (
              <Route
                path={prop.path}
                exact={true}
                component={prop.component}
                key={key}
              />
            );
          })}
        </Switch>
      </HashRouter>
    );
  }
}

export default App;

import React from "react";
import Form from "./components/SignUp";
import Login from "./components/Login";
import { Switch, Route, Link } from "react-router-dom";
import Me from "./components/Me";
import CreateProduct from "./components/CreateProduct";
import EditProduct from "./components/EditProduct";
import Products from "./components/Products";
import EditProfile from "./components/EditProfile";
import EditAvatar from "./components/EditAvatar";
import "fontsource-roboto";
import "normalize.css";
import "./Sass/styles.scss";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/dashboard" component={Products} />
        <Route exact path="/" component={Home} />
        <Route exact path="/users/me" component={Me} />
        <Route exact path="/users/me/edit" component={EditProfile} />
        <Route exact path="/product" component={CreateProduct} />
        <Route exact path="/products/:id" component={EditProduct} />
        <Route exact path="/users/me/avatar" component={EditAvatar} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
// // <Switch>
//   // <Route exact path="/" component={Home} />
//   // <Route exact path="/signup" component={Form} />
//   // <Route exact path="/users/me/avatar" component={Replace} />
//   //{" "}
// </Switch>;
// // <Link
// //   style={{
// //     color: "white",
// //     textDecoration: "none",
// //     margin: "5px 15px 5px 15px",
// //   }}
// //   to="/signup"
// // >
// //   Signup
// // </Link>;

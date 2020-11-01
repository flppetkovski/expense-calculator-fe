import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Appbar from "./Appbar";
import Form from "./SignUp";
import Login from "./Login";
import Products from "./Products";
import Footer from "./Footer";
import Container from "@material-ui/core/Container";
import Grid from '@material-ui/core/Grid';
function Home() {
  return (
    <Grid container>
<Grid item  xs={12} >
      <Appbar
       
      >
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <div className="logo"></div>
          </div>
          <Login
            style={{
              marignLeft: "auto",
            }}
          />
        </nav>
      </Appbar>
      </Grid>
      <div className="container">
        <div className="image-container"></div>
        <div className="signUpForm-container">
          <Form />
          <Footer />
        </div>
      </div>
</Grid>
);
}

export default Home;

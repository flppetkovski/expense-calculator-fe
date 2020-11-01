import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import "fontsource-roboto";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& label.Mui-focused": {
      color: "white",
      borderBottomColor: "white",
    },

    "& .MuiInput-underline:before": {
      borderBottomColor: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "&:hover:not($disabled):after": {
      backgroundColor: "white",
    },

    "&:hover:not($disabled):($focused):not($error) $notchedOutline": {
      borderColor: "white",
      borderBottomColor: "#ffffff",
    },

    "&:hover:not($disabled):before": {
      backgroundColor: "white",
    },
  },
}));

function Login() {
  const classes = useStyles();
  let [loggedIn, setLoggedIn] = useState(false);
  let [error, setError] = useState("");
  const [user, setUser] = useState({});

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: "1 1",
          marginBottom: "10px",
        }}
      >
        <Formik
          style={{
            flex: "1 1",
          }}
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            const response = await axios.post(
              "https://petkovski-calculator-be.herokuapp.com/users/login",
              {
                email: values.email,
                password: values.password,
              }
            );
            setUser(response.data.user);
            let token = response.data.token;

            axios.defaults.headers.common = {
              Authorization: `Bearer ${token}`,
            };

            if (response.status === 200) {
              setLoggedIn(true);
            } else {
              setError("Please Authenticate");
            }
          }}
        >
          <Form>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Field
                classes={classes}
                name="email"
                label="email"
                as={TextField}
                style={{
                  flex: "1",
                  marginRight: "25px",
                }}
                InputLabelProps={{
                  style: {
                    color: "white",
                  },
                }}
                InputProps={{
                  style: {
                    color: "white",
                    notchedOutline: "white",
                  },
                }}
                root={{ border: "1px solid white" }}
              />
              <Field
                classes={classes}
                name="password"
                type="password"
                InputLabelProps={{
                  style: {
                    color: "white",
                  },
                }}
                label="password"
                InputProps={{
                  style: {
                    color: "white",
                    notchedOutline: "white",
                    focused: "white",
                  },
                }}
                as={TextField}
                style={{
                  flex: "1",
                  color: "white",
                  marginRight: "25px",
                  borderColor: "white",
                }}
              />
              <Button
                style={{
                  flex: "1",
                  marginRight: "25px",
                  alignSelf: "flex-end",
                }}
                size="small"
                margin="fullWidth"
                variant="contained"
                color="primary"
                type="submit"
              >
                Login
              </Button>
            </div>
          </Form>
        </Formik>
        <p>{error}</p>
      </div>

      {loggedIn ? (
        <Redirect from={"/"} to={"/dashboard"} key={"products"} />
      ) : (
        error && <p>{error}</p>
      )}
    </div>
  );
}
export default Login;

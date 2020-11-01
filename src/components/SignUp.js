import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import "fontsource-roboto";

function Signup() {
  let [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const styles = {
    inputRoot: {
      fontSize: 30,
    },
  };

  return (
    <Grid
      style={{ height: "91.24vh" }}
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <div className="App" style={{ width: 570 }}>
        <h2 className="signup__header">Sign Up</h2>
        <p className="signup__paragraph">
          Sign up for free if you do not have an account
        </p>
        <Formik
          initialValues={{
            name: "",
            email: "",
            surname: "",
            phone: "",
            password: "",
            birthday: "",
            test: "",
          }}
          onSubmit={async (values) => {
            const response = await axios.post(
              "https://petkovski-calculator-be.herokuapp.com/users/",
              {
                name: values.name,
                email: values.email,
                surname: values.surname,
                phone: values.phone,
                password: values.password,
                birthday: values.birthday,
              }
            );
            setUser(response.data.user);
            let token = response.data.token;

            axios.defaults.headers.common = {
              Authorization: `Bearer ${token}`,
            };

            setLoggedIn(true);
          }}
        >
          <Form>
            <Field
              fullWidth={true}
              as={TextField}
              name="name"
              type="text"
              label="Name"
            />

            <div>
              <Field
                as={TextField}
                name="surname"
                type="text"
                label="Last Name"
                fullWidth={true}
              />
            </div>
            <div>
              <Field
                margin="normal"
                fullWidth
                as={TextField}
                name="password"
                type="password"
                label="Password (Minimum 7 characters)"
                fullWidth={true}
              />
            </div>
            <div>
              <Field
                fullWidth={true}
                as={TextField}
                type="date"
                name="birthday"
              />
            </div>
            <div>
              <Field
                as={TextField}
                name="phone"
                type="text"
                label="Phone"
                fullWidth={true}
              />
            </div>
            <div>
              <Field
                as={TextField}
                name="email"
                type="email"
                label="Email"
                fullWidth={true}
              />
            </div>

            <Button
              color="primary"
              variant="contained"
              type="submit"
              fullWidth={true}
            >
              Submit
            </Button>
          </Form>
        </Formik>
        {loggedIn && <Redirect from={"/signup"} to={"/users/me"} key={"me"} />}
      </div>
    </Grid>
  );
}

export default Signup;

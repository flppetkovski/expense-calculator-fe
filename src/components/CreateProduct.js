import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import "fontsource-roboto";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import {Link} from "react-router-dom";
import Appbar from "./Appbar";
import Avatar from '@material-ui/core/Avatar';
import Menu2 from "./Menu";
import { useStateIfMounted } from "use-state-if-mounted";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import "../Sass/styles.scss";
function CreateProduct() {
  const [sent, setSent] = useState(false);
const [profile, setProfile] = useStateIfMounted({});
const [products, setProducts] = useState(false)
  useEffect(() => {
    (async () => {
      const user = await axios.get(
        "https://petkovski-calculator-be.herokuapp.com/users/me"
      );

      setProfile(user.data);

    })();
  }, []);
  return (
    <div className="App">
      <Appbar
        style={{
          display: "flex",
          alignItems: "center",
        }}
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
              alignItems: "center",
            }}
          >
            <div className="logo"></div>
            
          </div>
         <div  style={{marginLeft: "auto", display: "inline-block", marginTop:"0.3rem", marginBottom:"0.3rem", marginRight: "0.5rem"}}>
    <Link to="users/me/avatar"> <Avatar src={`https://petkovski-calculator-be.herokuapp.com/users/${profile._id}/avatar`}/></Link>
       
          </div>
          <Box component="span" mr={4}>
            <Menu2 />
          </Box>
        </nav>
      </Appbar>

<Box mt={5} ml={11}>
            <button
              style={{
                   borderRadius: ".7rem",
                padding: "0.5rem",
                textDecoration: "none",
               backgroundColor: "#64b5f6",
               border: "	#A9A9A9",
color: "#A9reA9A9",
                boxShadow: "0.25rem 0.2rem 0.15rem #A9A9A9",
                transition: "0.2s all ease",
                 ":hover": {
                boxShadow: "0.10rem 0.05rem 0.150rem black",
                cursor:"pointer",
                color: "black"
              }}}
          
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
                to="/dashboard"
              >
          <div style={{display:"flex", alignItems: "center", justifyContent: "center"}}>
              <ChevronLeftIcon/>
                DASHBOARD PAGE
                </div>
              </Link>
            </button>
</Box>

      <Box mt={2.5}>
        <Formik
          initialValues={{
            name: "",
            description: "",
            type: "",
            price: 0,
            date: moment(new Date()),
          }}
          onSubmit={async (values) => {
            await axios.post(
              "https://petkovski-calculator-be.herokuapp.com/product/",
              {
                name: values.name,
                description: values.description,
                type: values.type,
                price: values.price,
                date: values.date,
              }
            );
            setSent(true);
          }}
        >
          <Container maxWidth="sm">
            <Typography color="primary" variant={"h4"}>
              Create Expense
            </Typography>
            <Form>
              <div>
                <Field
                  name="name"
                  // placeholder="Name"
                  render={({ field /* _form */ }) => (
                    <TextField
                      required
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      label="name"
                      autoFocus
                      {...field}
                    />
                  )}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div>
                <Field
                  name="description"
                  render={({ field /* _form */ }) => (
                    <TextField
                      required
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      label="description"
                      autoFocus
                      {...field}
                    />
                  )}
                  // placeholder="description"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div>
                <Field
                  name="type"
                  render={({ field /* _form */ }) => (
                    <TextField
                      required
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      label="type"
                      autoFocus
                      {...field}
                    />
                  )}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  // placeholder="type"
                />
              </div>
              <div>
                <Field
                  name="price"
                  render={({ field /* _form */ }) => (
                    <TextField
                      required
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      label="price"
                      autoFocus
                      {...field}
                    />
                  )}
                  // placeholder="price"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div>
                <Box mt={2}>
                  <Field name="date" type="date" label="date" />
                </Box>
              </div>
              <Box mt={3}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Box>
            </Form>
          </Container>
        </Formik>
        {sent && <Redirect from={"/product"} to={"/dashboard"} key={"me"} />}
      </Box>
      {products && <Redirect to={"/dashboard"}/>}
    </div>
  );
}

export default CreateProduct;

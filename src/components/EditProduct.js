import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import { Redirect, useParams, Link } from "react-router-dom";
import { useStateIfMounted } from "use-state-if-mounted";
import { TextField, Button } from "@material-ui/core";
import "fontsource-roboto";
import Profile_pic from "../img/profile_pic.png"

import Container from "@material-ui/core/Container";
import Appbar from "./Appbar";
import Box from "@material-ui/core/Box";
import Menu2 from "./Menu";
import Footer from "./Footer";
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

function EditProduct() {

  let [item, setItem] = useStateIfMounted({});
  let [submitted, setSubmitted] = useStateIfMounted(false);
  const [products, setProducts] = useState(false)

  const { id } = useParams();
  useEffect(() => {
    (async () => {
      await axios
        .get(`https://petkovski-calculator-be.herokuapp.com/products/${id}`)
        .then((res) => setItem(res.data));
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


 <Link to="/users/me/avatar"> <Avatar src={`https://petkovski-calculator-be.herokuapp.com/users/${item.owner}/avatar`}/></Link>

     
          
          </div>
          <Box component="span" mr={4}>
            {" "}
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
      <Box mt={1}>
        <Formik
          enableReinitialize={true}
          initialValues={{
            name: item.name || "",
            description: item.description || "",
            type: item.description || "",
            price: item.price || "",
            date: item.date || "", // birthday: "",
          }}
          onSubmit={async (values) => {
            await axios.patch(
              `https://petkovski-calculator-be.herokuapp.com/products/${id}`,
              {
                name: values.name,
                description: values.description,
                type: values.type,
                price: values.price,
                date: values.date,
              }
            );
            setSubmitted(true);
          }}
        >
          <Container maxWidth="sm">
            <Typography color="primary" variant={"h4"}>
              Edit Expense
            </Typography>
            <Form>
              <div>
                <Field
                  name="name"
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
                />
                <Box mb={3} mt={2}>
                  <Field name="date" type="date" label="date" />
                </Box>
              </div>
              <Box>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Box>
            </Form>
          </Container>
        </Formik>
      </Box>
      {submitted && (
        <Redirect from={"/products/:id"} to={"/dashboard"} key={"me"} />
      )}
           {products && <Redirect to={"/dashboard"}/>}
      <Footer />
    </div>
  );
}

export default EditProduct;

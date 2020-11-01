import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Field, Form } from "formik";
import { useStateIfMounted } from "use-state-if-mounted";
import { Redirect, Link } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import "fontsource-roboto";
import Appbar from "./Appbar";
import Box from "@material-ui/core/Box";
import Menu2 from "./Menu";
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';
import EditAvatar from "./EditAvatar";
import DeleteProfilePicture from "./DeleteProfilePicture";
import Container from "@material-ui/core/Container";
import Footer from "./Footer";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Profile_pic from "../img/profile_pic.png"

function EditProfile() {
  const [profile, setProfile] = useStateIfMounted({});
  const [updated, setUpdated] = useStateIfMounted(false);
const [products, setProducts] = useState(false)
const [loader, setLoader] = useState(false);


  useEffect(() => {
    (async () => {
      const user = await axios.get(
        "https://petkovski-calculator-be.herokuapp.com/users/me"
      );

      setProfile(user.data);
    })();
      setLoader(true)
  }, []);

  return (
    <div>
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
   {!loader &&  <Link to="/users/me/avatar"> <Avatar src={Profile_pic}/></Link>}
       {loader &&  <Link to="/users/me/avatar"> <Avatar src={`https://petkovski-calculator-be.herokuapp.com/users/${profile._id}/avatar`}/></Link>}
          
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
      <Box mt={2.5}>
        <Formik
          enableReinitialize={true}
          initialValues={{
            name: profile.name || "",
            email: profile.email || "",
            surname: profile.surname || "",
            phone: profile.phone || "",

            // birthday: "",
          }}
          onSubmit={async (values) => {
            await axios.patch(
              "https://petkovski-calculator-be.herokuapp.com/users/me",
              {
                name: values.name,
                email: values.email,
                surname: values.surname,
                phone: values.phone,
                // password: values.password,
                // birthday: values.birthday,
              }
            );
            // setUser(response.data.user);

            setUpdated(true);
          }}
        >
          <Container maxWidth="sm">
            <Typography color="primary" variant={"h4"}>
              Edit Profile
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
                  name="surname"
                  render={({ field /* _form */ }) => (
                    <TextField
                      required
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      label="last name"
                      autoFocus
                      {...field}
                    />
                  )}
                />
              </div>

              <div>
                <Field
                  name="phone"
                  render={({ field /* _form */ }) => (
                    <TextField
                      required
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      label="phone"
                      autoFocus
                      {...field}
                    />
                  )}
                />
              </div>
              <div>
                <Field
                  name="email"
                  render={({ field /* _form */ }) => (
                    <TextField
                      required
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      label="email"
                      autoFocus
                      {...field}
                    />
                  )}
                />
              </div>

         
<Box mt={2}>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
              </Box>
            </Form>
          </Container>
        </Formik>
        {updated && (
          <Redirect from={"/users/me/edit"} to={"/users/me"} key={"me"} />
        )}
      </Box>
      <Footer />
                 {products && <Redirect to={"/dashboard"}/>}

    </div>
  );
}

export default EditProfile;

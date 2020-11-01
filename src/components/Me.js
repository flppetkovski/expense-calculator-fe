import React, { useState, useEffect } from "react";
import axios from "axios";
import { useStateIfMounted } from "use-state-if-mounted";
import Logout from "./Logout";
import LogoutAll from "./LogoutAll";
import { Redirect, Link } from "react-router-dom";
import {  Button } from "@material-ui/core";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import moment from "moment";
import DeleteProfilePicture from "./DeleteProfilePicture";
import "fontsource-roboto";
import Typography from "@material-ui/core/Typography";
import EditAvatar from "./EditAvatar";
import Appbar from "./Appbar";
import Avatar from '@material-ui/core/Avatar';
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';
import Footer from "./Footer";

import Box from "@material-ui/core/Box";
import Menu2 from "./Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
}));



function Me() {
  const [profile, setProfile] = useStateIfMounted({});
const classes = useStyles();
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
          <Link to="/users/me/avatar"> <Avatar 
           
           src={`https://petkovski-calculator-be.herokuapp.com/users/${profile._id}/avatar`}/></Link> 
          
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
      <Box ml={62.5} mt={0} mb={5}>
        {" "}
        <Container maxwidth={"s"}>
          <Typography color="primary" variant={"h4"}>
            My Profile
          </Typography>
          <Box mt={2}>
            <Avatar className={classes.large} variant="square" src={`https://petkovski-calculator-be.herokuapp.com/users/${profile._id}/avatar`}/>
            </Box>
          <Box >
            <Box mt={2}>
              <Typography>Name: {profile.name}</Typography>
            </Box>
            <Box mt={2}></Box>{" "}
            <Box mt={2}>
              {" "}
              <Typography>Last Name: {profile.surname}</Typography>
            </Box>{" "}
            <Box mt={2}>
              {" "}
              <Typography>Email: {profile.email}</Typography>
            </Box>{" "}
            <Box mt={2}>
              {" "}
              <Typography>Phone: {profile.phone}</Typography>
            </Box>{" "}
            <Box mt={2}>
              {" "}
              <Typography>
                Birthday: {moment(profile.birthday).format("MMMM Do, YYYY")}
              </Typography>{" "}
            </Box>
           <Box ml={-0.5} mt={3.5}>
            <Button
        variant="contained" color="primary" type="submit"
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
                to="/users/me/edit"
              >
              <div style={{display:"flex", alignItems: "center", justifyContent: "center"}}>
                Edit Profile
                </div>
              </Link>
            </Button>
           </Box>
  
          </Box>
        </Container>
      </Box>
      <Footer />
           {products && <Redirect to={"/products"}/>}
    </div>
  );
}

export default Me;
